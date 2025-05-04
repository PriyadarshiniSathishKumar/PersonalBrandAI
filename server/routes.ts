import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";

// The newest OpenAI model is "gpt-4o" which was released May 13, 2024. 
// Do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "default_key" });

export async function registerRoutes(app: Express): Promise<Server> {
  // Generate content with AI
  app.post("/api/generate-content", async (req, res) => {
    try {
      const { prompt, tone, length, type, platform } = req.body;

      if (!prompt || !tone || !length || !type || !platform) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const lengthMap = {
        short: "short (around 100-150 words)",
        medium: "medium length (around 200-300 words)",
        long: "detailed (around 400-600 words)"
      };

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `You are a professional content creator specializing in ${platform} content. 
            Create a ${tone} tone, ${lengthMap[length as keyof typeof lengthMap]} ${type} post for ${platform}.
            The content should be well-formatted for the platform, including appropriate formatting, emoji usage, and hashtags if relevant.
            Respond with ONLY the content, no explanations or additional commentary.`
          },
          { role: "user", content: prompt }
        ],
      });

      const content = completion.choices[0].message.content || "";

      return res.status(200).json({ 
        content,
        platform
      });
    } catch (error) {
      console.error("Error generating content:", error);
      return res.status(500).json({ message: "Failed to generate content" });
    }
  });

  // Analyze brand voice
  app.post("/api/analyze-brand-voice", async (req, res) => {
    try {
      const { samples } = req.body;

      if (!samples || !Array.isArray(samples) || samples.length < 2) {
        return res.status(400).json({ message: "Please provide at least 2 content samples" });
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `Analyze the following content samples to determine the brand voice characteristics and content pillars.
            Return the analysis as a JSON object with the following fields:
            - formalToCasual: number from 0-100 (0 = very formal, 100 = very casual)
            - technicalToAccessible: number from 0-100 (0 = very technical, 100 = very accessible)
            - reservedToEnthusiastic: number from 0-100 (0 = very reserved, 100 = very enthusiastic)
            - traditionalToInnovative: number from 0-100 (0 = very traditional, 100 = very innovative)
            - suggestedPillars: array of objects with name, icon (one of: lightbulb, book, user, message), and percentage`
          },
          { 
            role: "user", 
            content: samples.join("\n\n---\n\n") 
          }
        ],
        response_format: { type: "json_object" }
      });

      const result = JSON.parse(completion.choices[0].message.content || "{}");

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error analyzing brand voice:", error);
      return res.status(500).json({ message: "Failed to analyze brand voice" });
    }
  });

  // Repurpose content for multiple platforms
  app.post("/api/repurpose-content", async (req, res) => {
    try {
      const { originalContent, targetPlatforms } = req.body;

      if (!originalContent || !targetPlatforms || !Array.isArray(targetPlatforms)) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const results = [];

      for (const platform of targetPlatforms) {
        const completion = await openai.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are a professional content repurposing expert. 
              Take the original content and repurpose it specifically for ${platform}. 
              Adapt the style, format, and length to be optimized for ${platform}.
              Return ONLY the repurposed content.`
            },
            { role: "user", content: originalContent }
          ],
        });

        results.push({
          platform,
          content: completion.choices[0].message.content || ""
        });
      }

      return res.status(200).json(results);
    } catch (error) {
      console.error("Error repurposing content:", error);
      return res.status(500).json({ message: "Failed to repurpose content" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
