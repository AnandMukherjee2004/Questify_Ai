import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const menuItems = [
    {
        id: 0,
        label: "dashboard",
        href: "/dashboard",
    },
    {
        id: 1,
        label: "help",
        href: "/help",
    },
    {
        id: 2,
        label: "pricing",
        href: "/pricing",
    },
]

const AppHeader = () => {
    return (
        <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
            <div className="flex items-center gap-2">
                <Link href={"/"}>
                    <Image alt='logo' src="/questify-ai-logo.png" width={50} height={50} className=" cursor-pointer" />
                </Link>
                <h1 className="text-base font-bold md:text-2xl">Questify AI</h1>
            </div>
            <div>
                <ul className=' flex gap-10'>
                    {menuItems.map((item) => {
                        return (
                            <Link key={item.id} href={item.href}>
                                <li className=' text-lg hover:scale-105 transition-all cursor-pointer font-semibold' key={item.id}>{item.label}

                                </li>
                            </Link>
                        )
                    })}
                </ul>
            </div>
            <UserButton />
        </nav>
    )
}

export default AppHeader