import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CreditCard, BellRing, User, Lock, Globe, MessageSquare, Shield, LogOut, Camera, Upload, X } from "lucide-react";
import { auth, logOut } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [user] = useState(auth.currentUser);
  const [loading, setLoading] = useState(false);
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user?.photoURL || null);
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Pre-defined avatar options
  const avatarOptions = [
    "/avatars/avatar1.png",
    "/avatars/avatar2.png", 
    "/avatars/avatar3.png",
    "/avatars/avatar4.png",
    "/avatars/avatar5.png",
    "/avatars/avatar6.png",
  ];
  
  const handleLogout = async () => {
    setLoading(true);
    try {
      await logOut();
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleAvatarSelect = (url: string) => {
    setSelectedAvatar(url);
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, this would upload the file to storage
      // For now, we'll just create an object URL
      const objectUrl = URL.createObjectURL(file);
      setSelectedAvatar(objectUrl);
    }
  };
  
  const saveAvatar = () => {
    if (selectedAvatar) {
      setAvatarUrl(selectedAvatar);
      setShowAvatarDialog(false);
      
      // In a real app, this would update the user profile in Firebase
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been successfully updated."
      });
    }
  };
  
  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="account">
            <Lock className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <BellRing className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="api">
            <Globe className="mr-2 h-4 w-4" />
            API
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    {avatarUrl ? (
                      <Avatar className="w-32 h-32 border-2 border-muted mb-4">
                        <AvatarImage src={avatarUrl} alt={user?.displayName || "User"} />
                        <AvatarFallback className="text-4xl font-bold">
                          {user?.displayName ? user.displayName.charAt(0) : "U"}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center text-4xl font-bold text-muted-foreground mb-4">
                        {user?.displayName ? user.displayName.charAt(0) : "U"}
                      </div>
                    )}
                    <h2 className="font-semibold text-lg">{user?.displayName || "User"}</h2>
                    <p className="text-muted-foreground">{user?.email || "user@example.com"}</p>
                    <div className="mt-4">
                      <Dialog open={showAvatarDialog} onOpenChange={setShowAvatarDialog}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">Change Avatar</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[525px]">
                          <DialogHeader>
                            <DialogTitle>Change Profile Picture</DialogTitle>
                            <DialogDescription>
                              Choose a new avatar or upload your own image
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-6 py-4">
                            <div>
                              <h3 className="text-sm font-medium mb-3">Upload an image</h3>
                              <div className="flex items-center gap-4">
                                {selectedAvatar && (
                                  <div className="relative">
                                    <Avatar className="w-16 h-16">
                                      <AvatarImage src={selectedAvatar} />
                                      <AvatarFallback>
                                        <User className="h-8 w-8" />
                                      </AvatarFallback>
                                    </Avatar>
                                    <Button 
                                      size="icon"
                                      variant="destructive"
                                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                      onClick={() => setSelectedAvatar(null)}
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>
                                )}
                                
                                <div>
                                  <Input
                                    type="file"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileUpload}
                                  />
                                  <Button 
                                    variant="outline" 
                                    onClick={() => fileInputRef.current?.click()}
                                  >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload Image
                                  </Button>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-medium mb-3">Choose an avatar</h3>
                              <div className="grid grid-cols-3 gap-4">
                                {avatarOptions.map((avatar, index) => (
                                  <div 
                                    key={index}
                                    className={`
                                      relative cursor-pointer rounded-md overflow-hidden
                                      border-2 transition-all
                                      ${selectedAvatar === avatar ? 'border-primary ring-2 ring-primary/20' : 'border-muted hover:border-muted-foreground/50'}
                                    `}
                                    onClick={() => handleAvatarSelect(avatar)}
                                  >
                                    <Avatar className="w-full h-auto aspect-square">
                                      <AvatarImage src={avatar} />
                                      <AvatarFallback>
                                        <User className="h-8 w-8" />
                                      </AvatarFallback>
                                    </Avatar>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setShowAvatarDialog(false)}>
                              Cancel
                            </Button>
                            <Button onClick={saveAvatar} disabled={!selectedAvatar}>
                              Save Avatar
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter your first name" defaultValue={user?.displayName?.split(' ')[0] || ""} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" defaultValue={user?.displayName?.split(' ')[1] || ""} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="Enter your email address" defaultValue={user?.email || ""} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Write a short bio..." className="min-h-[120px]" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" placeholder="https://yourwebsite.com" />
                  </div>

                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="account">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="Enter your current password" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" placeholder="Enter new password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Update Password</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-[#4285F4] flex items-center justify-center text-white mr-3">G</div>
                    <div>
                      <p className="font-medium">Google</p>
                      <p className="text-sm text-muted-foreground">{user?.email || "Connected"}</p>
                    </div>
                  </div>
                  <Button variant="outline">Disconnect</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delete Account</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <Button variant="destructive">Delete Account</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Platform Updates</p>
                      <p className="text-sm text-muted-foreground">Receive updates about new features and improvements</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Content Engagement</p>
                      <p className="text-sm text-muted-foreground">Get notified about likes, comments, and shares on your content</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Analytics Reports</p>
                      <p className="text-sm text-muted-foreground">Receive weekly performance reports</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing</p>
                      <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t pt-6">
                <h3 className="font-medium">App Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Content Published</p>
                      <p className="text-sm text-muted-foreground">Get notified when content is published</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Calendar Reminders</p>
                      <p className="text-sm text-muted-foreground">Get reminded of upcoming scheduled content</p>
                    </div>
                    <Switch defaultChecked={true} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="font-medium text-lg">Pro Plan</p>
                    <p className="text-muted-foreground">$24.99/month, billed monthly</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="destructive">Cancel Plan</Button>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/10 rounded-md p-4">
                  <p className="font-medium mb-1">Your next payment is on May 15, 2025</p>
                  <p className="text-sm text-muted-foreground">Your subscription will automatically renew on the date above. You can cancel anytime before then.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-md bg-slate-800 flex items-center justify-center text-white mr-3">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/2025</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>
                <Button variant="outline">Add Payment Method</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md divide-y">
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">April 15, 2025</p>
                      <p className="text-sm text-muted-foreground">Pro Plan - Monthly</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$24.99</p>
                      <Button variant="link" size="sm" className="h-auto p-0">View Receipt</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">March 15, 2025</p>
                      <p className="text-sm text-muted-foreground">Pro Plan - Monthly</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$24.99</p>
                      <Button variant="link" size="sm" className="h-auto p-0">View Receipt</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4">
                    <div>
                      <p className="font-medium">February 15, 2025</p>
                      <p className="text-sm text-muted-foreground">Pro Plan - Monthly</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$24.99</p>
                      <Button variant="link" size="sm" className="h-auto p-0">View Receipt</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="api">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Enable API Access</p>
                    <p className="text-sm text-muted-foreground">Allow external applications to access your account data</p>
                  </div>
                  <Switch defaultChecked={true} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <div className="flex">
                    <Input id="apiKey" value="••••••••••••••••••••••••••••••••" readOnly className="flex-1 rounded-r-none" />
                    <Button variant="secondary" className="rounded-l-none">Show</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Keep this key secret. Do not share it publicly.</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <Button variant="outline">Regenerate API Key</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Webhook Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input id="webhookUrl" placeholder="https://yourapp.com/webhook" />
                </div>

                <div className="space-y-2">
                  <Label>Webhook Events</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="event-content-published" />
                      <Label htmlFor="event-content-published">Content Published</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="event-engagement" />
                      <Label htmlFor="event-engagement">Engagement Updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="event-analytics" />
                      <Label htmlFor="event-analytics">Analytics Reports</Label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Save Webhook Settings</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 border-t pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-muted-foreground" /> 
            <span className="text-sm text-muted-foreground">Your data is stored securely according to our <a href="#" className="underline">Privacy Policy</a></span>
          </div>
          <Button variant="outline" onClick={handleLogout} disabled={loading}>
            <LogOut className="mr-2 h-4 w-4" />
            {loading ? "Logging out..." : "Log Out"}
          </Button>
        </div>
      </div>
    </div>
  );
}