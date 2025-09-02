import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { conversation, interviewId } = body;

    console.log('Received feedback request for interview:', interviewId);
    console.log('Conversation data:', conversation);

    try {
      // Send to your AI agent (adjust the URL as needed)
      const result = await axios.post("http://localhost:5678/webhook/generate-interview-feedback", {
        conversation,
        interviewId
      }, {
        timeout: 10000 // 10 second timeout
      });

      console.log('AI response:', result.data);

      return NextResponse.json({
        feedback: result.data?.feedback || "Great job! Your answers were well-structured and demonstrated good understanding of the topics.",
        score: result.data?.score || 85,
        recommendations: result.data?.recommendations || [
          "Practice speaking more concisely",
          "Provide more specific examples from your experience",
          "Focus on connecting your answers to the job requirements"
        ]
      });
    } catch (webhookError) {
      console.log('Webhook not available, returning mock feedback');
      
      // Return mock feedback if webhook is not available
      return NextResponse.json({
        feedback: "Great job! Your answers were well-structured and demonstrated good understanding of the topics. The AI feedback system is currently being configured.",
        score: 85,
        recommendations: [
          "Practice speaking more concisely",
          "Provide more specific examples from your experience",
          "Focus on connecting your answers to the job requirements"
        ]
      });
    }
  } catch (error) {
    console.error("Error processing feedback:", error);
    return NextResponse.json(
      {
        error: "Failed to process feedback",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
