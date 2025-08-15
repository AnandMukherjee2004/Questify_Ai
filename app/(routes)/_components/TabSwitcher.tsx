import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ResumeUpload from "./ResumeUpload"
import JobDescription from "./JobDescription"

const TabSwitcher = ({ onHandleInputChange }: any) => {
    return (
        <Tabs defaultValue="account" className="w-full">
            <TabsList className=" mt-2 gap-3">
                <TabsTrigger value="resume">Resume</TabsTrigger>
                <TabsTrigger value="jd">Job Description</TabsTrigger>
            </TabsList>
            <TabsContent value="resume" className=" flex flex-col items-center w-full mt-2">
                < ResumeUpload />
            </TabsContent>
            <TabsContent value="jd"><JobDescription onHandleInputChange={onHandleInputChange} /></TabsContent>
        </Tabs>
    )
}

export default TabSwitcher