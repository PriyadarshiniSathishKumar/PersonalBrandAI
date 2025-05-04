import { 
  LightbulbIcon, 
  BookOpenIcon, 
  UserIcon, 
  MessageCircleIcon, 
  BarChartIcon, 
  TrendingUpIcon, 
  RocketIcon, 
  HeartIcon, 
  StarIcon,
  AwardIcon
} from "lucide-react";

interface ContentPillarProps {
  pillar: {
    name: string;
    percentage: number;
    icon: string;
  };
}

export default function ContentPillar({ pillar }: ContentPillarProps) {
  const getIcon = () => {
    switch (pillar.icon) {
      case "lightbulb":
        return <LightbulbIcon className="h-6 w-6" />;
      case "book":
        return <BookOpenIcon className="h-6 w-6" />;
      case "user":
        return <UserIcon className="h-6 w-6" />;
      case "message":
        return <MessageCircleIcon className="h-6 w-6" />;
      case "barChart":
        return <BarChartIcon className="h-6 w-6" />;
      case "trendingUp":
        return <TrendingUpIcon className="h-6 w-6" />;
      case "rocket":
        return <RocketIcon className="h-6 w-6" />;
      case "heart":
        return <HeartIcon className="h-6 w-6" />;
      case "star":
        return <StarIcon className="h-6 w-6" />;
      case "award":
        return <AwardIcon className="h-6 w-6" />;
      default:
        return <LightbulbIcon className="h-6 w-6" />;
    }
  };

  const getColor = () => {
    switch (pillar.icon) {
      case "lightbulb":
        return "text-amber-500 bg-amber-500/10";
      case "book":
        return "text-green-600 bg-green-500/10";
      case "user":
        return "text-purple-500 bg-purple-500/10";
      case "message":
        return "text-gray-700 bg-gray-200/50";
      case "barChart":
        return "text-indigo-600 bg-indigo-500/10";
      case "trendingUp":
        return "text-emerald-600 bg-emerald-500/10";
      case "rocket":
        return "text-blue-600 bg-blue-500/10";
      case "heart":
        return "text-pink-500 bg-pink-500/10";
      case "star":
        return "text-yellow-500 bg-yellow-500/10";
      case "award":
        return "text-orange-500 bg-orange-500/10";
      default:
        return "text-primary bg-primary/10";
    }
  };

  return (
    <div className="flex items-center p-3 bg-white border-2 border-black/10 hover:border-black shadow-md hover:shadow-lg rounded-lg transition-all duration-300 transform hover:scale-102 animate-fade-in group">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 shadow-md group-hover:animate-pulse-subtle ${getColor()}`}>
        <div className="group-hover:animate-spin-slow">
          {getIcon()}
        </div>
      </div>
      <div className="flex-1">
        <p className="text-base font-bold">{pillar.name}</p>
        <div className="flex items-center gap-2">
          <div className="bg-black h-2 rounded-full" style={{ width: `${pillar.percentage}px` }}></div>
          <p className="text-sm font-medium">{pillar.percentage}%</p>
        </div>
      </div>
    </div>
  );
}
