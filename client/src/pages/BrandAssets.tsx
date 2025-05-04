import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Image, FileText, FileArchive, Plus, Download } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BrandAssets() {
  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Brand Assets</h1>
          <p className="text-muted-foreground">Manage and organize your brand assets</p>
        </div>
        <div className="flex space-x-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Upload
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Asset</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="border-2 border-dashed rounded-md p-8 text-center">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-1">Drag and drop your files here</p>
                  <p className="text-xs text-muted-foreground mb-3">Supports JPG, PNG, SVG, PDF up to 5MB</p>
                  <Button size="sm" variant="secondary">Browse Files</Button>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assetName">Asset Name</Label>
                  <Input id="assetName" placeholder="Enter a name for your asset" />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="submit">Upload Asset</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="logos">
        <TabsList className="mb-6">
          <TabsTrigger value="logos">Logos</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="archives">Archives</TabsTrigger>
        </TabsList>

        <TabsContent value="logos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-4">
                <div className="aspect-square bg-muted rounded-md flex items-center justify-center mb-3">
                  <Image className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Primary Logo</h3>
                    <p className="text-xs text-muted-foreground">PNG • 1.2MB</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="aspect-square bg-muted rounded-md flex items-center justify-center mb-3">
                  <Image className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Icon Logo</h3>
                    <p className="text-xs text-muted-foreground">SVG • 34KB</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="aspect-square bg-muted border border-dashed rounded-md flex flex-col items-center justify-center mb-3">
                  <Plus className="h-10 w-10 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Add Logo</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="images" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <Card key={index}>
                <CardContent className="p-0">
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <Image className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm">Brand Image {index}</h3>
                    <p className="text-xs text-muted-foreground">JPG • 1.2MB</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-4">
                <div className="aspect-square bg-muted rounded-md flex items-center justify-center mb-3">
                  <FileText className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Brand Guidelines</h3>
                    <p className="text-xs text-muted-foreground">PDF • 2.3MB</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="aspect-square bg-muted rounded-md flex items-center justify-center mb-3">
                  <FileText className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Content Strategy</h3>
                    <p className="text-xs text-muted-foreground">PDF • 1.5MB</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="aspect-square bg-muted border border-dashed rounded-md flex flex-col items-center justify-center mb-3">
                  <Plus className="h-10 w-10 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Add Document</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="archives" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-4">
                <div className="aspect-square bg-muted rounded-md flex items-center justify-center mb-3">
                  <FileArchive className="h-16 w-16 text-muted-foreground" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">All Brand Assets</h3>
                    <p className="text-xs text-muted-foreground">ZIP • 25.3MB</p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="aspect-square bg-muted border border-dashed rounded-md flex flex-col items-center justify-center mb-3">
                  <Plus className="h-10 w-10 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Add Archive</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}