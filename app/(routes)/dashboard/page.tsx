"use client"
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs'
import React, { useContext, useEffect, useState } from 'react'
import EmptySpace from '../_components/EmptySpace';
import CreateDialog from '../_components/CreateDialog';
import { useConvex } from 'convex/react';
import { useUserDetailContext } from '@/app/Provider';
import { UserDetailContext } from '@/context/UserDetailContext';
import { api } from '@/convex/_generated/api';
import { ExpandableCardDemo } from './_components/Card';

function Page() {
    const { user } = useUser();
    interface InterviewSession {
        _id: string;
        user_id: string;
        interviewQuestions: Record<string, unknown>[];
        resumeUrl: string | null;
        status: string;
        jobTitle: string | null;
        jobDesc: string | null;
        feedback?: Record<string, unknown>;
    }

    const [interviewList, setInterviewList] = useState<InterviewSession[]>([])
    const [loading, setLoading] = useState(false)
    const { userDetail, setUserDetail } = useContext(UserDetailContext);

    const convex = useConvex();

    useEffect(() => {
        console.log('UserDetail changed:', userDetail);
        if (userDetail) {
            getInterviewList();
        }
    }, [userDetail])

    const getInterviewList = async () => {
        if (!userDetail?.id) {
            console.log('Cannot get interviews: userDetail.id is not available');
            return;
        }

        setLoading(true);
        try {
            console.log('Fetching interviews for user ID:', userDetail.id);
            const interviews = await convex.query(api.interviews.GetUserInterviews,
                { uid: userDetail.id }
            );
            console.log('Interviews fetched:', interviews);
            setInterviewList(interviews);
        } catch (error) {
            console.error('Error fetching interviews:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col px-30 py-15">
            <div className=' flex justify-between items-center'>
                <div>
                    <h1 className="text-md text-zinc-500 font-semibold">Dashboard</h1>
                    <h1 className=' text-2xl font-bold'>Welcome, {user?.fullName}</h1>
                </div>
                <CreateDialog />
            </div>

            {loading && (
                <div className="mt-8 text-center">
                    <p>Loading interviews...</p>
                </div>
            )}

            {!loading && interviewList.length == 0 &&
                <EmptySpace />
            }
            {!loading && interviewList.length > 0 &&
                <div className=' mt-10'>
                    <ExpandableCardDemo interviewList={interviewList} />
                </div>

            }
        </div>
    )
}

export default Page
