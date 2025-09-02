import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from '@/components/ui/button'

type InterviewQuestions = {
  id: number,
  model_answer: string,
  question: string
}

type InterviewData = {
  interviewQuestions: InterviewQuestions[]
  resumeUrl: string | null
  jobTitle: string | null
  jobDesc: string | null
}

type Answer = {
  questionId: number;
  answer: string;
  timestamp: Date;
}

interface QuestionPaneProps {
  interviewData: InterviewData | undefined;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  answers: Answer[];
}

function QuestionPane({ interviewData, activeIndex, setActiveIndex, answers }: QuestionPaneProps) {
  const interviewQues = interviewData?.interviewQuestions;
  
  // Check if a question has been answered
  const isQuestionAnswered = (questionId: number) => {
    return answers.some(answer => answer.questionId === questionId);
  };

  return (
    <div className=' flex flex-col h-full container'>
      <div className='top flex gap-5 flex-wrap'>
        {interviewQues && interviewQues.map((ques, id) => {
          const isAnswered = isQuestionAnswered(ques.id);
          return (
            <Badge onClick={() => {
              setActiveIndex(id)
            }}
              key={id} 
              className={`text-md cursor-pointer rounded-full px-5 py-1.5 ${activeIndex == id ? "hover:bg-black" : "hover:bg-zinc-200"} ${isAnswered ? "border-2 border-green-500" : ""}`} 
              variant={activeIndex == id ? "default" : "secondary"}
            >
              Question #{ques.id}
              {isAnswered && <span className="ml-2">✓</span>}
            </Badge>
          )
        })}
      </div>
      <div className=' h-full px-5 mt-5 bg-slate-200 rounded-2xl'>
        <h3 className=' mt-7 mx-2 font-semibold tracking-tight'>
          {interviewQues && interviewQues[activeIndex].question}
        </h3>
      </div>
      <div className=' justify-end items-end'>
        <Button onClick={() => {
          if (interviewQues) {
            setActiveIndex(activeIndex < interviewQues.length - 1 ? activeIndex + 1 : activeIndex);
          }
        }} className=' cursor-pointer items-end w-44 mt-5 rounded-full'>Next</Button>
      </div>

    </div>
  )
}

export default QuestionPane
