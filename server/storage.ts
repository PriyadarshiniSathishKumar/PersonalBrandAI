import { 
  users, type User, type InsertUser,
  platforms, type Platform, type InsertPlatform,
  brandSettings, type BrandSettings, type InsertBrandSettings,
  contentPosts, type ContentPost, type InsertContentPost,
  analytics, type Analytics, type InsertAnalytics
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Platforms
  getPlatform(id: number): Promise<Platform | undefined>;
  getPlatformsByUserId(userId: number): Promise<Platform[]>;
  createPlatform(platform: InsertPlatform): Promise<Platform>;
  updatePlatform(id: number, platform: Partial<Platform>): Promise<Platform | undefined>;
  deletePlatform(id: number): Promise<boolean>;

  // Brand Settings
  getBrandSettings(userId: number): Promise<BrandSettings | undefined>;
  createBrandSettings(settings: InsertBrandSettings): Promise<BrandSettings>;
  updateBrandSettings(userId: number, settings: Partial<BrandSettings>): Promise<BrandSettings | undefined>;

  // Content Posts
  getContentPost(id: number): Promise<ContentPost | undefined>;
  getContentPostsByUserId(userId: number): Promise<ContentPost[]>;
  getContentPostsByPlatformId(platformId: number): Promise<ContentPost[]>;
  createContentPost(post: InsertContentPost): Promise<ContentPost>;
  updateContentPost(id: number, post: Partial<ContentPost>): Promise<ContentPost | undefined>;
  deleteContentPost(id: number): Promise<boolean>;

  // Analytics
  getAnalytics(id: number): Promise<Analytics | undefined>;
  getAnalyticsByUserId(userId: number): Promise<Analytics[]>;
  getAnalyticsByPlatformId(platformId: number): Promise<Analytics | undefined>;
  createAnalytics(analytics: InsertAnalytics): Promise<Analytics>;
  updateAnalytics(id: number, analytics: Partial<Analytics>): Promise<Analytics | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private platforms: Map<number, Platform>;
  private brandSettings: Map<number, BrandSettings>;
  private contentPosts: Map<number, ContentPost>;
  private analyticsData: Map<number, Analytics>;
  currentUserId: number;
  currentPlatformId: number;
  currentBrandSettingsId: number;
  currentContentPostId: number;
  currentAnalyticsId: number;

  constructor() {
    this.users = new Map();
    this.platforms = new Map();
    this.brandSettings = new Map();
    this.contentPosts = new Map();
    this.analyticsData = new Map();
    this.currentUserId = 1;
    this.currentPlatformId = 1;
    this.currentBrandSettingsId = 1;
    this.currentContentPostId = 1;
    this.currentAnalyticsId = 1;
    
    // Add some demo data
    this.createUser({
      username: "demouser",
      password: "password123",
      name: "Alex Morgan",
      email: "alex@example.com",
      avatar: "",
      plan: "pro"
    });
  }

  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Platforms
  async getPlatform(id: number): Promise<Platform | undefined> {
    return this.platforms.get(id);
  }

  async getPlatformsByUserId(userId: number): Promise<Platform[]> {
    return Array.from(this.platforms.values()).filter(
      (platform) => platform.userId === userId
    );
  }

  async createPlatform(insertPlatform: InsertPlatform): Promise<Platform> {
    const id = this.currentPlatformId++;
    const platform: Platform = { ...insertPlatform, id };
    this.platforms.set(id, platform);
    return platform;
  }

  async updatePlatform(id: number, platformUpdate: Partial<Platform>): Promise<Platform | undefined> {
    const platform = this.platforms.get(id);
    if (!platform) return undefined;
    
    const updatedPlatform = { ...platform, ...platformUpdate };
    this.platforms.set(id, updatedPlatform);
    return updatedPlatform;
  }

  async deletePlatform(id: number): Promise<boolean> {
    return this.platforms.delete(id);
  }

  // Brand Settings
  async getBrandSettings(userId: number): Promise<BrandSettings | undefined> {
    return Array.from(this.brandSettings.values()).find(
      (settings) => settings.userId === userId
    );
  }

  async createBrandSettings(insertSettings: InsertBrandSettings): Promise<BrandSettings> {
    const id = this.currentBrandSettingsId++;
    const settings: BrandSettings = { 
      ...insertSettings, 
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.brandSettings.set(id, settings);
    return settings;
  }

  async updateBrandSettings(userId: number, settingsUpdate: Partial<BrandSettings>): Promise<BrandSettings | undefined> {
    const settings = Array.from(this.brandSettings.values()).find(
      (settings) => settings.userId === userId
    );
    
    if (!settings) return undefined;
    
    const updatedSettings = { 
      ...settings, 
      ...settingsUpdate,
      updatedAt: new Date()
    };
    this.brandSettings.set(settings.id, updatedSettings);
    return updatedSettings;
  }

  // Content Posts
  async getContentPost(id: number): Promise<ContentPost | undefined> {
    return this.contentPosts.get(id);
  }

  async getContentPostsByUserId(userId: number): Promise<ContentPost[]> {
    return Array.from(this.contentPosts.values()).filter(
      (post) => post.userId === userId
    );
  }

  async getContentPostsByPlatformId(platformId: number): Promise<ContentPost[]> {
    return Array.from(this.contentPosts.values()).filter(
      (post) => post.platformId === platformId
    );
  }

  async createContentPost(insertPost: InsertContentPost): Promise<ContentPost> {
    const id = this.currentContentPostId++;
    const post: ContentPost = { 
      ...insertPost, 
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.contentPosts.set(id, post);
    return post;
  }

  async updateContentPost(id: number, postUpdate: Partial<ContentPost>): Promise<ContentPost | undefined> {
    const post = this.contentPosts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { 
      ...post, 
      ...postUpdate,
      updatedAt: new Date()
    };
    this.contentPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteContentPost(id: number): Promise<boolean> {
    return this.contentPosts.delete(id);
  }

  // Analytics
  async getAnalytics(id: number): Promise<Analytics | undefined> {
    return this.analyticsData.get(id);
  }

  async getAnalyticsByUserId(userId: number): Promise<Analytics[]> {
    return Array.from(this.analyticsData.values()).filter(
      (analytics) => analytics.userId === userId
    );
  }

  async getAnalyticsByPlatformId(platformId: number): Promise<Analytics | undefined> {
    return Array.from(this.analyticsData.values()).find(
      (analytics) => analytics.platformId === platformId
    );
  }

  async createAnalytics(insertAnalytics: InsertAnalytics): Promise<Analytics> {
    const id = this.currentAnalyticsId++;
    const analytics: Analytics = { 
      ...insertAnalytics, 
      id,
      updatedAt: new Date()
    };
    this.analyticsData.set(id, analytics);
    return analytics;
  }

  async updateAnalytics(id: number, analyticsUpdate: Partial<Analytics>): Promise<Analytics | undefined> {
    const analytics = this.analyticsData.get(id);
    if (!analytics) return undefined;
    
    const updatedAnalytics = { 
      ...analytics, 
      ...analyticsUpdate,
      updatedAt: new Date()
    };
    this.analyticsData.set(id, updatedAnalytics);
    return updatedAnalytics;
  }
}

export const storage = new MemStorage();
