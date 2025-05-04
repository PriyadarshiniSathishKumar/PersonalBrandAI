import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import VoiceSlider from "@/components/VoiceSlider";
import ContentPillar from "@/components/ContentPillar";
import { analyzeBrandVoice } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";

export default function BrandVoice() {
  const { toast } = useToast();
  const [analyzing, setAnalyzing] = useState(false);
  const [contentSamples, setContentSamples] = useState<string[]>([
    "We're excited to announce our new framework for productivity that helps teams collaborate more effectively.",
    "Just shipped a game-changing feature! Our users are going to love this productivity boost."
  ]);
  const [newSample, setNewSample] = useState("");
  const [brandVoice, setBrandVoice] = useState({
    formalToCasual: 65,
    technicalToAccessible: 80,
    reservedToEnthusiastic: 70,
    traditionalToInnovative: 85
  });
  const [contentPillars, setContentPillars] = useState([
    { name: "Product & Innovation", percentage: 30, icon: "lightbulb" },
    { name: "Industry Insights", percentage: 25, icon: "barChart" },
    { name: "Growth Strategies", percentage: 20, icon: "trendingUp" },
    { name: "Customer Success", percentage: 15, icon: "heart" },
    { name: "Product Updates", percentage: 10, icon: "rocket" }
  ]);

  const addContentSample = () => {
    if (newSample.trim()) {
      setContentSamples([...contentSamples, newSample]);
      setNewSample("");
    }
  };

  const removeContentSample = (index: number) => {
    setContentSamples(contentSamples.filter((_, i) => i !== index));
  };

  const analyzeVoice = async () => {
    if (contentSamples.length < 2) {
      toast({
        title: "Not enough content samples",
        description: "Please add at least 2 content samples for analysis",
        variant: "destructive"
      });
      return;
    }

    setAnalyzing(true);
    try {
      const results = await analyzeBrandVoice(contentSamples);
      setBrandVoice({
        formalToCasual: results.formalToCasual,
        technicalToAccessible: results.technicalToAccessible,
        reservedToEnthusiastic: results.reservedToEnthusiastic,
        traditionalToInnovative: results.traditionalToInnovative
      });
      setContentPillars(results.suggestedPillars);
      toast({
        title: "Analysis complete",
        description: "Your brand voice has been analyzed successfully"
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: (error as Error).message,
        variant: "destructive"
      });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Brand Voice Settings</h1>
        <p className="text-muted-foreground">Define your unique brand personality and content pillars</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Content Samples</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Add examples of your existing content to analyze your current brand voice.
            </p>
            
            <div className="space-y-4 mb-4">
              {contentSamples.map((sample, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea 
                    value={sample}
                    onChange={(e) => {
                      const newSamples = [...contentSamples];
                      newSamples[index] = e.target.value;
                      setContentSamples(newSamples);
                    }}
                    className="flex-1"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => removeContentSample(index)}
                    className="h-auto"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2 mb-4">
              <Textarea 
                placeholder="Add a new content sample..."
                value={newSample}
                onChange={(e) => setNewSample(e.target.value)}
                className="flex-1"
              />
              <Button 
                variant="outline" 
                onClick={addContentSample}
                className="h-auto"
              >
                Add
              </Button>
            </div>
            
            <Button 
              className="w-full" 
              onClick={analyzeVoice}
              disabled={analyzing}
            >
              {analyzing ? "Analyzing..." : "Analyze Brand Voice"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Brand Voice Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold mb-3">Voice Characteristics</h3>
                <div className="space-y-4">
                  <VoiceSlider
                    leftLabel="Formal"
                    rightLabel="Casual"
                    value={brandVoice.formalToCasual}
                    onChange={(value) => setBrandVoice({ ...brandVoice, formalToCasual: value })}
                  />
                  <VoiceSlider
                    leftLabel="Technical"
                    rightLabel="Accessible"
                    value={brandVoice.technicalToAccessible}
                    onChange={(value) => setBrandVoice({ ...brandVoice, technicalToAccessible: value })}
                  />
                  <VoiceSlider
                    leftLabel="Reserved"
                    rightLabel="Enthusiastic"
                    value={brandVoice.reservedToEnthusiastic}
                    onChange={(value) => setBrandVoice({ ...brandVoice, reservedToEnthusiastic: value })}
                  />
                  <VoiceSlider
                    leftLabel="Traditional"
                    rightLabel="Innovative"
                    value={brandVoice.traditionalToInnovative}
                    onChange={(value) => setBrandVoice({ ...brandVoice, traditionalToInnovative: value })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Content Pillars</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Content pillars help you organize and balance your content strategy.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {contentPillars.map((pillar, index) => (
              <div key={index} className="space-y-2">
                <ContentPillar pillar={pillar} />
              </div>
            ))}
          </div>
          
          <Button className="w-full">Save Brand Voice Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
