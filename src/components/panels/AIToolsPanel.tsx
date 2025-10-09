import { useState } from "react";
import { Wand2, Image, Sparkles, Paintbrush, Lightbulb, Pin, Lasso, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

interface AIToolsPanelProps {
  onGenerate?: (settings: any) => void;
}

export const AIToolsPanel = ({ onGenerate }: AIToolsPanelProps) => {
  const [activeTab, setActiveTab] = useState<string>('generate');
  const [prompt, setPrompt] = useState('');
  const [markingTool, setMarkingTool] = useState<'pin' | 'segment' | 'lasso' | 'brush'>('pin');
  
  // Generate settings
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [quality, setQuality] = useState(50);
  const [realism, setRealism] = useState(50);
  const [cameraQuality, setCameraQuality] = useState('dslr');
  
  // Lighting settings
  const [lightingIntensity, setLightingIntensity] = useState(50);
  const [lightingAngle, setLightingAngle] = useState(0);
  
  // Enhance settings
  const [enhanceStrength, setEnhanceStrength] = useState(50);
  const [upscaleFactor, setUpscaleFactor] = useState(2);

  const realismLabels = ['Cartoon', 'Anime', 'Manga', 'Artistic', '3D Render', 'Realistic'];
  const getRealismLabel = (value: number) => {
    const index = Math.floor((value / 100) * (realismLabels.length - 1));
    return realismLabels[index];
  };

  return (
    <div className="flex-1 camera-panel p-4 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold font-mono">AI TOOLS</h2>
        <div className="flex gap-1">
          <Button
            size="sm"
            variant={markingTool === 'pin' ? 'default' : 'outline'}
            onClick={() => setMarkingTool('pin')}
            className="h-7 w-7 p-0"
            title="Pin marking"
          >
            <Pin className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant={markingTool === 'segment' ? 'default' : 'outline'}
            onClick={() => setMarkingTool('segment')}
            className="h-7 w-7 p-0"
            title="Segment marking"
          >
            <Circle className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant={markingTool === 'lasso' ? 'default' : 'outline'}
            onClick={() => setMarkingTool('lasso')}
            className="h-7 w-7 p-0"
            title="Lasso marking"
          >
            <Lasso className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant={markingTool === 'brush' ? 'default' : 'outline'}
            onClick={() => setMarkingTool('brush')}
            className="h-7 w-7 p-0"
            title="Brush marking"
          >
            <Paintbrush className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-5 mb-4">
          <TabsTrigger value="instruct" className="text-xs">
            <Wand2 className="h-3 w-3 mr-1" />
            Instruct
          </TabsTrigger>
          <TabsTrigger value="generate" className="text-xs">
            <Image className="h-3 w-3 mr-1" />
            Generate
          </TabsTrigger>
          <TabsTrigger value="enhance" className="text-xs">
            <Sparkles className="h-3 w-3 mr-1" />
            Enhance
          </TabsTrigger>
          <TabsTrigger value="inpaint" className="text-xs">
            <Paintbrush className="h-3 w-3 mr-1" />
            Inpaint
          </TabsTrigger>
          <TabsTrigger value="lighting" className="text-xs">
            <Lightbulb className="h-3 w-3 mr-1" />
            Lighting
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="instruct" className="mt-0 space-y-3">
            <div className="text-xs text-muted-foreground font-mono mb-4">
              1-CLICK TOOLS
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">Remove Blemish</Button>
              <Button variant="outline" size="sm">Add Object</Button>
              <Button variant="outline" size="sm">Remove Object</Button>
              <Button variant="outline" size="sm">Change Color</Button>
              <Button variant="outline" size="sm">Fix Lighting</Button>
              <Button variant="outline" size="sm">Enhance Detail</Button>
            </div>

            <div className="pt-4">
              <Label className="text-xs text-muted-foreground font-mono">CUSTOM INSTRUCTION</Label>
              <Textarea
                placeholder="Describe what you want to change..."
                className="mt-2"
                rows={4}
              />
              <Button className="w-full mt-2">Apply Instruction</Button>
            </div>
          </TabsContent>

          <TabsContent value="generate" className="mt-0 space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground font-mono">PROMPT</Label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to generate..."
                className="mt-2"
                rows={4}
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground font-mono">ASPECT RATIO</Label>
              <Select value={aspectRatio} onValueChange={setAspectRatio}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1:1">1:1 (Square)</SelectItem>
                  <SelectItem value="16:9">16:9 (Landscape)</SelectItem>
                  <SelectItem value="9:16">9:16 (Portrait)</SelectItem>
                  <SelectItem value="4:3">4:3 (Standard)</SelectItem>
                  <SelectItem value="3:2">3:2 (Photo)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground font-mono">
                QUALITY: {quality}%
              </Label>
              <Slider
                value={[quality]}
                onValueChange={(value) => setQuality(value[0])}
                max={100}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground font-mono">
                STYLE: {getRealismLabel(realism)}
              </Label>
              <Slider
                value={[realism]}
                onValueChange={(value) => setRealism(value[0])}
                max={100}
                step={1}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Cartoon</span>
                <span>Realistic</span>
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground font-mono">CAMERA TYPE</Label>
              <Select value={cameraQuality} onValueChange={setCameraQuality}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal Camera</SelectItem>
                  <SelectItem value="cellphone">Cellphone</SelectItem>
                  <SelectItem value="polaroid">Polaroid</SelectItem>
                  <SelectItem value="dslr">DSLR</SelectItem>
                  <SelectItem value="imax">IMAX</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              className="w-full"
              onClick={() => onGenerate?.({
                prompt,
                aspectRatio,
                quality,
                realism,
                cameraQuality
              })}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Image
            </Button>
          </TabsContent>

          <TabsContent value="enhance" className="mt-0 space-y-4">
            <div className="text-xs text-muted-foreground font-mono mb-2">
              Enhance existing images with AI
            </div>

            <div>
              <Label className="text-xs text-muted-foreground font-mono">
                STRENGTH: {enhanceStrength}%
              </Label>
              <Slider
                value={[enhanceStrength]}
                onValueChange={(value) => setEnhanceStrength(value[0])}
                max={100}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground font-mono">UPSCALE</Label>
              <Select value={upscaleFactor.toString()} onValueChange={(value) => setUpscaleFactor(Number(value))}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1x (Original)</SelectItem>
                  <SelectItem value="2">2x</SelectItem>
                  <SelectItem value="4">4x</SelectItem>
                  <SelectItem value="8">8x</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground font-mono">Denoise</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground font-mono">Sharpen</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground font-mono">Color Correct</Label>
                <Switch />
              </div>
            </div>

            <Button className="w-full">
              <Sparkles className="mr-2 h-4 w-4" />
              Enhance Image
            </Button>
          </TabsContent>

          <TabsContent value="inpaint" className="mt-0 space-y-4">
            <div className="text-xs text-muted-foreground font-mono mb-2">
              Use marking tools to select area, then describe changes
            </div>

            <div>
              <Label className="text-xs text-muted-foreground font-mono">INPAINT PROMPT</Label>
              <Textarea
                placeholder="Describe what should be in the selected area..."
                className="mt-2"
                rows={4}
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground font-mono">MODE</Label>
              <Select defaultValue="fill">
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fill">Fill Area</SelectItem>
                  <SelectItem value="replace">Replace Object</SelectItem>
                  <SelectItem value="extend">Extend Canvas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full">
              <Paintbrush className="mr-2 h-4 w-4" />
              Apply Inpainting
            </Button>
          </TabsContent>

          <TabsContent value="lighting" className="mt-0 space-y-4">
            <div className="text-xs text-muted-foreground font-mono mb-2">
              Adjust lighting and relighting effects
            </div>

            <div>
              <Label className="text-xs text-muted-foreground font-mono">
                INTENSITY: {lightingIntensity}%
              </Label>
              <Slider
                value={[lightingIntensity]}
                onValueChange={(value) => setLightingIntensity(value[0])}
                max={100}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground font-mono">
                ANGLE: {lightingAngle}°
              </Label>
              <Slider
                value={[lightingAngle]}
                onValueChange={(value) => setLightingAngle(value[0])}
                max={360}
                step={1}
                className="mt-2"
              />
            </div>

            <div>
              <Label className="text-xs text-muted-foreground font-mono">LIGHT TYPE</Label>
              <Select defaultValue="natural">
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="natural">Natural</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="dramatic">Dramatic</SelectItem>
                  <SelectItem value="soft">Soft</SelectItem>
                  <SelectItem value="neon">Neon</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground font-mono">Cast Shadows</Label>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground font-mono">Ambient Occlusion</Label>
                <Switch />
              </div>
            </div>

            <Button className="w-full">
              <Lightbulb className="mr-2 h-4 w-4" />
              Apply Lighting
            </Button>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
};
