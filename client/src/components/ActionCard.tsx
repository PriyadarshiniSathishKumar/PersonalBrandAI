import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";

interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  iconBgColor?: string;
  iconColor?: string;
}

export default function ActionCard({
  icon,
  title,
  description,
  href,
  iconBgColor = "bg-primary/10",
  iconColor = "text-primary"
}: ActionCardProps) {
  return (
    <Link href={href}>
      <Card className="hover:border-black hover:shadow-lg transition-all duration-300 group cursor-pointer animate-fade-in transform hover:scale-102 hover:-rotate-1">
        <CardContent className="p-4 flex items-center">
          <div className={`mr-4 w-12 h-12 rounded-md bg-black flex items-center justify-center text-white shadow-md group-hover:animate-pulse-subtle transform group-hover:scale-110 transition-all duration-300`}>
            {icon}
          </div>
          <div className="text-left">
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <ChevronRight className="ml-auto h-6 w-6 text-black opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
        </CardContent>
      </Card>
    </Link>
  );
}
