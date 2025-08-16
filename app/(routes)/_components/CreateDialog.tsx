import React, { useContext, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'

import ResumeUpload from './ResumeUpload'
import JobDescription from './JobDescription'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import { SaveInterviewQuestions } from '@/convex/interviews'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { UserDetailContext } from '@/context/UserDetailContext'
import { useRouter } from 'next/router'

function CreateDialog() {

    const [formData, setFormData] = useState<Record<string, string>>({})
    const [file, setFile] = useState<File[] | null>()
    const [loading, setLoading] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<string>("resume")

    const userContext = useContext(UserDetailContext)
    const userDetail = userContext?.userDetail

    const saveInterviewQuestions = useMutation(api.interviews.SaveInterviewQuestions)

    const router = useRouter()


    const onHandleInputChange = (field: string, value: string) => {
        setFormData((prev: Record<string, string>) => ({
            ...prev,
            [field]: value

        }))
    }

    const onSubmit = async () => {
        // Only require resume for resume tab
        if (activeTab === "resume" && (!file || file.length === 0)) return;

        console.log("UserDetail context:", userDetail);

        if (!userDetail) {
            console.error("User detail not available");
            return;
        }

        setLoading(true)
        const _formData = new FormData();

        // Only append resume if file exists
        if (file && file.length > 0) {
            _formData.append("resume", file[0]);
        }

        _formData.append("jobDesc", formData.jobDesc || "");
        _formData.append("jobTitle", formData.jobTitle || "");



        try {
            const res = await axios.post("/api/generate-interview-questions", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            console.log(res.data);

            //save to db
            const interviewId = await saveInterviewQuestions({
                questions: res?.data?.questions,
                resumeUrl: res?.data?.resumeUrl,
                status: "draft",
                uid: userDetail,
                jobTitle: formData.jobTitle,
                jobDesc: formData.jobDesc
            });

            //route to the interview page
            router.push(`/interview/${interviewId}`)

            
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            console.error("Upload error:", errorMessage);
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button className="inline-flex items-center px-6 py-3 text-white font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer">
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                    Create Your First Interview
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload the Following Details!</DialogTitle>
                    <DialogDescription>
                        <Tabs defaultValue="resume" className="w-full" onValueChange={setActiveTab}>
                            <TabsList className=" mt-2 gap-3">
                                <TabsTrigger className=' cursor-pointer' value="resume">Resume</TabsTrigger>
                                <TabsTrigger className=' cursor-pointer' value="jobDesc">Job Description</TabsTrigger>
                            </TabsList>
                            <TabsContent value="resume" className=" flex flex-col items-center w-full mt-2">
                                < ResumeUpload setFiles={setFile} />
                            </TabsContent>
                            <TabsContent value="jobDesc"><JobDescription onHandleInputChange={onHandleInputChange} /></TabsContent>
                        </Tabs>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className=' flex gap-5'>
                    <Button onClick={onSubmit} disabled={loading || (activeTab === "resume" && !file)} className=' cursor-pointer hover:scale-105 transition-all'>
                        {loading && <Loader2Icon className=' animate-spin' />} Submit</Button>
                    <DialogClose>
                        <Button variant={'ghost'} className=' cursor-pointer hover:scale-105 transition-all'>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default CreateDialog