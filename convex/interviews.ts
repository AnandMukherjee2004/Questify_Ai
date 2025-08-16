import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const SaveInterviewQuestions = mutation({
  args: {
    questions: v.any(),
    resumeUrl: v.union(v.string(), v.null()),
    status: v.string(),
    uid: v.id("users"),
    jobTitle: v.union(v.string(), v.null()),
    jobDesc: v.union(v.string(), v.null()),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("interviewSessions", {
      interviewQuestions: args.questions,
      resumeUrl: args.resumeUrl,
      status: "draft",
      user_id: args.uid,
      jobTitle: args.jobTitle,
      jobDesc: args.jobDesc,
    });

    return result;
  },
});
