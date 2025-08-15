import React, { useState } from 'react'
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
import { Button } from '@/components/ui/button'
import TabSwitcher from './TabSwitcher'

function CreateDialog() {

    const [formData, setFormData] = useState<unknown>()

    const onHandleInputChange = (field: string, value: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [field]: value

        }))
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
                        <TabSwitcher onHandleInputChange={onHandleInputChange} />
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose className=' flex gap-5'>
                        <Button className=' cursor-pointer hover:scale-105 transition-all'>Submit</Button>
                        <Button variant={'ghost'} className=' cursor-pointer hover:scale-105 transition-all'>Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateDialog