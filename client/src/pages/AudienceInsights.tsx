import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Filter, Download, Users, TrendingUp, UserPlus, X, FileDown, Search, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const ageData = [
  { name: '18-24', value: 35 },
  { name: '25-34', value: 45 },
  { name: '35-44', value: 20 },
  { name: '45-54', value: 10 },
  { name: '55+', value: 5 }
];

const genderData = [
  { name: 'Male', value: 48 },
  { name: 'Female', value: 50 },
  { name: 'Other', value: 2 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const locationData = [
  { name: 'United States', value: 45 },
  { name: 'United Kingdom', value: 15 },
  { name: 'Canada', value: 12 },
  { name: 'Australia', value: 8 },
  { name: 'Germany', value: 5 },
  { name: 'Other', value: 15 }
];

const interestData = [
  { name: 'Technology', value: 75 },
  { name: 'Business', value: 65 },
  { name: 'Marketing', value: 60 },
  { name: 'Education', value: 50 },
  { name: 'Health', value: 30 },
  { name: 'Finance', value: 25 }
];

const growthData = [
  { name: 'Jan', followers: 1000, engagement: 400 },
  { name: 'Feb', followers: 1200, engagement: 450 },
  { name: 'Mar', followers: 1500, engagement: 500 },
  { name: 'Apr', followers: 1800, engagement: 550 },
  { name: 'May', followers: 2100, engagement: 600 },
  { name: 'Jun', followers: 2400, engagement: 650 }
];

export default function AudienceInsights() {
  const { toast } = useToast();
  const [timePeriod, setTimePeriod] = useState("last-30-days");
  
  // Data for different time periods
  const timePeriodsData = {
    "last-7-days": {
      totalAudience: 18465,
      engagement: 3245,
      reach: 42890,
      growth: 8,
      growthData: [
        { name: 'Mon', followers: 17800, engagement: 380 },
        { name: 'Tue', followers: 17950, engagement: 420 },
        { name: 'Wed', followers: 18050, engagement: 450 },
        { name: 'Thu', followers: 18150, engagement: 480 },
        { name: 'Fri', followers: 18250, engagement: 500 },
        { name: 'Sat', followers: 18350, engagement: 510 },
        { name: 'Sun', followers: 18465, engagement: 505 }
      ]
    },
    "last-30-days": {
      totalAudience: 24892,
      engagement: 5680,
      reach: 89750,
      growth: 12,
      growthData: growthData
    },
    "last-90-days": {
      totalAudience: 32450,
      engagement: 9840,
      reach: 145600,
      growth: 28,
      growthData: [
        { name: 'Mar', followers: 25400, engagement: 3200 },
        { name: 'Apr', followers: 28900, engagement: 3500 },
        { name: 'May', followers: 32450, engagement: 3140 }
      ]
    }
  };
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  
  // Filter options
  const [filterOptions, setFilterOptions] = useState({
    platforms: {
      linkedin: false,
      twitter: false,
      instagram: false,
      facebook: false
    },
    demographics: {
      ageGroups: {
        "18-24": false,
        "25-34": false,
        "35-44": false,
        "45+": false
      },
      gender: {
        male: false,
        female: false,
        other: false
      },
      location: {
        us: false,
        europe: false,
        asia: false,
        other: false
      }
    },
    interests: {
      technology: false,
      business: false,
      marketing: false,
      health: false,
      education: false
    }
  });

  const applyFilters = () => {
    const newFilters: string[] = [];
    
    // Process platforms
    Object.entries(filterOptions.platforms).forEach(([key, value]) => {
      if (value) newFilters.push(key.charAt(0).toUpperCase() + key.slice(1));
    });
    
    // Process age groups
    Object.entries(filterOptions.demographics.ageGroups).forEach(([key, value]) => {
      if (value) newFilters.push(`Age ${key}`);
    });
    
    // Process gender
    Object.entries(filterOptions.demographics.gender).forEach(([key, value]) => {
      if (value) newFilters.push(key.charAt(0).toUpperCase() + key.slice(1));
    });
    
    // Process location
    Object.entries(filterOptions.demographics.location).forEach(([key, value]) => {
      if (value) {
        const locationMap: Record<string, string> = {
          us: "United States",
          europe: "Europe",
          asia: "Asia",
          other: "Other Regions"
        };
        newFilters.push(locationMap[key]);
      }
    });
    
    // Process interests
    Object.entries(filterOptions.interests).forEach(([key, value]) => {
      if (value) newFilters.push(key.charAt(0).toUpperCase() + key.slice(1));
    });
    
    setActiveFilters(newFilters);
    setShowFilterDialog(false);
    
    toast({
      title: "Filters applied",
      description: `Applied ${newFilters.length} filters to your audience insights`,
    });
  };

  const clearFilters = () => {
    setFilterOptions({
      platforms: {
        linkedin: false,
        twitter: false,
        instagram: false,
        facebook: false
      },
      demographics: {
        ageGroups: {
          "18-24": false,
          "25-34": false,
          "35-44": false,
          "45+": false
        },
        gender: {
          male: false,
          female: false,
          other: false
        },
        location: {
          us: false,
          europe: false,
          asia: false,
          other: false
        }
      },
      interests: {
        technology: false,
        business: false,
        marketing: false,
        health: false,
        education: false
      }
    });
    setActiveFilters([]);
  };

  const handleExport = (format: 'csv' | 'pdf' | 'excel') => {
    toast({
      title: "Export initiated",
      description: `Exporting audience data in ${format.toUpperCase()} format`,
    });
    
    // In a real app, this would trigger an API call to generate and download the file
    setTimeout(() => {
      toast({
        title: "Export complete",
        description: `Your ${format.toUpperCase()} file has been downloaded`,
      });
    }, 2000);
    
    setShowExportDialog(false);
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  return (
    <div className="container py-6">
      <div className="flex flex-col mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Audience Insights</h1>
            <p className="text-muted-foreground">Understand your audience demographics and behavior</p>
          </div>
          <div className="flex space-x-3">
            <Dialog open={showFilterDialog} onOpenChange={setShowFilterDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Filter Audience Data</DialogTitle>
                  <DialogDescription>
                    Apply filters to see specific segments of your audience
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-1">
                  <div className="space-y-2">
                    <h3 className="font-medium">Platforms</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="linkedin" 
                          checked={filterOptions.platforms.linkedin}
                          onCheckedChange={(checked) => setFilterOptions({
                            ...filterOptions,
                            platforms: {
                              ...filterOptions.platforms,
                              linkedin: checked === true,
                            }
                          })}
                        />
                        <Label htmlFor="linkedin">LinkedIn</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="twitter" 
                          checked={filterOptions.platforms.twitter}
                          onCheckedChange={(checked) => setFilterOptions({
                            ...filterOptions,
                            platforms: {
                              ...filterOptions.platforms,
                              twitter: checked === true,
                            }
                          })}
                        />
                        <Label htmlFor="twitter">Twitter</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="instagram" 
                          checked={filterOptions.platforms.instagram}
                          onCheckedChange={(checked) => setFilterOptions({
                            ...filterOptions,
                            platforms: {
                              ...filterOptions.platforms,
                              instagram: checked === true,
                            }
                          })}
                        />
                        <Label htmlFor="instagram">Instagram</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="facebook" 
                          checked={filterOptions.platforms.facebook}
                          onCheckedChange={(checked) => setFilterOptions({
                            ...filterOptions,
                            platforms: {
                              ...filterOptions.platforms,
                              facebook: checked === true,
                            }
                          })}
                        />
                        <Label htmlFor="facebook">Facebook</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Demographics</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Age Groups</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(filterOptions.demographics.ageGroups).map(([key, value]) => (
                            <div key={key} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`age-${key}`} 
                                checked={value}
                                onCheckedChange={(checked) => setFilterOptions({
                                  ...filterOptions,
                                  demographics: {
                                    ...filterOptions.demographics,
                                    ageGroups: {
                                      ...filterOptions.demographics.ageGroups,
                                      [key]: checked === true,
                                    }
                                  }
                                })}
                              />
                              <Label htmlFor={`age-${key}`}>{key}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Gender</h4>
                        <div className="grid grid-cols-3 gap-2">
                          {Object.entries(filterOptions.demographics.gender).map(([key, value]) => (
                            <div key={key} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`gender-${key}`} 
                                checked={value}
                                onCheckedChange={(checked) => setFilterOptions({
                                  ...filterOptions,
                                  demographics: {
                                    ...filterOptions.demographics,
                                    gender: {
                                      ...filterOptions.demographics.gender,
                                      [key]: checked === true,
                                    }
                                  }
                                })}
                              />
                              <Label htmlFor={`gender-${key}`}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Location</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(filterOptions.demographics.location).map(([key, value]) => {
                            const locationMap: Record<string, string> = {
                              us: "United States",
                              europe: "Europe",
                              asia: "Asia",
                              other: "Other Regions"
                            };
                            return (
                              <div key={key} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`location-${key}`} 
                                  checked={value}
                                  onCheckedChange={(checked) => setFilterOptions({
                                    ...filterOptions,
                                    demographics: {
                                      ...filterOptions.demographics,
                                      location: {
                                        ...filterOptions.demographics.location,
                                        [key]: checked === true,
                                      }
                                    }
                                  })}
                                />
                                <Label htmlFor={`location-${key}`}>{locationMap[key]}</Label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Interests</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(filterOptions.interests).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`interest-${key}`} 
                            checked={value}
                            onCheckedChange={(checked) => setFilterOptions({
                              ...filterOptions,
                              interests: {
                                ...filterOptions.interests,
                                [key]: checked === true,
                              }
                            })}
                          />
                          <Label htmlFor={`interest-${key}`}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={clearFilters}>Clear All</Button>
                  <Button onClick={applyFilters}>Apply Filters</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Export Audience Data</DialogTitle>
                  <DialogDescription>
                    Choose a format to export your audience insights
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="space-y-4">
                    <Button onClick={() => handleExport('csv')} variant="outline" className="w-full justify-start">
                      <FileDown className="mr-2 h-4 w-4" />
                      Export as CSV
                    </Button>
                    <Button onClick={() => handleExport('excel')} variant="outline" className="w-full justify-start">
                      <FileDown className="mr-2 h-4 w-4" />
                      Export as Excel
                    </Button>
                    <Button onClick={() => handleExport('pdf')} variant="outline" className="w-full justify-start">
                      <FileDown className="mr-2 h-4 w-4" />
                      Export as PDF
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                <SelectItem value="year-to-date">Year to date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            <div className="text-sm text-muted-foreground flex items-center">
              <Filter className="h-3 w-3 mr-1" /> Active filters:
            </div>
            {activeFilters.map(filter => (
              <Badge key={filter} variant="outline" className="flex items-center gap-1 pl-2">
                {filter}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                  onClick={() => removeFilter(filter)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              className="text-xs h-6 py-0 px-2"
              onClick={clearFilters}
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Audience</p>
                <p className="text-3xl font-bold">{timePeriodsData[timePeriod as keyof typeof timePeriodsData].totalAudience.toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Users className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">{timePeriodsData[timePeriod as keyof typeof timePeriodsData].growth}%</span>
              <span className="ml-1 text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Engagement Rate</p>
                <p className="text-3xl font-bold">{(timePeriodsData[timePeriod as keyof typeof timePeriodsData].engagement / timePeriodsData[timePeriod as keyof typeof timePeriodsData].totalAudience * 100).toFixed(1)}%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">0.3%</span>
              <span className="ml-1 text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">New Followers</p>
                <p className="text-3xl font-bold">{Math.round(timePeriodsData[timePeriod as keyof typeof timePeriodsData].totalAudience * timePeriodsData[timePeriod as keyof typeof timePeriodsData].growth / 100).toLocaleString()}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <UserPlus className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="font-medium text-green-500">{timePeriodsData[timePeriod as keyof typeof timePeriodsData].growth}%</span>
              <span className="ml-1 text-muted-foreground">vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="demographics">
        <TabsList className="mb-6">
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="psychographics">Psychographics</TabsTrigger>
          <TabsTrigger value="growth">Growth Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" name="Percentage" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {genderData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={locationData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#82ca9d" name="Percentage" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="psychographics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Interest Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={interestData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" name="Interest Level" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Videos', value: 40 },
                          { name: 'Images', value: 30 },
                          { name: 'Articles', value: 20 },
                          { name: 'Podcasts', value: 10 }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {genderData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="growth">
          <Card>
            <CardHeader>
              <CardTitle>Audience Growth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timePeriodsData[timePeriod as keyof typeof timePeriodsData].growthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="followers" fill="#8884d8" name="Followers" />
                    <Bar dataKey="engagement" fill="#82ca9d" name="Engagement" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}