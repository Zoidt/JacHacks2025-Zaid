import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("masjids").collect();
  },
});

export const add = mutation({
  args: {
    name: v.string(),
    address: v.string(),
    prayerTimes: v.object({
      fajr: v.string(),
      dhuhr: v.string(),
      asr: v.string(),
      maghrib: v.string(),
      isha: v.string(),
      jummah: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    
    return await ctx.db.insert("masjids", {
      ...args,
      createdBy: userId,
    });
  },
});

export const toggleFavorite = mutation({
  args: {
    masjidId: v.id("masjids"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existing = await ctx.db
      .query("favorites")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("masjidId"), args.masjidId))
      .unique();

    if (existing) {
      await ctx.db.delete(existing._id);
    } else {
      await ctx.db.insert("favorites", {
        userId,
        masjidId: args.masjidId,
      });
    }
  },
});

export const getFavorites = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const favorites = await ctx.db
      .query("favorites")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    return favorites.map((f) => f.masjidId);
  },
});
