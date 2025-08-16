import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const CreateNewUser = mutation({
  args: {
    name: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();

    if (existingUser) {
      // Return existing user ID instead of throwing error
      return existingUser._id;
    }

    // Insert new user to db
    const result = await ctx.db.insert("users", {
      name: args.name,
      imageUrl: args.imageUrl,
      email: args.email,
    });
    console.log(result);
    return result;
  },
});

export const GetUserByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .first();
    
    return user;
  },
});
