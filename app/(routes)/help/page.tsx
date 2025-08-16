"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  HelpCircle, 
  Play, 
  FileText, 
  MessageSquare, 
  Settings, 
  Users, 
  Zap,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MessageCircle
} from 'lucide-react'

function HelpPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const faqData = [
    {
      question: "How do I create my first interview session?",
      answer: "Click the 'Create New' button on your dashboard. You'll be prompted to upload your resume and provide a job description. Our AI will then generate personalized interview questions based on your profile and the job requirements."
    },
    {
      question: "What file formats are supported for resume upload?",
      answer: "We support PDF, DOC, DOCX, and TXT files. For best results, we recommend using PDF format as it preserves formatting and is most compatible with our AI analysis."
    },
    {
      question: "How accurate are the AI-generated interview questions?",
      answer: "Our AI analyzes thousands of real job postings and interview patterns to generate relevant questions. The questions are tailored to your specific role, experience level, and the company's requirements."
    },
    {
      question: "Can I practice with different types of interviews?",
      answer: "Yes! We support various interview types including behavioral, technical, case study, and general questions. You can specify the interview type when creating a new session."
    },
    {
      question: "Is my data secure and private?",
      answer: "Absolutely. We use enterprise-grade encryption and never share your personal information or resume data with third parties. Your practice sessions are completely private."
    },
    {
      question: "How do I track my progress?",
      answer: "Your dashboard shows your interview history, performance metrics, and areas for improvement. You can review past sessions and see how you've improved over time."
    }
  ]

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  return (
    <div className="flex flex-col px-8 py-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Help Center</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Everything you need to know about Questify AI and how to ace your interviews
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
          <Play className="h-6 w-6" />
          <span className="font-semibold">Quick Start Guide</span>
        </Button>
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
          <FileText className="h-6 w-6" />
          <span className="font-semibold">Documentation</span>
        </Button>
        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          <span className="font-semibold">Contact Support</span>
        </Button>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="getting-started" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="space-y-6">
          <div className="bg-gradient-to-r from-violet-50 to-pink-50 dark:from-violet-950/20 dark:to-pink-950/20 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Welcome to Questify AI</h2>
            <p className="text-zinc-700 dark:text-zinc-300 mb-6">
              Questify AI is your personal interview preparation assistant. Get ready to ace your next interview with AI-powered practice sessions tailored to your specific role and experience.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Step 1: Create Your Profile</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Upload your resume and let our AI analyze your experience, skills, and background to personalize your interview preparation.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Step 2: Add Job Description</h3>
                                 <p className="text-sm text-zinc-600 dark:text-zinc-400">
                   Provide the job description you&apos;re applying for. Our AI will generate relevant questions based on the role requirements.
                 </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Step 3: Practice Interviews</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Start practicing with AI-generated questions. Get real-time feedback and improve your responses with each session.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Step 4: Track Progress</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Monitor your improvement over time with detailed analytics and performance insights.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
                  <Zap className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="font-semibold">AI-Powered Questions</h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Get personalized interview questions generated by advanced AI based on your resume and job requirements.
              </p>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg">
                  <FileText className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="font-semibold">Resume Analysis</h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Our AI analyzes your resume to understand your experience and generate relevant questions.
              </p>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold">Real-time Feedback</h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Receive instant feedback on your responses and suggestions for improvement.
              </p>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold">Multiple Interview Types</h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Practice behavioral, technical, case study, and general interview questions.
              </p>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                  <Settings className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-semibold">Customizable Sessions</h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Customize your practice sessions with specific focus areas and difficulty levels.
              </p>
            </div>

            <div className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <HelpCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold">Progress Tracking</h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Track your improvement over time with detailed analytics and performance insights.
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="faq" className="space-y-4">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="border rounded-lg">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <span className="font-medium">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-zinc-600 dark:text-zinc-400">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                Need help? Our support team is here to assist you with any questions or issues you might have.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-violet-600" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">support@questify.ai</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-violet-600" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">Available 24/7</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-violet-600" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">+1 (555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-violet-50 to-pink-50 dark:from-violet-950/20 dark:to-pink-950/20 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Support Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full">
                  Contact Support
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default HelpPage