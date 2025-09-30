import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
// Keep existing tables and add:
users: defineTable({
     username: v.string(),
     password: v.string(),
}),
streamSettings: defineTable({
     logoUrl: v.optional(v.string()),
     isLive: v.boolean(),
     streamUrl: v.optional(v.string()),
     streamType: v.string(),
}),
});