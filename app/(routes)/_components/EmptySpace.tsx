import { Button } from '@/components/ui/button'
import React from 'react'
import CreateDialog from './CreateDialog'

function EmptySpace() {
    return (
        <div className=" mt-14 flex flex-col items-center justify-center min-h-[400px] p-8 text-center border-dashed border-4 border-zinc-200 rounded-4xl bg-zinc-100">
            {/* Icon */}
            <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center dark:from-blue-900/20 dark:to-indigo-900/20">
                <svg
                    className="w-12 h-12 text-black dark:text-zinc-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
            </div>

            {/* Text Content */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No interviews yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                Get started by creating your first interview. Our AI will help you find the perfect candidates.
            </p>

            {/* Action Button */}
            <CreateDialog />

        </div>
    )
}

export default EmptySpace