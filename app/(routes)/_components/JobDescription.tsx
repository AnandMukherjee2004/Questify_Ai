"use client"
import React, { useState } from 'react'

function JobDescription({ onHandleInputChange }: any) {

    return (
        <div className="w-full max-w-2xl mx-auto p-6">

            {/* Form Header */}
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Job Description
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Create a detailed job description for your position
                </p>
            </div>

            {/* Job Title Field */}
            <div className="space-y-2">
                <label
                    htmlFor="jobTitle"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Job Title *
                </label>
                <input
                    type="text"
                    id="jobTitle"
                    onChange={(e) => onHandleInputChange("jobTitle", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors duration-200"
                    placeholder="Enter job title"
                    required
                />
            </div>

            {/* Job Description Field */}
            <div className="space-y-2">
                <label
                    htmlFor="jobDescription"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    Job Description *
                </label>
                <textarea
                    id="jobDescription"
                    onChange={(e) => onHandleInputChange("jobDesc", e.target.value)}
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors duration-200 resize-vertical"
                    placeholder="Enter detailed job description including responsibilities, requirements, and qualifications..."
                    required
                />
            </div>

        </div>
    )
}

export default JobDescription