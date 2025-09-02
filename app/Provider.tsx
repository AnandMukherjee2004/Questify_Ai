"use client"
import { UserDetailContext, type UserDetails, type UserDetailContextType } from '@/context/UserDetailContext'
import { api } from '@/convex/_generated/api'
import { useUser } from '@clerk/nextjs'
import { useMutation, useQuery } from 'convex/react'
import React, { useContext, useEffect, useState } from 'react'

function Provider({ children }: { children: React.ReactNode }) {
    const { user } = useUser()
    const createUser = useMutation(api.users.CreateNewUser)
    const [userDetail, setUserDetail] = useState<UserDetails | null>(null)

    useEffect(() => {
        if (user) {
            CreateNewUser();
        }
    }, [user])

    const CreateNewUser = async () => {
        if (user) {
            const result = await createUser({
                name: user?.fullName ?? 'Unknown',
                imageUrl: user?.imageUrl ?? 'Unknown',
                email: user?.primaryEmailAddress?.emailAddress ?? ""
            })
            setUserDetail({
                id: result,
                name: user?.fullName ?? 'Unknown',
                imageUrl: user?.imageUrl ?? 'Unknown',
                email: user?.primaryEmailAddress?.emailAddress ?? ""
            });
        }
    }
    return (
        <div>
            <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
                {children}
            </UserDetailContext.Provider>
        </div>
    )
}

export default Provider

export const useUserDetailContext = () => {
    return useContext(UserDetailContext)
}