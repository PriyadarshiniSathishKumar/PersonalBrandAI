import { useState } from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  PlusCircle, 
  Filter 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  platform: "linkedin" | "twitter" | "instagram" | "facebook";
}

interface CalendarProps {
  events: CalendarEvent[];
  onAddEvent?: () => void;
}

export default function Calendar({ events, onAddEvent }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getMonthData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const daysFromPrevMonth = firstDay;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonth);
    
    const days = [];
    
    // Previous month days
    for (let i = daysInPrevMonth - daysFromPrevMonth + 1; i <= daysInPrevMonth; i++) {
      days.push({
        date: new Date(prevMonthYear, prevMonth, i),
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    // Current month days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.getDate() === today.getDate() && 
                 date.getMonth() === today.getMonth() && 
                 date.getFullYear() === today.getFullYear()
      });
    }
    
    // Fill in any remaining spots in the grid (6 rows x 7 columns = 42 spots)
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;
    const remainingDays = 42 - days.length;
    
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(nextMonthYear, nextMonth, i),
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      return event.date.getDate() === date.getDate() &&
             event.date.getMonth() === date.getMonth() &&
             event.date.getFullYear() === date.getFullYear();
    });
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return "bg-[#0077B5]/10 text-[#0077B5]";
      case "twitter":
        return "bg-[#1DA1F2]/10 text-[#1DA1F2]";
      case "instagram":
        return "bg-[#E1306C]/10 text-[#E1306C]";
      case "facebook":
        return "bg-[#1877F2]/10 text-[#1877F2]";
      default:
        return "bg-muted text-muted-foreground";
    }
  };
  const getWeekDays = () => {
    const today = new Date(currentDate);
    const day = today.getDay(); // Get current day number (0-6)
    const diff = today.getDate() - day; // Adjust to get Sunday
    
    const weekStart = new Date(today.setDate(diff));
    const days = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      days.push({
        date,
        isCurrentMonth: date.getMonth() === currentDate.getMonth(),
        isToday: date.getDate() === new Date().getDate() && 
                date.getMonth() === new Date().getMonth() && 
                date.getFullYear() === new Date().getFullYear()
      });
    }
    
    return days;
  };
  
  // Get events for current view (month, week, or day)
  const getCurrentViewEvents = () => {
    if (view === "day") {
      const today = new Date(currentDate);
      return events.filter(event => 
        event.date.getDate() === today.getDate() &&
        event.date.getMonth() === today.getMonth() &&
        event.date.getFullYear() === today.getFullYear()
      );
    }
    
    if (view === "week") {
      const weekDays = getWeekDays();
      const weekStart = weekDays[0].date;
      const weekEnd = weekDays[6].date;
      
      return events.filter(event => 
        event.date >= weekStart && event.date <= weekEnd
      );
    }
    
    // Default to month view
    return events.filter(event => 
      event.date.getMonth() === currentDate.getMonth() &&
      event.date.getFullYear() === currentDate.getFullYear()
    );
  };
  
  // Get hours for day view
  const getHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push({
        hour: i,
        label: i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`
      });
    }
    return hours;
  };

  // Handler for navigating based on view
  const handlePrevious = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (view === "month") {
        newDate.setMonth(newDate.getMonth() - 1);
      } else if (view === "week") {
        newDate.setDate(newDate.getDate() - 7);
      } else {
        newDate.setDate(newDate.getDate() - 1);
      }
      return newDate;
    });
  };

  const handleNext = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (view === "month") {
        newDate.setMonth(newDate.getMonth() + 1);
      } else if (view === "week") {
        newDate.setDate(newDate.getDate() + 7);
      } else {
        newDate.setDate(newDate.getDate() + 1);
      }
      return newDate;
    });
  };
  
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const monthDays = getMonthData();
  const weekDays = getWeekDays();
  const dayEvents = getCurrentViewEvents();
  const hours = getHours();
  
  // Format date for week and day view header
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('default', { month: 'short', day: 'numeric' });
  };
  
  const getViewTitle = () => {
    if (view === "month") {
      return `${monthName} ${year}`;
    } else if (view === "week") {
      const weekStart = formatDate(weekDays[0].date);
      const weekEnd = formatDate(weekDays[6].date);
      return `${weekStart} - ${weekEnd}`;
    } else {
      return formatDate(currentDate);
    }
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={handlePrevious}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="font-medium">{getViewTitle()}</h3>
            <Button variant="ghost" size="icon" onClick={handleNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={view === "month" ? "secondary" : "outline"}
              size="sm"
              className={view === "month" ? "bg-primary/10 text-primary" : ""}
              onClick={() => setView("month")}
            >
              Month
            </Button>
            <Button
              variant={view === "week" ? "secondary" : "outline"}
              size="sm"
              className={view === "week" ? "bg-primary/10 text-primary" : ""}
              onClick={() => setView("week")}
            >
              Week
            </Button>
            <Button
              variant={view === "day" ? "secondary" : "outline"}
              size="sm"
              className={view === "day" ? "bg-primary/10 text-primary" : ""}
              onClick={() => setView("day")}
            >
              Day
            </Button>
          </div>
        </div>

        {view === "month" && (
          <>
            <div className="grid grid-cols-7 text-center border-b border-border">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
                <div key={i} className="py-2 text-xs font-medium text-muted-foreground">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 divide-x divide-border">
              {monthDays.map((day, index) => {
                const dayEvents = getEventsForDate(day.date);
                
                return (
                  <div 
                    key={index} 
                    className={cn(
                      "h-24 p-1 text-right text-xs border-b border-border relative",
                      day.isCurrentMonth ? "text-foreground" : "text-muted-foreground",
                      day.isToday ? "bg-muted/50" : ""
                    )}
                  >
                    {day.date.getDate()}
                    
                    {dayEvents.map((event, eventIndex) => (
                      <TooltipProvider key={event.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div 
                              className={cn(
                                "absolute px-1 py-0.5 text-xs rounded truncate cursor-pointer",
                                getPlatformColor(event.platform),
                                eventIndex === 0 ? "bottom-1 left-1 right-1" : 
                                  eventIndex === 1 ? "bottom-7 left-1 right-1" : "bottom-13 left-1 right-1"
                              )}
                            >
                              {event.title}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{event.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {event.date.toLocaleString()}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {view === "week" && (
          <>
            <div className="grid grid-cols-7 text-center border-b border-border">
              {weekDays.map((day, i) => (
                <div key={i} className={cn(
                  "py-2 text-xs font-medium", 
                  day.isToday ? "bg-muted/50 text-primary" : "text-muted-foreground"
                )}>
                  <div>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i]}</div>
                  <div className="font-bold">{day.date.getDate()}</div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 divide-x divide-border min-h-[300px]">
              {weekDays.map((day, index) => {
                const dayEvents = getEventsForDate(day.date);
                
                return (
                  <div 
                    key={index} 
                    className={cn(
                      "p-1 text-xs border-b border-border relative",
                      day.isToday ? "bg-muted/30" : ""
                    )}
                  >
                    {dayEvents.map((event, eventIndex) => (
                      <TooltipProvider key={event.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div 
                              className={cn(
                                "px-1 py-1 my-1 text-xs rounded truncate cursor-pointer",
                                getPlatformColor(event.platform)
                              )}
                            >
                              {event.title}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{event.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {event.date.toLocaleString()}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                );
              })}
            </div>
          </>
        )}

        {view === "day" && (
          <div className="min-h-[500px] overflow-y-auto">
            {hours.map((hour, index) => {
              const hourEvents = dayEvents.filter(event => 
                event.date.getHours() === hour.hour
              );
              
              return (
                <div key={index} className="flex border-b border-border">
                  <div className="p-2 w-20 text-xs text-right text-muted-foreground border-r border-border">
                    {hour.label}
                  </div>
                  <div className="flex-1 p-1 min-h-[60px] relative">
                    {hourEvents.map((event, eventIndex) => (
                      <TooltipProvider key={event.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div 
                              className={cn(
                                "px-2 py-1 my-1 text-xs rounded truncate cursor-pointer",
                                getPlatformColor(event.platform)
                              )}
                            >
                              {event.title}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{event.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {event.date.toLocaleString()}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
