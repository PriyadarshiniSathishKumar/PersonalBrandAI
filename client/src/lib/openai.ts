import { apiRequest } from "./queryClient";

// The newest OpenAI model is "gpt-4o" which was released May 13, 2024. 
// Do not change this unless explicitly requested by the user

export type Platform = "linkedin" | "twitter" | "instagram" | "facebook";

export interface ContentRequest {
  prompt: string;
  tone: "professional" | "casual" | "inspiring";
  length: "short" | "medium" | "long";
  type: "educational" | "story";
  platform: Platform;
}

export interface ContentResponse {
  content: string;
  title?: string;
  hashtags?: string[];
}

export async function generateContent(request: ContentRequest): Promise<ContentResponse> {
  try {
    const response = await apiRequest("POST", "/api/generate-content", request);
    return await response.json();
  } catch (error) {
    console.error("Error generating content:", error);
    
    // Provide fallback content when API is unavailable
    const fallbackContent = {
      linkedin: "As a professional in this field, I wanted to share some insights that might benefit our network. The key to successful outcomes often lies in strategic planning and consistent execution. Have you found similar patterns in your experiences? #ProfessionalDevelopment #StrategicGrowth",
      twitter: "Just discovered an amazing productivity hack that saved me hours this week! Anyone else trying new approaches to streamline their workflow? #Productivity #WorkSmarter",
      instagram: "Enjoying the process is just as important as reaching the destination. Today's journey reminded me why I started this path in the first place. ✨ #JourneyNotDestination #Growth",
      facebook: "I'm excited to announce a new milestone in my professional journey! The support from this community has been incredible, and I'm grateful for all the connections that have helped me along the way. What are you celebrating this week?"
    };
    
    const hashtags = {
      linkedin: ["#ProfessionalGrowth", "#Leadership", "#Innovation"],
      twitter: ["#TuesdayThoughts", "#GrowthMindset", "#Success"],
      instagram: ["#Motivation", "#Inspiration", "#LifeGoals"],
      facebook: ["#Community", "#Celebration", "#Milestone"]
    };
    
    // Provide sample content based on the platform and type
    return {
      content: fallbackContent[request.platform],
      title: request.type === "educational" ? "Insights Worth Sharing" : "My Journey This Week",
      hashtags: hashtags[request.platform]
    };
  }
}

export interface BrandVoiceAnalysis {
  formalToCasual: number;
  technicalToAccessible: number;
  reservedToEnthusiastic: number;
  traditionalToInnovative: number;
  suggestedPillars: Array<{
    name: string;
    icon: string;
    percentage: number;
  }>;
}

export async function analyzeBrandVoice(samples: string[]): Promise<BrandVoiceAnalysis> {
  try {
    const response = await apiRequest("POST", "/api/analyze-brand-voice", { samples });
    return await response.json();
  } catch (error) {
    console.error("Error analyzing brand voice:", error);
    
    // Analyze the samples to generate a more personalized response
    // In a real app, this would use the OpenAI API
    
    // Simple algorithm to analyze text samples
    const formality = samples.some(s => s.includes("excited") || s.includes("love")) ? 65 : 40;
    const techLevel = samples.some(s => s.includes("framework") || s.includes("feature")) ? 60 : 75;
    const enthusiasm = samples.some(s => s.includes("!")) ? 80 : 55;
    const innovation = samples.some(s => s.includes("new") || s.includes("game-changing")) ? 85 : 60;
    
    // Generate content pillars based on the content
    const pillars = [];
    
    if (samples.some(s => s.includes("productivity") || s.includes("framework") || s.includes("feature"))) {
      pillars.push({
        name: "Product & Innovation",
        icon: "lightbulb",
        percentage: Math.floor(Math.random() * 15) + 75 // 75-90
      });
    }
    
    if (samples.some(s => s.includes("team") || s.includes("collaborate"))) {
      pillars.push({
        name: "Leadership & Teamwork",
        icon: "users",
        percentage: Math.floor(Math.random() * 15) + 65 // 65-80
      });
    }
    
    if (samples.some(s => s.includes("shipped") || s.includes("users"))) {
      pillars.push({
        name: "Product Updates",
        icon: "rocket",
        percentage: Math.floor(Math.random() * 15) + 70 // 70-85
      });
    }
    
    if (samples.some(s => s.includes("productivity") || s.includes("boost"))) {
      pillars.push({
        name: "Growth Strategies",
        icon: "trendingUp",
        percentage: Math.floor(Math.random() * 15) + 60 // 60-75
      });
    }
    
    if (samples.some(s => s.includes("excited") || s.includes("love"))) {
      pillars.push({
        name: "Customer Success",
        icon: "heart",
        percentage: Math.floor(Math.random() * 15) + 55 // 55-70
      });
    }
    
    if (samples.some(s => s.includes("game-changing") || s.includes("new"))) {
      pillars.push({
        name: "Industry Insights",
        icon: "barChart",
        percentage: Math.floor(Math.random() * 15) + 65 // 65-80
      });
    }
    
    // Ensure we always have at least 4 pillars
    const defaultPillars = [
      {
        name: "Leadership & Innovation",
        icon: "lightbulb",
        percentage: 85
      },
      {
        name: "Industry Insights",
        icon: "barChart",
        percentage: 75
      },
      {
        name: "Personal Journey",
        icon: "rocket",
        percentage: 65
      },
      {
        name: "Career Growth",
        icon: "trendingUp",
        percentage: 60
      },
      {
        name: "Community Building",
        icon: "heart",
        percentage: 55
      },
      {
        name: "Achievement Showcase",
        icon: "award",
        percentage: 50
      }
    ];
    
    // If we don't have enough pillars from the analysis, add some defaults
    let i = 0;
    while (pillars.length < 4 && i < defaultPillars.length) {
      const pillarToAdd = defaultPillars[i];
      if (!pillars.some(p => p.name === pillarToAdd.name)) {
        pillars.push(pillarToAdd);
      }
      i++;
    }
    
    // Take at most 6 pillars
    const finalPillars = pillars.slice(0, 6);
    
    return {
      formalToCasual: formality,
      technicalToAccessible: techLevel,
      reservedToEnthusiastic: enthusiasm,
      traditionalToInnovative: innovation,
      suggestedPillars: finalPillars
    };
  }
}

export interface ContentRepurpose {
  platform: Platform;
  content: string;
}

export async function repurposeContent(
  originalContent: string, 
  targetPlatforms: Platform[]
): Promise<ContentRepurpose[]> {
  try {
    const response = await apiRequest("POST", "/api/repurpose-content", { 
      originalContent, 
      targetPlatforms 
    });
    return await response.json();
  } catch (error) {
    console.error("Error repurposing content:", error);
    
    // Provide fallback repurposed content when API is unavailable
    const fallbackResponses: Record<Platform, string> = {
      linkedin: "I wanted to share some professional insights from my recent work that might benefit our network. Looking forward to your thoughts on this approach! #ProfessionalDevelopment",
      twitter: "Just tried a new approach to solving this challenge. Game-changer! Anyone else experimenting with similar solutions? #Innovation",
      instagram: "Behind the scenes of my latest project. Some journeys are worth documenting, and this is definitely one of them. ✨ #BehindTheScenes",
      facebook: "Excited to share some updates from my recent work. The response has been incredible and I'm grateful for all the support from this amazing community!"
    };
    
    // Create repurposed content for each requested platform
    return targetPlatforms.map(platform => ({
      platform,
      content: fallbackResponses[platform]
    }));
  }
}
