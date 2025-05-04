import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Brush, Type, Layout, Palette, Download } from "lucide-react";

export default function DesignStudio() {
  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Design Studio</h1>
          <p className="text-muted-foreground">Create and manage your brand's visual content</p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Assets
        </Button>
      </div>

      <Tabs defaultValue="templates">
        <TabsList className="mb-4">
          <TabsTrigger value="templates">
            <Layout className="mr-2 h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="images">
            <Image className="mr-2 h-4 w-4" />
            Images
          </TabsTrigger>
          <TabsTrigger value="typography">
            <Type className="mr-2 h-4 w-4" />
            Typography
          </TabsTrigger>
          <TabsTrigger value="colors">
            <Palette className="mr-2 h-4 w-4" />
            Colors
          </TabsTrigger>
          <TabsTrigger value="editor">
            <Brush className="mr-2 h-4 w-4" />
            Editor
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "LinkedIn Banner", type: "Professional header image", bg: "bg-blue-50" },
              { name: "Twitter Post", type: "Engaging social content", bg: "bg-indigo-50" },
              { name: "Instagram Story", type: "Vertical visual content", bg: "bg-purple-50" },
              { name: "Facebook Cover", type: "Brand profile header", bg: "bg-sky-50" },
              { name: "Email Header", type: "Newsletter template", bg: "bg-emerald-50" },
              { name: "Quote Card", type: "Shareable insight", bg: "bg-amber-50" }
            ].map((template, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <div className={`aspect-video ${template.bg} flex flex-col items-center justify-center p-4 relative`}>
                  <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-indigo-500 to-purple-500"></div>
                  <div className="z-10 text-center">
                    <h3 className="font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">{template.name}</h3>
                    <p className="text-sm text-slate-600 mt-1">Click to customize</p>
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{template.name}</p>
                    <Button size="sm" variant="ghost">Edit</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{template.type}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Brand Logo", type: "Primary logo asset", color: "from-blue-500 to-indigo-500" },
              { name: "Team Photo", type: "About page image", color: "from-emerald-500 to-green-600" },
              { name: "Product Showcase", type: "Marketing material", color: "from-orange-400 to-red-500" },
              { name: "Office Space", type: "Company culture", color: "from-indigo-400 to-purple-500" },
              { name: "Avatar Photo", type: "Profile picture", color: "from-sky-400 to-blue-500" },
              { name: "Event Banner", type: "Campaign visual", color: "from-rose-400 to-pink-600" }
            ].map((image, i) => (
              <Card key={i} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                <div className="aspect-video relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${image.color}`}></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg">
                    {image.name}
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/30 text-white text-xs px-2 py-1 rounded-full">
                    1200 × 630 px
                  </div>
                </div>
                <CardContent className="p-3">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">{image.name}</p>
                    <Button size="sm" variant="ghost">View</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{image.type}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="typography" className="space-y-4">
          <Card>
            <CardContent className="p-5">
              <h2 className="text-xl font-semibold mb-4">Brand Typography</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Headings</h3>
                  <div className="space-y-2">
                    <div className="pb-2 border-b">
                      <p className="text-3xl font-bold">Headline 1</p>
                      <p className="text-xs text-muted-foreground">Inter / Bold / 30px</p>
                    </div>
                    <div className="pb-2 border-b">
                      <p className="text-2xl font-bold">Headline 2</p>
                      <p className="text-xs text-muted-foreground">Inter / Bold / 24px</p>
                    </div>
                    <div className="pb-2 border-b">
                      <p className="text-xl font-semibold">Headline 3</p>
                      <p className="text-xs text-muted-foreground">Inter / Semibold / 20px</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Body Text</h3>
                  <div className="space-y-2">
                    <div className="pb-2 border-b">
                      <p className="text-base">Body Regular</p>
                      <p className="text-xs text-muted-foreground">Inter / Regular / 16px</p>
                    </div>
                    <div className="pb-2 border-b">
                      <p className="text-sm">Body Small</p>
                      <p className="text-xs text-muted-foreground">Inter / Regular / 14px</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-4">
          <Card>
            <CardContent className="p-5">
              <h2 className="text-xl font-semibold mb-4">Brand Colors</h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="w-full h-24 rounded-md bg-blue-600"></div>
                  <p className="mt-2 font-medium">Primary</p>
                  <p className="text-xs text-muted-foreground">#2563EB</p>
                </div>
                <div>
                  <div className="w-full h-24 rounded-md bg-blue-100"></div>
                  <p className="mt-2 font-medium">Primary Light</p>
                  <p className="text-xs text-muted-foreground">#DBEAFE</p>
                </div>
                <div>
                  <div className="w-full h-24 rounded-md bg-gray-800"></div>
                  <p className="mt-2 font-medium">Dark</p>
                  <p className="text-xs text-muted-foreground">#1F2937</p>
                </div>
                <div>
                  <div className="w-full h-24 rounded-md bg-gray-100"></div>
                  <p className="mt-2 font-medium">Light</p>
                  <p className="text-xs text-muted-foreground">#F3F4F6</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mt-6 mb-3">Accent Colors</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                <div>
                  <div className="w-full h-12 rounded-md bg-red-500"></div>
                  <p className="mt-1 text-xs text-muted-foreground">#EF4444</p>
                </div>
                <div>
                  <div className="w-full h-12 rounded-md bg-yellow-500"></div>
                  <p className="mt-1 text-xs text-muted-foreground">#EAB308</p>
                </div>
                <div>
                  <div className="w-full h-12 rounded-md bg-green-500"></div>
                  <p className="mt-1 text-xs text-muted-foreground">#22C55E</p>
                </div>
                <div>
                  <div className="w-full h-12 rounded-md bg-purple-500"></div>
                  <p className="mt-1 text-xs text-muted-foreground">#A855F7</p>
                </div>
                <div>
                  <div className="w-full h-12 rounded-md bg-pink-500"></div>
                  <p className="mt-1 text-xs text-muted-foreground">#EC4899</p>
                </div>
                <div>
                  <div className="w-full h-12 rounded-md bg-orange-500"></div>
                  <p className="mt-1 text-xs text-muted-foreground">#F97316</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="editor" className="space-y-4">
          <Card>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold">Design Editor</h2>
                  <p className="text-muted-foreground">Create custom visuals for your brand</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button>Save Design</Button>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-1/5 border rounded-md p-3 bg-card">
                  <h3 className="text-sm font-medium mb-2">Elements</h3>
                  <div className="space-y-3">
                    <div className="p-2 border rounded hover:bg-accent cursor-pointer flex items-center">
                      <Type className="h-4 w-4 mr-2" />
                      <span className="text-sm">Text</span>
                    </div>
                    <div className="p-2 border rounded hover:bg-accent cursor-pointer flex items-center">
                      <Image className="h-4 w-4 mr-2" />
                      <span className="text-sm">Image</span>
                    </div>
                    <div className="p-2 border rounded hover:bg-accent cursor-pointer flex items-center">
                      <Palette className="h-4 w-4 mr-2" />
                      <span className="text-sm">Shape</span>
                    </div>
                    <div className="p-2 border rounded hover:bg-accent cursor-pointer flex items-center">
                      <Layout className="h-4 w-4 mr-2" />
                      <span className="text-sm">Template</span>
                    </div>
                  </div>
                </div>
                
                <div className="w-4/5">
                  <div className="aspect-video bg-white rounded-md border relative">
                    <div className="absolute inset-0 bg-grid-pattern"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                      <div className="text-3xl font-bold text-center text-blue-600 mb-3">Your Brand Message</div>
                      <div className="text-lg text-center text-gray-600 mb-6">Create engaging visuals for your audience</div>
                      <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 mb-4 flex items-center justify-center text-white text-3xl font-bold">
                        LOGO
                      </div>
                      <div className="text-sm text-center text-gray-500">Drag and drop elements to customize your design</div>
                    </div>
                    <div className="absolute top-2 right-2 bg-white/80 rounded-md p-1 text-xs text-gray-500">
                      1200 × 630 px
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {['#2563EB', '#EC4899', '#22C55E', '#F97316'].map((color, i) => (
                      <div 
                        key={i} 
                        className="h-6 rounded cursor-pointer hover:ring-2 ring-offset-2" 
                        style={{backgroundColor: color}}
                      ></div>
                    ))}
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