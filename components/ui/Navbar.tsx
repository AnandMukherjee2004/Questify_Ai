import Link from 'next/link';
import React from 'react'
import { Button } from './button';

function Navbar() {
    return (
        <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
            <div className="flex items-center gap-2">
                <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
                <h1 className="text-base font-bold md:text-2xl">Questify AI</h1>
            </div>
            <Link href="/dashboard" >
                <Button >
                    Get Started
                </Button>
            </Link>
        </nav>
    );
}

export default Navbar