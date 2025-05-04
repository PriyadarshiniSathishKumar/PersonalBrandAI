import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email"),
  avatar: text("avatar"),
  plan: text("plan").default("free"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
  avatar: true,
  plan: true,
});

export const platforms = pgTable("platforms", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  type: text("type").notNull(), // linkedin, twitter, instagram, etc.
  connected: boolean("connected").default(false),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  tokenExpiry: timestamp("token_expiry"),
  settings: jsonb("settings"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPlatformSchema = createInsertSchema(platforms).pick({
  userId: true,
  name: true,
  type: true,
  connected: true,
  accessToken: true,
  refreshToken: true,
  tokenExpiry: true,
  settings: true,
});

export const brandSettings = pgTable("brand_settings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  formalToCasual: integer("formal_to_casual").default(50),
  technicalToAccessible: integer("technical_to_accessible").default(50),
  reservedToEnthusiastic: integer("reserved_to_enthusiastic").default(50),
  traditionalToInnovative: integer("traditional_to_innovative").default(50),
  contentPillars: jsonb("content_pillars"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertBrandSettingsSchema = createInsertSchema(brandSettings).pick({
  userId: true,
  formalToCasual: true,
  technicalToAccessible: true,
  reservedToEnthusiastic: true,
  traditionalToInnovative: true,
  contentPillars: true,
});

export const contentPosts = pgTable("content_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  platformId: integer("platform_id").references(() => platforms.id),
  title: text("title"),
  content: text("content").notNull(),
  tone: text("tone"),
  length: text("length"),
  type: text("type"),
  status: text("status").default("draft"), // draft, scheduled, published
  scheduledAt: timestamp("scheduled_at"),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertContentPostSchema = createInsertSchema(contentPosts).pick({
  userId: true,
  platformId: true,
  title: true,
  content: true,
  tone: true,
  length: true,
  type: true,
  status: true,
  scheduledAt: true,
  publishedAt: true,
});

export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  platformId: integer("platform_id").references(() => platforms.id),
  followers: integer("followers").default(0),
  engagement: jsonb("engagement"),
  postPerformance: jsonb("post_performance"),
  growthTrends: jsonb("growth_trends"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAnalyticsSchema = createInsertSchema(analytics).pick({
  userId: true,
  platformId: true,
  followers: true,
  engagement: true,
  postPerformance: true,
  growthTrends: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Platform = typeof platforms.$inferSelect;
export type InsertPlatform = z.infer<typeof insertPlatformSchema>;

export type BrandSettings = typeof brandSettings.$inferSelect;
export type InsertBrandSettings = z.infer<typeof insertBrandSettingsSchema>;

export type ContentPost = typeof contentPosts.$inferSelect;
export type InsertContentPost = z.infer<typeof insertContentPostSchema>;

export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
