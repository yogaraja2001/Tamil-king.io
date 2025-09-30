import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server";

export const updateStreamSettings = mutation({
  args: {
    id: v.id("streamSettings"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {

    });
  },
});

export const getStreamSettings = query({
args: { streamSettingId: v.id("streamSettings") },
handler: async (ctx, args) => {
  const streamSetting = await ctx.db.get(args.streamSettingId);
  // do something with the document
  return streamSetting;
},
});
