import { NextRequest, NextResponse } from "next/server";
import ImageKit from "imagekit";
import axios from "axios";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_URL_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_URL_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!
});

export async function POST(req: NextRequest) {
  try {
    const formdata = await req.formData();
    const file = formdata.get("resume") as {
      name: string;
      size: number;
      type: string;
      arrayBuffer(): Promise<ArrayBuffer>
    };
    const jobDesc = formdata.get("jobDesc") as string;
    const jobTitle = formdata.get("jobTitle") as string;

    if (file) {



      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await imagekit.upload({
        file: buffer,
        fileName: `${Date.now()}_${file.name}`,
        isPrivateFile: false,
        useUniqueFileName: true
      });

      //call n8n hook
      const result = await axios.post("http://localhost:5678/webhook/generate-interview-question", {
        resumeUrl: uploadResult?.url
      })

      console.log(result.data);

      return NextResponse.json({
        questions: result.data?.questions,
        resumeUrl: uploadResult?.url
      });
    } else {
      const result = await axios.post("http://localhost:5678/webhook/generate-interview-question", {
        resumeUrl: null,
        jobDesc: jobDesc,
        jobTitle: jobTitle
      })

      console.log(result.data);

      return NextResponse.json({
        questions: result.data?.questions,
        resumeUrl: null
      });
    }

  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json(
      {
        error: "Failed to process file",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
