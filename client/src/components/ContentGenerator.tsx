import { useState } from "react";
import { 
  Card,
  CardContent 
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { RefreshCw, Edit, Copy, Wand2, Calendar as CalendarIcon, Save, Clock } from "lucide-react";
import { SiLinkedin, SiInstagram, SiFacebook } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import { Platform, generateContent } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function ContentGenerator() {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [content, setContent] = useState("");
  const [platform, setPlatform] = useState<Platform>("linkedin");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [type, setType] = useState("educational");
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedDrafts, setSavedDrafts] = useState<Array<{
    id: string;
    content: string;
    platform: Platform;
    timestamp: Date;
  }>>([]);
  const [scheduledPosts, setScheduledPosts] = useState<Array<{
    id: string;
    content: string;
    platform: Platform;
    scheduledDate: Date;
  }>>([]);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduledDate, setScheduledDate] = useState<Date>(new Date());

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Content brief required",
        description: "Please enter a description of the content you want to create.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      const result = await generateContent({
        prompt,
        tone: tone as any,
        length: length as any,
        type: type as any,
        platform
      });
      setContent(result.content);
      toast({
        title: "Content generated",
        description: "Your content has been generated successfully."
      });
    } catch (error) {
      toast({
        title: "Failed to generate content",
        description: (error as Error).message,
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "Content has been copied to your clipboard."
    });
  };

  const getPlatformIcon = () => {
    switch (platform) {
      case "linkedin":
        return <SiLinkedin className="text-[#0077B5] mr-2" />;
      case "twitter":
        return <FaTwitter className="text-[#1DA1F2] mr-2" />;
      case "instagram":
        return <SiInstagram className="text-[#E1306C] mr-2" />;
      case "facebook":
        return <SiFacebook className="text-[#1877F2] mr-2" />;
    }
  };

  const ToneButton = ({ value, label }: { value: string; label: string }) => (
    <Button
      variant={tone === value ? "secondary" : "outline"}
      className={tone === value ? "border-primary/50 bg-primary/10 text-primary" : ""}
      onClick={() => setTone(value)}
    >
      {label}
    </Button>
  );

  const LengthButton = ({ value, label }: { value: string; label: string }) => (
    <Button
      variant={length === value ? "secondary" : "outline"}
      className={length === value ? "border-primary/50 bg-primary/10 text-primary" : ""}
      onClick={() => setLength(value)}
    >
      {label}
    </Button>
  );

  const TypeButton = ({ value, label }: { value: string; label: string }) => (
    <Button
      variant={type === value ? "secondary" : "outline"}
      className={type === value ? "border-primary/50 bg-primary/10 text-primary" : ""}
      onClick={() => setType(value)}
    >
      {label}
    </Button>
  );

  return (
    <Card className="border-border mb-8">
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">AI Content Generator</h2>
          <div className="flex space-x-2">
            <Select value={platform} onValueChange={(value) => setPlatform(value as Platform)}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Prompt Input */}
          <div className="md:w-1/3">
            <h3 className="text-sm font-medium mb-2">Content Brief</h3>
            <Textarea 
              className="h-32 resize-none mb-3"
              placeholder="Enter a brief description of what content you'd like to create..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1">Tone</label>
                <div className="grid grid-cols-3 gap-2">
                  <ToneButton value="professional" label="Professional" />
                  <ToneButton value="casual" label="Casual" />
                  <ToneButton value="inspiring" label="Inspiring" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Length</label>
                <div className="grid grid-cols-3 gap-2">
                  <LengthButton value="short" label="Short" />
                  <LengthButton value="medium" label="Medium" />
                  <LengthButton value="long" label="Long" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Post Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <TypeButton value="educational" label="Educational" />
                  <TypeButton value="story" label="Story" />
                </div>
              </div>
            </div>
          </div>

          {/* Generated Content */}
          <div className="md:w-2/3 border border-border rounded-md overflow-hidden">
            <div className="bg-muted border-b border-border px-4 py-2 flex justify-between items-center">
              <div className="flex items-center">
                {getPlatformIcon()}
                <span className="text-sm font-medium">{platform.charAt(0).toUpperCase() + platform.slice(1)} Post</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={handleGenerate} disabled={isGenerating}>
                  <RefreshCw className={`h-4 w-4 ${isGenerating ? 'animate-spin' : ''}`} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4 bg-background h-64 overflow-y-auto">
              <div className="prose text-sm whitespace-pre-wrap">
                {content || (
                  <div className="text-muted-foreground text-center h-full flex items-center justify-center">
                    <p>Generated content will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end space-x-3">
          <Button 
            variant="outline" 
            disabled={!content}
            onClick={() => {
              if (!content) {
                toast({
                  title: "No content to save",
                  description: "Please generate content first before saving to drafts.",
                  variant: "destructive"
                });
                return;
              }
              
              setSavedDrafts([
                ...savedDrafts, 
                {
                  id: Math.random().toString(36).substring(2, 9),
                  content,
                  platform,
                  timestamp: new Date()
                }
              ]);
              
              toast({
                title: "Saved to drafts",
                description: "Your content has been saved to drafts."
              });
            }}
          >
            <Save className="mr-2 h-4 w-4" />
            Save to Drafts
          </Button>
          
          <Button 
            disabled={!content}
            onClick={() => {
              if (!content) {
                toast({
                  title: "No content to schedule",
                  description: "Please generate content first before scheduling.",
                  variant: "destructive"
                });
                return;
              }
              setIsScheduleModalOpen(true);
            }}
          >
            <Clock className="mr-2 h-4 w-4" />
            Schedule Post
          </Button>
        </div>
        
        <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Post</DialogTitle>
              <DialogDescription>
                Choose when to publish your content on {platform.charAt(0).toUpperCase() + platform.slice(1)}.
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex flex-col space-y-4 py-4">
              <div className="flex flex-col space-y-2">
                <Label>Post Date</Label>
                <div className="border rounded-md p-2">
                  <Calendar
                    mode="single"
                    selected={scheduledDate}
                    onSelect={(date) => date && setScheduledDate(date)}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </div>
              </div>
              
              <div>
                <Label>Selected Platform</Label>
                <div className="flex items-center space-x-2 mt-2">
                  {getPlatformIcon()}
                  <span>{platform.charAt(0).toUpperCase() + platform.slice(1)}</span>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsScheduleModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setScheduledPosts([
                  ...scheduledPosts,
                  {
                    id: Math.random().toString(36).substring(2, 9),
                    content,
                    platform,
                    scheduledDate
                  }
                ]);
                
                setIsScheduleModalOpen(false);
                
                toast({
                  title: "Post scheduled",
                  description: `Your content has been scheduled for ${format(scheduledDate, "MMMM dd, yyyy")}.`
                });
              }}>
                Schedule
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
