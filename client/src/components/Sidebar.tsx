import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  BarChartHorizontal, 
  Calendar, 
  Layers, 
  PenSquare, 
  Palette, 
  Volume2, 
  Target, 
  Link2,
  Menu, 
  Settings, 
  LayoutDashboard,
  User
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/contexts/AuthContext";

export default function Sidebar() {
  const [location] = useLocation();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  
  const NavItem = ({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) => (
    <Link href={href}>
      <Button
        variant="ghost"
        className={`w-full justify-start transition-all duration-300 ${
          active 
            ? "bg-black text-white font-bold animate-pulse-subtle" 
            : "text-muted-foreground hover:bg-black/80 hover:text-white"
        }`}
        onClick={() => setOpen(false)}
      >
        <span className={`${active ? 'animate-spin-slow' : ''}`}>
          {icon}
        </span>
        <span className={`ml-2 ${active ? 'font-bold' : 'font-medium'}`}>{label}</span>
      </Button>
    </Link>
  );

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-4">
      <div className="px-4 border-b border-border pb-4 flex items-center animate-fade-in">
        <div className="w-10 h-10 rounded-md bg-black flex items-center justify-center text-white font-bold mr-3 shadow-lg transform hover:scale-110 transition-all duration-300 animate-pulse-subtle">
          PB
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tight">Personal Brand <span className="bg-gradient-to-r from-black to-accent bg-clip-text text-transparent">OS</span></h1>
          <p className="text-xs text-muted-foreground">AI-Powered Brand Management</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            Dashboard
          </p>
          <div className="space-y-1">
            <NavItem 
              href="/" 
              icon={<LayoutDashboard className="h-4 w-4" />} 
              label="Overview" 
              active={location === "/"} 
            />
            <NavItem 
              href="/platform-insights" 
              icon={<BarChartHorizontal className="h-4 w-4" />} 
              label="Analytics" 
              active={location === "/platform-insights"} 
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            Content
          </p>
          <div className="space-y-1">
            <NavItem 
              href="/ai-writer" 
              icon={<PenSquare className="h-4 w-4" />} 
              label="AI Writer" 
              active={location === "/ai-writer"} 
            />
            <NavItem 
              href="/content-calendar" 
              icon={<Calendar className="h-4 w-4" />} 
              label="Content Calendar" 
              active={location === "/content-calendar"} 
            />
            <NavItem 
              href="/design-studio" 
              icon={<Layers className="h-4 w-4" />} 
              label="Design Studio" 
              active={location === "/design-studio"} 
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            Brand
          </p>
          <div className="space-y-1">
            <NavItem 
              href="/brand-assets" 
              icon={<Palette className="h-4 w-4" />} 
              label="Brand Assets" 
              active={location === "/brand-assets"} 
            />
            <NavItem 
              href="/brand-voice" 
              icon={<Volume2 className="h-4 w-4" />} 
              label="Voice Settings" 
              active={location === "/brand-voice"} 
            />
            <NavItem 
              href="/audience-insights" 
              icon={<Target className="h-4 w-4" />} 
              label="Audience Insights" 
              active={location === "/audience-insights"} 
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            Connections
          </p>
          <div className="space-y-1">
            <NavItem 
              href="/platforms" 
              icon={<Link2 className="h-4 w-4" />} 
              label="Platforms" 
              active={location === "/platforms"} 
            />
          </div>
        </div>
      </div>

      <div className="border-t border-border p-4">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white mr-3">
            {currentUser?.displayName ? currentUser.displayName.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{currentUser?.displayName || 'Guest User'}</p>
            <p className="text-xs text-muted-foreground">Pro Plan</p>
          </div>
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <div className="md:hidden border-b border-border bg-white sticky top-0 z-10 shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center animate-fade-in">
              <div className="w-10 h-10 rounded-md bg-black flex items-center justify-center text-white font-bold mr-3 shadow-lg animate-pulse-subtle">
                PB
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tight">Personal Brand <span className="bg-gradient-to-r from-black to-accent bg-clip-text text-transparent">OS</span></h1>
                <p className="text-xs text-muted-foreground">AI-Powered Brand Management</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)} className="animate-pulse-subtle">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 bg-background border-r border-border transition-all duration-300 ease-in-out z-10">
      <SidebarContent />
    </aside>
  );
}
