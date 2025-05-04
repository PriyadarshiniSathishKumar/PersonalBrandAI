import { useState } from "react";
import CalendarComponent from "@/components/Calendar";
import { Button } from "@/components/ui/button";
import { Filter, PenSquare } from "lucide-react";

export default function ContentCalendar() {
  const [events, setEvents] = useState([
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
    },
    {
      id: "5",
      title: "LinkedIn: Case Study",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 12),
      platform: "linkedin" as const
    },
    {
      id: "6",
      title: "Twitter: Poll",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 15),
      platform: "twitter" as const
    },
    {
      id: "7",
      title: "IG: Carousel",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 17),
      platform: "instagram" as const
    },
    {
      id: "8",
      title: "FB: Live Event",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 20),
      platform: "facebook" as const
    },
    {
      id: "9",
      title: "LinkedIn: Newsletter",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 22),
      platform: "linkedin" as const
    },
    {
      id: "10",
      title: "IG: Story Series",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 25),
      platform: "instagram" as const
    },
    {
      id: "11",
      title: "Twitter: Q&A",
      date: new Date(new Date().getFullYear(), new Date().getMonth(), 28),
      platform: "twitter" as const
    }
  ]);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Content Calendar</h1>
        <p className="text-muted-foreground">Schedule and manage your content across platforms</p>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Calendar</h2>
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

      <CalendarComponent events={events} />
    </div>
  );
}
