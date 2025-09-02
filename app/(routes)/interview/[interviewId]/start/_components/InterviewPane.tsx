"use client"
import React, { useRef, useState, useEffect } from 'react'
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button'
import { Mic, Square } from 'lucide-react'
import useSpeechToText from 'react-hook-speech-to-text';


interface InterviewPaneProps {
  questionId: number;
  onAnswerSubmit: (questionId: number, answer: string) => void;
}

function InterviewPane({ questionId, onAnswerSubmit }: InterviewPaneProps) {
  const webcamRef = useRef<Webcam>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [transcribedText, setTranscribedText] = useState('')
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)
  const [sessionStartIndex, setSessionStartIndex] = useState(0)

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    return () => {
      if (timerId) {
        clearInterval(timerId)
      }
    }
  }, [timerId])

  const startRecording = () => {
    if (timerId) {
      clearInterval(timerId)
      setTimerId(null)
    }

    setTranscribedText('')
    setSessionStartIndex(results.length)
    startSpeechToText()
    setRecordingTime(0)

    const newTimerId = setInterval(() => {
      setRecordingTime(prev => prev + 1)
    }, 1000)

    setTimerId(newTimerId)
  }

  const stopRecording = () => {
    if (timerId) {
      clearInterval(timerId)
      setTimerId(null)
    }

    const sessionResults = results.slice(sessionStartIndex);
    const fullText = sessionResults.map(result =>
      typeof result === 'string' ? result : result.transcript
    ).join(' ') + (interimResult ? ` ${interimResult}` : '');

    setTranscribedText(fullText)
    console.log('Recording stopped for question', questionId)
    console.log('Transcribed Text:', fullText)

    onAnswerSubmit(questionId, fullText)

    setRecordingTime(0)
    stopSpeechToText()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex flex-col gap-4 p-6 border-2 border-zinc-200 bg-zinc-100 rounded-2xl">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <Webcam
          ref={webcamRef}
          audio={true}
          mirrored={true}
          screenshotFormat="image/jpeg"
          className="w-full h-full object-cover"
          videoConstraints={{
            width: 640,
            height: 480,
            facingMode: "user"
          }}
        />

        {isRecording && (
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Recording
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-3">
        {isRecording ? (
          <div className="flex items-center gap-4">
            <Button
              onClick={stopRecording}
              variant="destructive"
              className="flex items-center gap-2 cursor-pointer"
              size="lg"
            >
              <Square className="w-4 h-4" />
              Stop Recording
            </Button>
            <div className="text-2xl font-mono font-bold text-red-600">
              {formatTime(recordingTime)}
            </div>
          </div>
        ) : (
          <Button
            onClick={startRecording}
            className="flex items-center gap-2 cursor-pointer"
            size="lg"
          >
            <Mic className="w-4 h-4" />
            Start Recording Answer
          </Button>
        )}

        {!isRecording && recordingTime === 0 && (
          <p className="text-sm text-zinc-600 text-center">
            Click the button above to start recording your answer
          </p>
        )}
      </div>

      {isRecording && (
        <div className="text-center text-sm text-zinc-700">
          Recording in progress... Speak clearly and answer the question shown.
        </div>
      )}



    </div>
  )
}

export default InterviewPane
