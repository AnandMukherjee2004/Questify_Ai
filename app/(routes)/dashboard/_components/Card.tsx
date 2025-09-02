"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Feedback {
    score?: number | string;
    text?: string;
    recommendations?: string[];
    areasOfImprovement?: string[];
    [key: string]: unknown;
}

interface InterviewSession {
    _id: string;
    user_id: string;
    interviewQuestions: Record<string, unknown>[];
    resumeUrl: string | null;
    status: string;
    jobTitle: string | null;
    jobDesc: string | null;
    feedback?: Feedback;
}

interface ExpandableCardDemoProps {
    interviewList: InterviewSession[];
}

export function ExpandableCardDemo({ interviewList }: ExpandableCardDemoProps) {
    const [active, setActive] = useState<InterviewSession | null>(null);
    const id = useId();
    const ref = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(null);
            }
        }

        if (active) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    const getStatusVariant = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'default';
            case 'draft': return 'secondary';
            case 'in-progress': return 'outline';
            default: return 'secondary';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'completed': return 'from-green-500 to-emerald-600';
            case 'draft': return 'from-blue-500 to-cyan-600';
            case 'in-progress': return 'from-yellow-500 to-orange-600';
            default: return 'from-gray-500 to-gray-600';
        }
    };

    return (
        <>
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 h-full w-full z-50"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active ? (
                    <div className="fixed inset-0 grid place-items-center z-[100]">
                        <motion.button
                            key={`button-${active._id}-${id}`}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, transition: { duration: 0.05 } }}
                            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active._id}-${id}`}
                            ref={ref}
                            className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                        >
                            <div className="bg-gradient-to-r p-6 from-blue-600 to-purple-700">
                                <div className="flex justify-between items-start">
                                    <div>
                                        {active.jobTitle ? (
                                            <motion.h3
                                                layoutId={`title-${active._id}-${id}`}
                                                className="font-bold text-white text-xl"
                                            >
                                                {active.jobTitle}
                                            </motion.h3>
                                        ) : (
                                            <motion.h3
                                                layoutId={`title-${active._id}-${id}`}
                                                className="font-bold text-white text-xl"
                                            >
                                                Resume Interview
                                            </motion.h3>
                                        )}
                                        <motion.p
                                            layoutId={`status-${active._id}-${id}`}
                                            className="text-blue-100 text-sm mt-1"
                                        >
                                            <Badge variant={getStatusVariant(active.status)}>
                                                {active.status.toUpperCase()}
                                            </Badge>
                                        </motion.p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                {active.jobDesc && (
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Job Description</h4>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                                            {active.jobDesc}
                                        </p>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600">
                                            {active.interviewQuestions?.length || 0}
                                        </div>
                                        <div className="text-xs text-gray-500">Questions</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-green-600">
                                            {active.feedback ? "✓" : "—"}
                                        </div>
                                        <div className="text-xs text-gray-500">Feedback</div>
                                    </div>
                                </div>

                                {active.feedback && (
                                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Interview Feedback</h4>

                                        {active.feedback.score && (
                                            <div className="mb-3">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Overall Score</span>
                                                    <span className="text-lg font-bold text-blue-600">
                                                        {typeof active.feedback.score === 'number'
                                                            ? `${active.feedback.score}/100`
                                                            : active.feedback.score}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                                                    <div
                                                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                                                        style={{
                                                            width: `${Math.min((typeof active.feedback.score === 'number' ? active.feedback.score : 50), 100)}%`,
                                                            maxWidth: '100%'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {active.feedback.text && (
                                            <div className="mb-3">
                                                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Overall Feedback</h5>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {active.feedback.text}
                                                </p>
                                            </div>
                                        )}

                                        {active.feedback.recommendations && Array.isArray(active.feedback.recommendations) && (
                                            <div>
                                                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Suggestions</h5>
                                                <ul className="space-y-1">
                                                    {active.feedback.recommendations.map((recommendation: string, index: number) => (
                                                        <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                                                            <span className="text-green-500 mr-2">•</span>
                                                            {recommendation}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {active.feedback.areasOfImprovement && Array.isArray(active.feedback.areasOfImprovement) && (
                                            <div className="mt-3">
                                                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Areas for Improvement</h5>
                                                <ul className="space-y-1">
                                                    {active.feedback.areasOfImprovement.map((area: string, index: number) => (
                                                        <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                                                            <span className="text-yellow-500 mr-2">•</span>
                                                            {area}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {active.resumeUrl && (
                                    <motion.a
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        href={active.resumeUrl}
                                        target="_blank"
                                        className="w-full px-4 py-2 text-sm rounded-lg font-medium bg-blue-600 text-white text-center hover:bg-blue-700 transition-colors"
                                    >
                                        View Resume
                                    </motion.a>
                                )}
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>

            <ul className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {interviewList.map((interview) => (
                    <motion.div
                        layoutId={`card-${interview._id}-${id}`}
                        key={interview._id}
                        onClick={() => setActive(interview)}
                        className={cn(
                            "group cursor-pointer rounded-xl border border-gray-200 dark:border-gray-800",
                            "bg-white dark:bg-gray-900 hover:shadow-xl transition-all duration-300",
                            "transform hover:-translate-y-1"
                        )}
                    >
                        <div className={cn(
                            "h-4 rounded-t-xl bg-gradient-to-r",
                            getStatusColor(interview.status)
                        )} />

                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-1">
                                    <motion.h3
                                        layoutId={`title-${interview._id}-${id}`}
                                        className="font-bold text-gray-900 dark:text-white text-lg mb-2 line-clamp-2"
                                    >
                                        {interview.jobTitle ? interview.jobTitle : "Resume Interview"}
                                    </motion.h3>
                                    <Badge
                                        variant={getStatusVariant(interview.status)}
                                        className="text-xs"
                                    >
                                        {interview.status.toUpperCase()}
                                    </Badge>
                                </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                                {interview.jobDesc || "This interview session is based on your uploaded resume."}
                            </p>

                            <div className="flex justify-between items-center text-xs text-gray-500">
                                <span>{interview.interviewQuestions?.length || 0} questions</span>
                                <span>{interview.feedback ? "Feedback ready" : "No feedback"}</span>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-400">
                                        {new Date(interview._id).toLocaleDateString()}
                                    </span>
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </ul>
        </>
    );
}

export const CloseIcon = () => {
    return (
        <motion.svg
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.05,
                },
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-black"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </motion.svg>
    );
};

