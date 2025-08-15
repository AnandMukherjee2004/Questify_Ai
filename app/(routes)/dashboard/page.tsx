"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import React, { useState } from 'react'
import EmptySpace from '../_components/EmptySpace';
import CreateDialog from '../_components/CreateDialog';

function Page() {
    const { user } = useUser();
    const [interviewList, setInterviewList] = useState([])
    return (
        <div className="flex flex-col px-30 py-15">
            <div className=' flex justify-between items-center'>
                <div>
                    <h1 className="text-md text-zinc-500 font-semibold">Dashboard</h1>
                    <h1 className=' text-2xl font-bold'>Welcome, {user?.fullName}</h1>
                </div>
                <CreateDialog />
            </div>
            {interviewList.length == 0 &&
                <EmptySpace />
            }
        </div>
    )
}

export default Page