import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiLinkedin, SiInstagram, SiFacebook } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Link2, Plus, ArrowRight, Settings, ExternalLink, RefreshCw } from "lucide-react";

export default function Platforms() {
  const [connected, setConnected] = useState({
    linkedin: false,
    twitter: false,
    instagram: false,
    facebook: false
  });

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Platforms</h1>
          <p className="text-muted-foreground">Connect and manage your social media accounts</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Connect Platform
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Connect a Platform</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Select a platform to connect</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Card className={`cursor-pointer hover:border-primary ${connected.linkedin ? "border-primary bg-primary/5" : ""}`}>
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <SiLinkedin className="h-10 w-10 text-[#0077B5] mb-2" />
                      <p className="font-medium text-center">LinkedIn</p>
                    </CardContent>
                  </Card>
                  <Card className={`cursor-pointer hover:border-primary ${connected.twitter ? "border-primary bg-primary/5" : ""}`}>
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <FaTwitter className="h-10 w-10 text-[#1DA1F2] mb-2" />
                      <p className="font-medium text-center">Twitter</p>
                    </CardContent>
                  </Card>
                  <Card className={`cursor-pointer hover:border-primary ${connected.instagram ? "border-primary bg-primary/5" : ""}`}>
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <SiInstagram className="h-10 w-10 text-[#E1306C] mb-2" />
                      <p className="font-medium text-center">Instagram</p>
                    </CardContent>
                  </Card>
                  <Card className={`cursor-pointer hover:border-primary ${connected.facebook ? "border-primary bg-primary/5" : ""}`}>
                    <CardContent className="p-4 flex flex-col items-center justify-center">
                      <SiFacebook className="h-10 w-10 text-[#1877F2] mb-2" />
                      <p className="font-medium text-center">Facebook</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex justify-end">
                <Button>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="connected">
        <TabsList className="mb-6">
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="connected">
          <div className="grid grid-cols-1 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-[#0077B5]/10 flex items-center justify-center mr-4">
                      <SiLinkedin className="h-6 w-6 text-[#0077B5]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">LinkedIn</h3>
                      <p className="text-sm text-muted-foreground">Connected as Alex Morgan</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Sync
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Profile
                    </Button>
                  </div>
                </div>

                <div className="mt-6 border-t pt-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Followers</p>
                      <p className="text-2xl font-bold">2,345</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Engagement Rate</p>
                      <p className="text-2xl font-bold">3.2%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Posts</p>
                      <p className="text-2xl font-bold">127</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t pt-6">
                  <h4 className="font-medium mb-3">Automation Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-publish content</p>
                        <p className="text-sm text-muted-foreground">Automatically publish scheduled content</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Engagement notifications</p>
                        <p className="text-sm text-muted-foreground">Get notified about new engagement</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Analytics tracking</p>
                        <p className="text-sm text-muted-foreground">Track performance of your posts</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center mr-4">
                      <FaTwitter className="h-6 w-6 text-[#1DA1F2]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Twitter</h3>
                      <p className="text-sm text-muted-foreground">Connected as @alexmorgan</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Sync
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Profile
                    </Button>
                  </div>
                </div>

                <div className="mt-6 border-t pt-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Followers</p>
                      <p className="text-2xl font-bold">5,782</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Engagement Rate</p>
                      <p className="text-2xl font-bold">2.8%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Tweets</p>
                      <p className="text-2xl font-bold">342</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t pt-6">
                  <h4 className="font-medium mb-3">Automation Settings</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Auto-publish content</p>
                        <p className="text-sm text-muted-foreground">Automatically publish scheduled content</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Engagement notifications</p>
                        <p className="text-sm text-muted-foreground">Get notified about new engagement</p>
                      </div>
                      <Switch checked={false} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Analytics tracking</p>
                        <p className="text-sm text-muted-foreground">Track performance of your posts</p>
                      </div>
                      <Switch checked={true} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="available">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-[#E1306C]/10 flex items-center justify-center mr-4">
                    <SiInstagram className="h-6 w-6 text-[#E1306C]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">Instagram</h3>
                    <p className="text-sm text-muted-foreground">Connect your Instagram profile</p>
                  </div>
                  <Button>Connect</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-[#1877F2]/10 flex items-center justify-center mr-4">
                    <SiFacebook className="h-6 w-6 text-[#1877F2]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">Facebook</h3>
                    <p className="text-sm text-muted-foreground">Connect your Facebook page</p>
                  </div>
                  <Button>Connect</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Global Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sync frequency</p>
                      <p className="text-sm text-muted-foreground">How often to sync with platforms</p>
                    </div>
                    <div className="w-[200px]">
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2">
                        <option>Every hour</option>
                        <option>Every 12 hours</option>
                        <option>Daily</option>
                        <option>Manual only</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Default publishing time</p>
                      <p className="text-sm text-muted-foreground">When to publish content if no time specified</p>
                    </div>
                    <div className="w-[200px]">
                      <Input type="time" value="10:00" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto cross-posting</p>
                      <p className="text-sm text-muted-foreground">Automatically share content across platforms</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-medium mb-3">API Authentication</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="apiKey">API Key</Label>
                    <div className="flex mt-1.5">
                      <Input id="apiKey" type="password" value="********************************" className="flex-1 rounded-r-none" readOnly />
                      <Button variant="secondary" className="rounded-l-none">Show</Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5">Used to authenticate with platform APIs</p>
                  </div>

                  <div>
                    <Label htmlFor="callback">Callback URL</Label>
                    <div className="flex mt-1.5">
                      <Input id="callback" value="https://personalbrandai.com/platform/callback" className="flex-1 rounded-r-none" readOnly />
                      <Button variant="secondary" className="rounded-l-none">Copy</Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5">Use this URL when setting up platform developer accounts</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}