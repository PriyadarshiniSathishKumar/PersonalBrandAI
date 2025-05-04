import { Card, CardContent } from "@/components/ui/card";
import { SiLinkedin, SiInstagram } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";

interface PlatformCardProps {
  platform: {
    name: string;
    type: string;
    description: string;
    connected: boolean;
    followers: number;
    engagement: number;
    topContent: string;
    growthData: number[];
  };
}

export default function PlatformCard({ platform }: PlatformCardProps) {
  const getPlatformIcon = () => {
    switch (platform.type.toLowerCase()) {
      case "linkedin":
        return <SiLinkedin className="text-[#0077B5] text-xl" />;
      case "twitter":
        return <FaTwitter className="text-[#1DA1F2] text-xl" />;
      case "instagram":
        return <SiInstagram className="text-[#E1306C] text-xl" />;
      default:
        return null;
    }
  };

  const getPlatformColor = () => {
    switch (platform.type.toLowerCase()) {
      case "linkedin":
        return "#0077B5";
      case "twitter":
        return "#1DA1F2";
      case "instagram":
        return "#E1306C";
      default:
        return "#6B7280";
    }
  };

  const color = getPlatformColor();

  return (
    <Card className="hover:shadow-sm transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center mb-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
            style={{ backgroundColor: `${color}10` }}
          >
            {getPlatformIcon()}
          </div>
          <div>
            <h3 className="font-medium">{platform.name}</h3>
            <p className="text-xs text-muted-foreground">{platform.description}</p>
          </div>
          <div className="ml-auto flex items-center">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
            <span className="text-xs text-muted-foreground">
              {platform.connected ? "Connected" : "Not connected"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-muted p-2 rounded">
            <p className="text-xs text-muted-foreground mb-1">Followers</p>
            <p className="font-semibold">{platform.followers.toLocaleString()}</p>
          </div>
          <div className="bg-muted p-2 rounded">
            <p className="text-xs text-muted-foreground mb-1">Engagement</p>
            <p className="font-semibold">{platform.engagement}%</p>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-xs text-muted-foreground mb-1">Growth Trend</p>
          <div className="h-10 bg-muted rounded-md flex items-end">
            {platform.growthData.map((value, index) => (
              <div 
                key={index}
                className="w-1/12 rounded-sm mx-0.5 transition-all duration-300"
                style={{ 
                  height: `${(value / 10) * 100}%`, 
                  backgroundColor: index >= platform.growthData.length - 2 
                    ? color 
                    : `${color}40`
                }}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">Top Performing Content</p>
          <div className="bg-muted p-2 rounded text-xs">
            {platform.topContent}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
