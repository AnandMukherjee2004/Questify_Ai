"use client"
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Clock, FileText, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Webcam from 'react-webcam';

function StartInterviewPage() {

  const webcamRef = useRef(null);
  const router = useRouter()

  const { interviewId } = useParams();

  return (
    <div className="max-w-md mx-auto p-8 mt-8 bg-white rounded-xl shadow-lg text-center font-sans">
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">Welcome to Your AI Interview</h2>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={360}
        height={270}
        className="rounded-lg border-2 border-gray-200 mb-6 mx-auto"
        videoConstraints={{ facingMode: "user" }}
        mirrored={true}
      />
      <div className="mb-6">
        <p className="font-medium text-gray-700 mb-2">Instructions:</p>
        <ul className="text-left list-disc pl-6 text-gray-600">
          <li>Ensure your camera is working and your face is visible.</li>
          <li>Find a quiet place with good lighting.</li>
          <li>Have your resume or notes handy if allowed.</li>
        </ul>
      </div>
      <button
        onClick={() => router.push(`/interview/${interviewId}/start`)}
        className="px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 text-lg rounded-md transition-colors"
      >
        Start Interview
      </button>
    </div>
  );
}

export default StartInterviewPage;
