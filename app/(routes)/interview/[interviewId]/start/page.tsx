"use client"
import { api } from '@/convex/_generated/api'
import { useConvex, useMutation } from 'convex/react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Id } from '@/convex/_generated/dataModel'
import Webcam from 'react-webcam';
import axios from 'axios';
import QuestionPane from './_components/QuestionPane'
import InterviewPane from './_components/InterviewPane'
import { Button } from '@/components/ui/button'

function StartInterview() {

    const saveInterview = useMutation(api.interviews.SaveInterviewQuestions)
    const saveFeedback = useMutation(api.interviews.SaveFeedback)

    const router = useRouter()

    const webcamRef = useRef(null);

    type InterviewData = {
        interviewQuestions: InterviewQuestions[]
        resumeUrl: string | null
        jobTitle: string | null
        jobDesc: string | null
    }

    type InterviewQuestions = {
        id: number,
        model_answer: string,
        question: string
    }

    type Answer = {
        questionId: number;
        answer: string;
        timestamp: Date;
    }

    const params = useParams()
    const interviewId = params.interviewId as string
    const convex = useConvex()
    const [interviewData, setInterviewData] = useState<InterviewData>()
    const [activeIndex, setActiveIndex] = useState(0)
    const [answers, setAnswers] = useState<Answer[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [feedback, setFeedback] = useState<string | null>(null)

    useEffect(() => {
        if (interviewId) {
            getInterviewQuestions()
        }
    }, [interviewId])

    const getInterviewQuestions = async () => {
        if (!interviewId) return

        const result = await convex.query(api.interviews.GetInterviewQuestions, {
            interviewId: interviewId as Id<"interviewSessions">,
        })

        console.log(result)
        setInterviewData(result)
    }

    const handleAnswerSubmit = (questionId: number, answer: string) => {
        const newAnswer: Answer = {
            questionId,
            answer,
            timestamp: new Date()
        }

        console.log('Answer submitted for question', questionId, ':', answer)

        setAnswers(prev => {
            // Remove existing answer for this question if it exists
            const filtered = prev.filter(a => a.questionId !== questionId)
            const updated = [...filtered, newAnswer]
            console.log('Current answers:', updated)
            return updated
        })
    }

    const isInterviewComplete = () => {
        if (!interviewData?.interviewQuestions) return false
        return answers.length >= interviewData.interviewQuestions.length
    }

    const submitAnswersToAI = async () => {
        if (!interviewData || !isInterviewComplete()) return

        setIsSubmitting(true)
        try {
            const conversation = answers.map(answer => {
                const question = interviewData.interviewQuestions.find(q => q.id === answer.questionId);
                return {
                    questionId: answer.questionId,
                    question: question?.question || '',
                    userAnswer: answer.answer
                };
            });

            const response = await axios.post('/api/generate-interview-feedback', {
                conversation,
                interviewId
            });

            const result = response.data;
            console.log('Feedback received:', result)

            // Save feedback to database
            const res = await saveFeedback({
                interviewId: interviewId as Id<"interviewSessions">,
                feedback: {
                    text: result.feedback || 'Feedback received successfully!',
                    score: result.score || 0,
                    recommendations: result.recommendations || [],
                    generatedAt: new Date().toISOString()
                }
            });

            console.log(res, 'Feedback saved to database successfully')
            setFeedback(result.feedback || 'Feedback received successfully!')
            router.replace("/dashboard")
        } catch (error) {
            console.error('Error submitting answers:', error)
            setFeedback('Error submitting answers. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const currentQuestion = interviewData?.interviewQuestions?.[activeIndex]

    return (
        <div className="container mx-auto flex gap-8 p-6">
            <div className=' w-1/2 min-w-0 border-zinc-200 border-2 bg-zinc-100 rounded-2xl p-7 px-10'>
                <QuestionPane
                    interviewData={interviewData}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    answers={answers}
                />
            </div>
            <div className=' w-1/2 min-w-0 flex flex-col gap-4'>
                <InterviewPane
                    questionId={currentQuestion?.id || 0}
                    onAnswerSubmit={handleAnswerSubmit}
                />

                {isInterviewComplete() && !feedback && (
                    <Button
                        onClick={submitAnswersToAI}
                        disabled={isSubmitting}
                        className="w-full"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit All Answers for Feedback'}
                    </Button>
                )}

                {feedback && (
                    <div className="p-4 bg-green-100 border border-green-300 rounded-lg">
                        <h3 className="font-semibold text-green-800 mb-2">AI Feedback:</h3>
                        <p className="text-green-700">{feedback}</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default StartInterview
