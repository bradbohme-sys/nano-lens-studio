import { useState } from "react";
import { 
  Camera, 
  Plus, 
  Trash2, 
  Edit3, 
  Image as ImageIcon, 
  Paintbrush, 
  ChevronDown,
  ChevronUp,
  Sparkles,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface SketchLayer {
  id: string;
  type: 'sketch';
  color: string;
  prompt: string;
  canvasData?: string;
}

interface ReferenceLayer {
  id: string;
  type: 'reference';
  name: string;
  imageUrl?: string;
  prompt: string;
  negativePrompt: string;
}

type CompositionLayer = SketchLayer | ReferenceLayer;

const SKETCH_COLORS = ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE'];

export const ImageGenerationDrawer = () => {
  const [open, setOpen] = useState(false);
  const [basePrompt, setBasePrompt] = useState("");
  const [layers, setLayers] = useState<CompositionLayer[]>([]);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [complexity, setComplexity] = useState(0);
  const [assembledPrompt, setAssembledPrompt] = useState("");

  // Camera settings
  const [lens, setLens] = useState("50mm");
  const [aperture, setAperture] = useState("f/1.8");
  const [shutterSpeed, setShutterSpeed] = useState("1/125s");
  const [iso, setIso] = useState("400");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [enforceAspectRatio, setEnforceAspectRatio] = useState(true);

  const addReferenceLayer = () => {
    const newLayer: ReferenceLayer = {
      id: `ref-${Date.now()}`,
      type: 'reference',
      name: `Reference ${layers.filter(l => l.type === 'reference').length + 1}`,
      prompt: "",
      negativePrompt: ""
    };
    setLayers([...layers, newLayer]);
    updateComplexity(layers.length + 1);
  };

  const addSketchLayer = () => {
    const sketchCount = layers.filter(l => l.type === 'sketch').length;
    const color = SKETCH_COLORS[sketchCount % SKETCH_COLORS.length];
    
    const newLayer: SketchLayer = {
      id: `sketch-${Date.now()}`,
      type: 'sketch',
      color: color,
      prompt: `The ${color} sketch defines the pose and position for...`
    };
    setLayers([...layers, newLayer]);
    updateComplexity(layers.length + 1);
  };

  const removeLayer = (id: string) => {
    const newLayers = layers.filter(l => l.id !== id);
    setLayers(newLayers);
    updateComplexity(newLayers.length);
  };

  const updateComplexity = (layerCount: number) => {
    const baseComplexity = basePrompt.length > 0 ? 20 : 0;
    const layerComplexity = layerCount * 15;
    setComplexity(Math.min(100, baseComplexity + layerComplexity));
  };

  const analyzePrompt = () => {
    let analysis = "AI Co-pilot Analysis:\n\n";
    
    if (!basePrompt) {
      analysis += "⚠️ No base prompt provided. Add a creative brief.\n";
    }
    
    if (layers.length === 0) {
      analysis += "ℹ️ No layers added. Consider adding references or sketches for better control.\n";
    }

    const sketchLayers = layers.filter(l => l.type === 'sketch');
    const refLayers = layers.filter(l => l.type === 'reference');
    
    if (sketchLayers.length > 0 && refLayers.length === 0) {
      analysis += "⚠️ You have sketch layers but no references. Add reference images.\n";
    }

    if (complexity > 80) {
      analysis += "⚠️ High complexity may lead to unpredictable results. Consider simplifying.\n";
    } else {
      analysis += "✓ Composition looks well-structured!\n";
    }

    toast.info(analysis);
    assemblePrompt();
  };

  const assemblePrompt = () => {
    let prompt = `You are an expert image editor. Create an image based on the following layered instructions.\n\n`;
    prompt += `BASE PROMPT: ${basePrompt}\n\n`;
    
    layers.forEach((layer, index) => {
      if (layer.type === 'reference') {
        prompt += `IMAGE ${index + 1} is a ${layer.name}. ${layer.prompt}\n`;
        if (layer.negativePrompt) {
          prompt += `Negative: ${layer.negativePrompt}\n`;
        }
      } else {
        prompt += `IMAGE ${index + 1} is a ${layer.color} sketch overlay. ${layer.prompt}\n`;
      }
      prompt += `\n`;
    });

    prompt += `\nCamera Settings: ${lens} lens, ${aperture}, ${shutterSpeed}, ISO ${iso}`;
    setAssembledPrompt(prompt);
  };

  const handleGenerate = () => {
    if (!basePrompt) {
      toast.error("Please add a base prompt");
      return;
    }
    
    assemblePrompt();
    toast.success("Generating image with composed prompt...");
    // Integration point for actual generation
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button 
          size="lg"
          className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-lg camera-button"
        >
          <Camera className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      
      <DrawerContent className="max-h-[85vh] camera-panel border-t-4 border-primary">
        <div className="mx-auto w-full max-w-6xl">
          <DrawerHeader className="relative border-b border-border pb-4">
            <div className="absolute top-4 right-4 flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <DrawerTitle className="flex items-center gap-2 text-2xl font-mono">
              <Camera className="h-6 w-6" />
              ICE - Instructional Composition Environment
            </DrawerTitle>
            <DrawerDescription className="font-mono text-xs">
              Compose your image like a creative director
            </DrawerDescription>
          </DrawerHeader>

          <ScrollArea className="h-[calc(85vh-200px)] px-6">
            <div className="space-y-6 py-6">
              {/* Base Prompt */}
              <div className="space-y-2">
                <Label className="font-mono text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  User Idea (Base Prompt)
                </Label>
                <Textarea
                  value={basePrompt}
                  onChange={(e) => {
                    setBasePrompt(e.target.value);
                    updateComplexity(layers.length);
                  }}
                  placeholder="A futuristic cityscape at dusk, cinematic lighting..."
                  className="min-h-[80px] font-mono camera-input"
                />
              </div>

              <Separator />

              {/* Add Layer Buttons */}
              <div className="flex gap-2">
                <Button onClick={addReferenceLayer} variant="outline" className="flex-1 camera-button">
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Add Reference
                </Button>
                <Button onClick={addSketchLayer} variant="outline" className="flex-1 camera-button">
                  <Paintbrush className="mr-2 h-4 w-4" />
                  Add Sketch Layer
                </Button>
              </div>

              {/* Composition Stack */}
              <div className="space-y-3">
                <Label className="font-mono text-sm">Composition Stack</Label>
                {layers.map((layer) => (
                  <div key={layer.id} className="camera-panel border border-border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {layer.type === 'reference' ? (
                          <>
                            <ImageIcon className="h-4 w-4" />
                            <span className="font-mono text-sm">{layer.name}</span>
                          </>
                        ) : (
                          <>
                            <Paintbrush className="h-4 w-4" />
                            <span className="font-mono text-sm">Sketch Layer ({layer.color})</span>
                            <div 
                              className="h-3 w-3 rounded-full"
                              style={{ 
                                backgroundColor: layer.color.toLowerCase() === 'red' ? '#ef4444' :
                                               layer.color.toLowerCase() === 'blue' ? '#3b82f6' :
                                               layer.color.toLowerCase() === 'green' ? '#22c55e' :
                                               layer.color.toLowerCase() === 'yellow' ? '#eab308' :
                                               layer.color.toLowerCase() === 'purple' ? '#a855f7' : '#f97316'
                              }}
                            />
                          </>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Edit3 className="h-3 w-3" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-8 w-8 p-0"
                          onClick={() => removeLayer(layer.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Input
                        placeholder="Prompt for this layer..."
                        value={layer.prompt}
                        onChange={(e) => {
                          const newLayers = layers.map(l => 
                            l.id === layer.id ? { ...l, prompt: e.target.value } : l
                          );
                          setLayers(newLayers);
                        }}
                        className="font-mono text-xs camera-input"
                      />
                      
                      {layer.type === 'reference' && (
                        <Input
                          placeholder="Negative prompt (optional)..."
                          value={layer.negativePrompt}
                          onChange={(e) => {
                            const newLayers = layers.map(l => 
                              l.id === layer.id ? { ...l, negativePrompt: e.target.value } : l
                            );
                            setLayers(newLayers);
                          }}
                          className="font-mono text-xs camera-input"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Advanced Settings */}
              <div className="space-y-3">
                <Button
                  variant="ghost"
                  onClick={() => setAdvancedOpen(!advancedOpen)}
                  className="w-full justify-between camera-button"
                >
                  <span className="font-mono text-sm">Advanced Settings</span>
                  {advancedOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>

                {advancedOpen && (
                  <div className="camera-panel rounded-lg p-4 space-y-4 border border-border">
                    {/* Camera Controls */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label className="font-mono text-xs">Camera Lens</Label>
                        <Select value={lens} onValueChange={setLens}>
                          <SelectTrigger className="camera-input font-mono">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="24mm">24mm Wide</SelectItem>
                            <SelectItem value="35mm">35mm</SelectItem>
                            <SelectItem value="50mm">50mm Standard</SelectItem>
                            <SelectItem value="85mm">85mm Portrait</SelectItem>
                            <SelectItem value="200mm">200mm Telephoto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="font-mono text-xs">Aperture</Label>
                        <Select value={aperture} onValueChange={setAperture}>
                          <SelectTrigger className="camera-input font-mono">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="f/1.4">f/1.4</SelectItem>
                            <SelectItem value="f/1.8">f/1.8</SelectItem>
                            <SelectItem value="f/2.8">f/2.8</SelectItem>
                            <SelectItem value="f/5.6">f/5.6</SelectItem>
                            <SelectItem value="f/11">f/11</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="font-mono text-xs">Shutter Speed</Label>
                        <Select value={shutterSpeed} onValueChange={setShutterSpeed}>
                          <SelectTrigger className="camera-input font-mono">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1/30s">1/30s</SelectItem>
                            <SelectItem value="1/60s">1/60s</SelectItem>
                            <SelectItem value="1/125s">1/125s</SelectItem>
                            <SelectItem value="1/250s">1/250s</SelectItem>
                            <SelectItem value="1/500s">1/500s</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="font-mono text-xs">ISO</Label>
                        <Select value={iso} onValueChange={setIso}>
                          <SelectTrigger className="camera-input font-mono">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="100">100</SelectItem>
                            <SelectItem value="200">200</SelectItem>
                            <SelectItem value="400">400</SelectItem>
                            <SelectItem value="800">800</SelectItem>
                            <SelectItem value="1600">1600</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Separator />

                    {/* Aspect Ratio */}
                    <div className="space-y-3">
                      <Label className="font-mono text-xs">Smart Aspect Ratio System</Label>
                      <Select value={aspectRatio} onValueChange={setAspectRatio}>
                        <SelectTrigger className="camera-input font-mono">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1:1">1:1 Square</SelectItem>
                          <SelectItem value="4:3">4:3 Standard</SelectItem>
                          <SelectItem value="16:9">16:9 Widescreen</SelectItem>
                          <SelectItem value="21:9">21:9 Ultrawide</SelectItem>
                          <SelectItem value="9:16">9:16 Portrait</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={enforceAspectRatio}
                          onCheckedChange={setEnforceAspectRatio}
                        />
                        <Label className="font-mono text-xs">Enforce on all references</Label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Separator />

              {/* Analysis & Final Prompt */}
              <div className="space-y-3">
                <Label className="font-mono text-sm flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Analysis & Final Prompt
                </Label>
                
                <Button 
                  onClick={analyzePrompt}
                  variant="outline"
                  className="w-full camera-button"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Analyze Prompt (AI Co-pilot)
                </Button>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs">Complexity Meter</span>
                    <span className="font-mono text-xs">{complexity}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${complexity}%` }}
                    />
                  </div>
                </div>

                {assembledPrompt && (
                  <div className="camera-panel rounded-lg p-4 border border-border">
                    <Label className="font-mono text-xs mb-2 block">Assembled Prompt (Read-only)</Label>
                    <ScrollArea className="h-32">
                      <pre className="font-mono text-xs whitespace-pre-wrap">{assembledPrompt}</pre>
                    </ScrollArea>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>

          <DrawerFooter className="border-t border-border">
            <Button 
              size="lg" 
              className="w-full camera-button text-lg font-mono"
              onClick={handleGenerate}
            >
              <Camera className="mr-2 h-5 w-5" />
              GENERATE
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
