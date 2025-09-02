import Link from 'next/link';
import React from 'react'
import { Button } from './button';
import Image from 'next/image';

function Navbar() {
    return (
        <nav className="flex w-full items-center justify-between border-t border-b border-neutral-200 px-4 py-4 dark:border-neutral-800">
            <div className="flex items-center gap-2">
                <Image src="/questify-ai-logo.png" width={50} height={50} alt="Questify AI Logo"/>
                <h1 className="text-base font-bold md:text-2xl">Questify AI</h1>
            </div>
            <Link href="/dashboard" >
                <Button className=' cursor-pointer'>
                    Get Started
                </Button>
            </Link>
        </nav>
    );
}

export default Navbar