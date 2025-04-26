import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const applicationTables = {
  masjids: defineTable({
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
    createdBy: v.id("users"),
  }).index("by_creator", ["createdBy"]),

  favorites: defineTable({
    userId: v.id("users"),
    masjidId: v.id("masjids"),
  }).index("by_user", ["userId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
