import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

export const GetInterviewQuestions = query({
  args: {
    interviewId: v.id("interviewSessions"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("interviewSessions")
      .filter((q) => q.eq(q.field("_id"), args.interviewId))
      .collect();
    return result[0];
  },
});

export const SaveFeedback = mutation({
  args: {
    interviewId: v.id("interviewSessions"),
    feedback: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.interviewId, {
      feedback: args.feedback,
      status: "completed",
    });
    return result;
  },
});

export const GetUserInterviews = query({
  args: { uid: v.id("users") },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("interviewSessions")
      .filter((q) => q.eq(q.field("user_id"), args.uid))
      .collect();
    return result;
  },
});
