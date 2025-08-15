import { UserButton } from '@clerk/nextjs'
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
                <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
            </div>
            <div>
                <ul className=' flex gap-10'>
                    {menuItems.map((item) => {
                        return (
                            <li className=' text-lg hover:scale-105 transition-all cursor-pointer font-semibold' key={item.id}>{item.label}</li>
                        )
                    })}
                </ul>
            </div>
            <UserButton />
        </nav>
    )
}

export default AppHeader