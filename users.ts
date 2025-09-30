import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const verifyLogin = mutation({
  args: {
    data: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      data: args.data,
      username: args."",
      password: args."",
    });
  },
});
