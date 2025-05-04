import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import PlatformCard from "@/components/PlatformCard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PlatformInsights() {
  const [timeRange, setTimeRange] = useState("30days");
  
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
  
  const followerData = [
    { name: 'Jan', linkedin: 3200, twitter: 9800, instagram: 5100 },
    { name: 'Feb', linkedin: 3500, twitter: 10200, instagram: 5400 },
    { name: 'Mar', linkedin: 3800, twitter: 10900, instagram: 6000 },
    { name: 'Apr', linkedin: 4100, twitter: 11300, instagram: 6500 },
    { name: 'May', linkedin: 4500, twitter: 11900, instagram: 7000 },
    { name: 'Jun', linkedin: 4823, twitter: 12547, instagram: 7483 }
  ];
  
  const engagementData = [
    { name: 'Jan', linkedin: 5.1, twitter: 2.9, instagram: 4.2 },
    { name: 'Feb', linkedin: 5.5, twitter: 3.1, instagram: 4.5 },
    { name: 'Mar', linkedin: 6.2, twitter: 3.3, instagram: 4.8 },
    { name: 'Apr', linkedin: 6.8, twitter: 3.5, instagram: 5.1 },
    { name: 'May', linkedin: 7.0, twitter: 3.7, instagram: 5.4 },
    { name: 'Jun', linkedin: 7.2, twitter: 3.8, instagram: 5.6 }
  ];
  
  const contentTypeData = [
    { name: 'Educational', value: 40 },
    { name: 'Stories', value: 20 },
    { name: 'Reviews', value: 15 },
    { name: 'News', value: 15 },
    { name: 'Q&A', value: 10 }
  ];
  
  const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444'];
  
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Platform Insights</h1>
        <p className="text-muted-foreground">Track performance metrics across your connected platforms</p>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Analytics Dashboard</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="6months">Last 6 months</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {platforms.map((platform, index) => (
          <PlatformCard key={index} platform={platform} />
        ))}
      </div>
      
      <Tabs defaultValue="followers" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="followers">Followers</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="content">Content Performance</TabsTrigger>
        </TabsList>
        
        <TabsContent value="followers">
          <Card>
            <CardHeader>
              <CardTitle>Follower Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={followerData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="linkedin" stroke="#0077B5" strokeWidth={2} />
                    <Line type="monotone" dataKey="twitter" stroke="#1DA1F2" strokeWidth={2} />
                    <Line type="monotone" dataKey="instagram" stroke="#E1306C" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Rates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={engagementData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="linkedin" name="LinkedIn" fill="#0077B5" />
                    <Bar dataKey="twitter" name="Twitter" fill="#1DA1F2" />
                    <Bar dataKey="instagram" name="Instagram" fill="#E1306C" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Type Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={contentTypeData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {contentTypeData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-muted rounded-md">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-[#0077B5]/10 flex items-center justify-center text-[#0077B5] mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </div>
                      <span className="font-medium">LinkedIn Article</span>
                      <span className="ml-auto text-xs text-muted-foreground">1.2K engagements</span>
                    </div>
                    <p className="text-sm">5 Strategies I Used to Grow My Network by 500+ Connections in 30 Days</p>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-md">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center text-[#1DA1F2] mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                      </div>
                      <span className="font-medium">Twitter Thread</span>
                      <span className="ml-auto text-xs text-muted-foreground">890 engagements</span>
                    </div>
                    <p className="text-sm">Here's the 5-step process I use to write viral threads that get 1M+ impressions</p>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-md">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-[#E1306C]/10 flex items-center justify-center text-[#E1306C] mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                      </div>
                      <span className="font-medium">Instagram Carousel</span>
                      <span className="ml-auto text-xs text-muted-foreground">750 engagements</span>
                    </div>
                    <p className="text-sm">Behind-the-scenes look at my content creation process [Carousel Post]</p>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-md">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-[#0077B5]/10 flex items-center justify-center text-[#0077B5] mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      </div>
                      <span className="font-medium">LinkedIn Poll</span>
                      <span className="ml-auto text-xs text-muted-foreground">620 engagements</span>
                    </div>
                    <p className="text-sm">What's your biggest challenge when creating content? [Poll]</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
