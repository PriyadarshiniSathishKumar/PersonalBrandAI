import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PenSquare, Calendar as CalendarIcon, BarChartHorizontal, Filter, ChevronRight } from "lucide-react";
import StatsCard from "@/components/StatsCard";
import ActionCard from "@/components/ActionCard";
import ContentGenerator from "@/components/ContentGenerator";
import CalendarComponent from "@/components/Calendar";
import PlatformCard from "@/components/PlatformCard";
import { 
  Card as CardUI, 
  CardContent as CardContentUI, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import VoiceSlider from "@/components/VoiceSlider";
import ContentPillar from "@/components/ContentPillar";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [brandVoice, setBrandVoice] = useState({
    formalToCasual: 65,
    technicalToAccessible: 80,
    reservedToEnthusiastic: 70,
    traditionalToInnovative: 85
  });

  const contentPillars = [
    { name: "Productivity Tips", percentage: 40, icon: "lightbulb" },
    { name: "Industry Insights", percentage: 30, icon: "book" },
    { name: "Personal Stories", percentage: 20, icon: "user" },
    { name: "Q&A / Engagement", percentage: 10, icon: "message" }
  ];

  const calendarEvents = [
    {
      id: "1",
      title: "IG: Weekly Tips",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      platform: "instagram" as const
    },
    {
      id: "2",
      title: "LinkedIn: Article",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 5),
      platform: "linkedin" as const
    },
    {
      id: "3",
      title: "Twitter: Thread",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 7),
      platform: "twitter" as const
    },
    {
      id: "4",
      title: "IG: Weekly Tips",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 9),
      platform: "instagram" as const
    }
  ];

  const platforms = [
    {
      name: "LinkedIn",
      type: "linkedin",
      description: "Professional content",
      connected: true,
      followers: 4823,
      engagement: 7.2,
      topContent: "5 Strategies I Used to Grow My Network by 500+ Connections in 30 Days...",
      growthData: [3, 4, 5, 3, 6, 4, 7, 5, 6, 8, 9, 10]
    },
    {
      name: "Twitter",
      type: "twitter",
      description: "Thought leadership",
      connected: true,
      followers: 12547,
      engagement: 3.8,
      topContent: "Here's the 5-step process I use to write viral threads that get 1M+ impressions...",
      growthData: [5, 6, 4, 5, 7, 6, 8, 7, 9, 8, 7, 9]
    },
    {
      name: "Instagram",
      type: "instagram",
      description: "Visual storytelling",
      connected: true,
      followers: 7483,
      engagement: 5.6,
      topContent: "Behind-the-scenes look at my content creation process [Carousel Post]",
      growthData: [4, 5, 6, 4, 5, 7, 8, 6, 7, 8, 9, 10]
    }
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, let's grow your personal brand!</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <ActionCard
          icon={<PenSquare className="h-5 w-5" />}
          title="Create Content"
          description="Generate AI-powered posts"
          href="/ai-writer"
          iconBgColor="bg-primary/10"
          iconColor="text-primary"
        />
        <ActionCard
          icon={<CalendarIcon className="h-5 w-5" />}
          title="Schedule Posts"
          description="Plan your content calendar"
          href="/content-calendar"
          iconBgColor="bg-green-500/10"
          iconColor="text-green-500"
        />
        <ActionCard
          icon={<BarChartHorizontal className="h-5 w-5" />}
          title="View Analytics"
          description="Track your growth metrics"
          href="/platform-insights"
          iconBgColor="bg-purple-500/10"
          iconColor="text-purple-500"
        />
      </div>

      {/* Stats Overview */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Growth Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Followers"
            value="24,853"
            description="across platforms"
            change={4.6}
            progress={78}
            progressColor="bg-primary"
          />
          <StatsCard
            title="Engagement Rate"
            value="5.2%"
            description="avg. last 30 days"
            change={2.3}
            progress={65}
            progressColor="bg-green-500"
          />
          <StatsCard
            title="Posts Published"
            value="42"
            description="this month"
            change={12}
            progress={85}
            progressColor="bg-purple-500"
          />
          <StatsCard
            title="Brand Sentiment"
            value="87%"
            description="positive mentions"
            change={1.8}
            progress={87}
            progressColor="bg-primary/80"
          />
        </div>
      </div>

      {/* AI Content Generator */}
      <ContentGenerator />

      {/* Content Calendar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Content Calendar</h2>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="border-primary/30 bg-primary/5 text-primary">
              <PenSquare className="mr-2 h-4 w-4" />
              Add Post
            </Button>
          </div>
        </div>

        <CalendarComponent events={calendarEvents} />
      </div>

      {/* Platform Insights */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Platform Insights</h2>
          <Button variant="outline" size="sm">
            Last 30 Days <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((platform, index) => (
            <PlatformCard key={index} platform={platform} />
          ))}
        </div>
      </div>

      {/* Brand Voice */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Brand Voice Settings</h2>
          <Button variant="link" className="text-primary">
            Edit Settings
          </Button>
        </div>

        <CardUI>
          <CardContent className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold mb-3">Voice Characteristics</h3>
                <div className="space-y-3">
                  <VoiceSlider
                    leftLabel="Formal"
                    rightLabel="Casual"
                    value={brandVoice.formalToCasual}
                    onChange={(value) => setBrandVoice({ ...brandVoice, formalToCasual: value })}
                  />
                  <VoiceSlider
                    leftLabel="Technical"
                    rightLabel="Accessible"
                    value={brandVoice.technicalToAccessible}
                    onChange={(value) => setBrandVoice({ ...brandVoice, technicalToAccessible: value })}
                  />
                  <VoiceSlider
                    leftLabel="Reserved"
                    rightLabel="Enthusiastic"
                    value={brandVoice.reservedToEnthusiastic}
                    onChange={(value) => setBrandVoice({ ...brandVoice, reservedToEnthusiastic: value })}
                  />
                  <VoiceSlider
                    leftLabel="Traditional"
                    rightLabel="Innovative"
                    value={brandVoice.traditionalToInnovative}
                    onChange={(value) => setBrandVoice({ ...brandVoice, traditionalToInnovative: value })}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-3">Content Pillars</h3>
                <div className="space-y-2">
                  {contentPillars.map((pillar, index) => (
                    <ContentPillar key={index} pillar={pillar} />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </CardUI>
      </div>
    </div>
  );
}
