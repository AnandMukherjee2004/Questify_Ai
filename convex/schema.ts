import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  }),

  interviewSessions: defineTable({
    user_id: v.id("users"),
    interviewQuestions: v.any(),
    resumeUrl: v.union(v.string(), v.null()),
    status: v.string(),
    jobTitle: v.union(v.string(), v.null()),
    jobDesc: v.union(v.string(), v.null()),
  }),
});
