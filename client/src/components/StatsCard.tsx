import { Card, CardContent } from "@/components/ui/card";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  change: number;
  progress: number;
  progressColor: string;
}

export default function StatsCard({ 
  title, 
  value, 
  description, 
  change, 
  progress,
  progressColor = "bg-primary" 
}: StatsCardProps) {
  return (
    <Card className="border-2 border-black/10 hover:border-black transition-all duration-300 shadow-md hover:shadow-lg animate-fade-in transform hover:scale-102">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-black font-bold text-base">{title}</span>
          <Badge variant={change > 0 ? "default" : "outline"} className={`text-xs font-bold ${change > 0 ? 'bg-black text-white' : 'border-2 border-black'}`}>
            {change > 0 ? "+" : ""}{change}%
          </Badge>
        </div>
        <div className="flex items-end mb-3">
          <span className="text-3xl font-black">{value}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-muted-foreground text-xs ml-2 mb-1 cursor-help">
                  {description}
                </span>
              </TooltipTrigger>
              <TooltipContent className="bg-black text-white">
                <p className="font-bold">{description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full bg-black rounded-full animate-shimmer transition-all duration-500 ease-in-out`} 
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
