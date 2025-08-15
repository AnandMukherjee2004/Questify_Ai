"use client";
import { FileUpload } from "@/components/ui/file-upload";
import React, { useState } from "react";


export default function ResumeUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    console.log(files);
  };

  return (
    <div className="w-full h-full min-h-96 border-2 border-dashed bg-white dark:bg-black border-neutral-300 dark:border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}
