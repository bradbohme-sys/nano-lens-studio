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
  AlertCircle,
  Zap,
  BatteryFull,
  HardDrive,
  Aperture,
  Circle,
  RotateCcw,
  Settings2,
  Info
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

interface ImageGenerationDrawerProps {
  onGenerate?: () => void;
  cameraSettings?: {
    aperture: number;
    iso: number;
    shutterSpeed: number;
    exposure: number;
    contrast: number;
    saturation: number;
  };
  prompt?: string;
}

export const ImageGenerationDrawer = ({ onGenerate, cameraSettings, prompt }: ImageGenerationDrawerProps) => {
  const [open, setOpen] = useState(false);
  const [basePrompt, setBasePrompt] = useState(prompt || "");
  const [layers, setLayers] = useState<CompositionLayer[]>([]);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [complexity, setComplexity] = useState(0);
  const [assembledPrompt, setAssembledPrompt] = useState("");

  // Camera settings
  const [lens, setLens] = useState("50mm");
  const [aperture, setAperture] = useState(cameraSettings ? `f/${cameraSettings.aperture}` : "f/1.8");
  const [shutterSpeed, setShutterSpeed] = useState(cameraSettings ? `1/${cameraSettings.shutterSpeed}` : "1/125s");
  const [iso, setIso] = useState(cameraSettings ? String(cameraSettings.iso) : "400");
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
    
    if (onGenerate) {
      onGenerate();
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button 
          className="fixed bottom-6 right-6 z-50 group cursor-pointer"
          aria-label="Open Camera"
        >
          {/* Camera Shutter Button - Realistic 3D */}
          <div className="relative">
            {/* Outer Ring */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[hsl(0_0%_30%)] to-[hsl(0_0%_15%)] shadow-[0_8px_16px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.1)] border-2 border-[hsl(0_0%_20%)] flex items-center justify-center group-hover:scale-105 group-active:scale-95 transition-transform duration-150">
              {/* Inner Button */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(0_100%_50%)] to-[hsl(0_100%_40%)] shadow-[0_4px_12px_rgba(255,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.3)] flex items-center justify-center group-active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)]">
                <Camera className="h-7 w-7 text-white drop-shadow-lg" />
              </div>
            </div>
            {/* Pulse Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20" />
          </div>
        </button>
      </DrawerTrigger>
      
      <DrawerContent className="max-h-[90vh] bg-[hsl(var(--camera-body))] border-none">
        {/* DSLR Camera Body Container */}
        <div className="mx-auto w-full max-w-7xl">
          {/* Camera Top Bezel */}
          <div className="relative bg-gradient-to-b from-[hsl(0_0%_18%)] via-[hsl(0_0%_12%)] to-[hsl(0_0%_10%)] border-b-2 border-[hsl(0_0%_8%)] px-6 py-3">
            {/* Camera Model & Status Bar */}
            <div className="flex items-center justify-between">
              {/* Left: Model Name */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 rounded bg-[hsl(0_0%_8%)] border border-[hsl(0_0%_20%)] shadow-recessed">
                  <Camera className="h-4 w-4 text-primary" />
                  <span className="text-lcd text-xs font-bold tracking-wider">ICE-7D</span>
                </div>
                <div className="flex items-center gap-1">
                  <Circle className="h-2 w-2 text-primary animate-pulse" fill="currentColor" />
                  <span className="text-lcd text-[10px] uppercase tracking-wide">READY</span>
                </div>
              </div>

              {/* Center: Mode Display */}
              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-md bg-gradient-to-br from-[hsl(0_100%_45%)] to-[hsl(0_100%_35%)] shadow-[0_2px_8px_rgba(255,0,0,0.4)]">
                <Sparkles className="h-4 w-4 text-white" />
                <span className="text-white text-sm font-bold tracking-wide">COMPOSITION MODE</span>
              </div>

              {/* Right: Status Indicators */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-[hsl(0_0%_8%)] border border-[hsl(0_0%_20%)]">
                  <BatteryFull className="h-3 w-3 text-accent" />
                  <span className="text-lcd text-[10px]">100%</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-[hsl(0_0%_8%)] border border-[hsl(0_0%_20%)]">
                  <HardDrive className="h-3 w-3 text-accent" />
                  <span className="text-lcd text-[10px]">999</span>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded bg-[hsl(0_0%_8%)] border border-[hsl(0_0%_20%)]">
                  <Zap className="h-3 w-3 text-[hsl(var(--lcd-amber))]" />
                  <span className="text-lcd-amber text-[10px]">AUTO</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main LCD Screen */}
          <div className="lcd-display p-1">
            <ScrollArea className="h-[calc(90vh-280px)]">
              <div className="px-6 py-4 space-y-6">
                {/* Base Prompt - Camera Style */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-3 py-1.5 bg-[hsl(0_0%_8%)] rounded border border-[hsl(0_0%_25%)]">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-lcd text-xs uppercase tracking-widest font-bold">Creative Brief</span>
                    </div>
                    <Info className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <Textarea
                    value={basePrompt}
                    onChange={(e) => {
                      setBasePrompt(e.target.value);
                      updateComplexity(layers.length);
                    }}
                    placeholder="Enter your creative vision: mood, style, composition..."
                    className="min-h-[90px] bg-[hsl(220_20%_8%)] border-2 border-[hsl(0_0%_20%)] text-[hsl(var(--lcd-text))] placeholder:text-[hsl(var(--muted-foreground))] font-mono text-sm shadow-recessed focus:shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),0_0_0_2px_hsl(var(--primary))] transition-all resize-none"
                  />
                </div>

                <Separator className="bg-[hsl(0_0%_20%)]" />

                {/* Control Buttons - Physical Button Style */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={addReferenceLayer}
                    className="group relative overflow-hidden"
                  >
                    <div className="camera-button px-4 py-3 flex items-center justify-center gap-2 border-2 border-[hsl(0_0%_30%)] hover:border-primary transition-all">
                      <ImageIcon className="h-4 w-4 text-accent group-hover:scale-110 transition-transform" />
                      <span className="text-lcd text-xs font-bold uppercase tracking-wide">Add Reference</span>
                    </div>
                  </button>
                  <button
                    onClick={addSketchLayer}
                    className="group relative overflow-hidden"
                  >
                    <div className="camera-button px-4 py-3 flex items-center justify-center gap-2 border-2 border-[hsl(0_0%_30%)] hover:border-primary transition-all">
                      <Paintbrush className="h-4 w-4 text-accent group-hover:scale-110 transition-transform" />
                      <span className="text-lcd text-xs font-bold uppercase tracking-wide">Add Sketch</span>
                    </div>
                  </button>
                </div>

                {/* Composition Stack */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between px-3 py-1.5 bg-[hsl(0_0%_8%)] rounded border border-[hsl(0_0%_25%)]">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-lcd text-xs uppercase tracking-widest font-bold">Layer Stack</span>
                    </div>
                    <span className="text-lcd text-[10px]">{layers.length} LAYERS</span>
                  </div>
                  
                  {layers.map((layer, index) => (
                    <div key={layer.id} className="relative bg-gradient-to-br from-[hsl(0_0%_15%)] to-[hsl(0_0%_10%)] border-2 border-[hsl(0_0%_25%)] rounded-lg p-4 shadow-camera">
                      {/* Layer Number Badge */}
                      <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-[hsl(0_100%_35%)] border-2 border-[hsl(0_0%_8%)] flex items-center justify-center shadow-[0_2px_8px_rgba(255,0,0,0.5)]">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {layer.type === 'reference' ? (
                              <>
                                <div className="p-2 rounded bg-[hsl(0_0%_8%)] border border-[hsl(0_0%_30%)]">
                                  <ImageIcon className="h-4 w-4 text-accent" />
                                </div>
                                <span className="text-lcd font-bold text-sm">{layer.name}</span>
                              </>
                            ) : (
                              <>
                                <div className="p-2 rounded bg-[hsl(0_0%_8%)] border border-[hsl(0_0%_30%)]">
                                  <Paintbrush className="h-4 w-4 text-accent" />
                                </div>
                                <span className="text-lcd font-bold text-sm">Sketch ({layer.color})</span>
                                <div 
                                  className="w-4 h-4 rounded-full border-2 border-[hsl(0_0%_40%)] shadow-[0_0_8px_currentColor]"
                                  style={{ 
                                    backgroundColor: layer.color.toLowerCase() === 'red' ? '#ef4444' :
                                                   layer.color.toLowerCase() === 'blue' ? '#3b82f6' :
                                                   layer.color.toLowerCase() === 'green' ? '#22c55e' :
                                                   layer.color.toLowerCase() === 'yellow' ? '#eab308' :
                                                   layer.color.toLowerCase() === 'purple' ? '#a855f7' : '#f97316',
                                    boxShadow: `0 0 12px ${layer.color.toLowerCase() === 'red' ? '#ef4444' :
                                                   layer.color.toLowerCase() === 'blue' ? '#3b82f6' :
                                                   layer.color.toLowerCase() === 'green' ? '#22c55e' :
                                                   layer.color.toLowerCase() === 'yellow' ? '#eab308' :
                                                   layer.color.toLowerCase() === 'purple' ? '#a855f7' : '#f97316'}`
                                  }}
                                />
                              </>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button className="camera-button h-8 w-8 p-0 flex items-center justify-center border border-[hsl(0_0%_30%)] hover:border-accent transition-colors">
                              <Edit3 className="h-3 w-3 text-accent" />
                            </button>
                            <button 
                              className="camera-button h-8 w-8 p-0 flex items-center justify-center border border-[hsl(0_0%_30%)] hover:border-destructive transition-colors"
                              onClick={() => removeLayer(layer.id)}
                            >
                              <Trash2 className="h-3 w-3 text-destructive" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Input
                            placeholder="Layer instruction..."
                            value={layer.prompt}
                            onChange={(e) => {
                              const newLayers = layers.map(l => 
                                l.id === layer.id ? { ...l, prompt: e.target.value } : l
                              );
                              setLayers(newLayers);
                            }}
                            className="bg-[hsl(220_20%_8%)] border border-[hsl(0_0%_25%)] text-[hsl(var(--lcd-text))] placeholder:text-[hsl(var(--muted-foreground))] font-mono text-xs shadow-recessed focus:border-primary transition-colors"
                          />
                          
                          {layer.type === 'reference' && (
                            <Input
                              placeholder="Negative (avoid)..."
                              value={layer.negativePrompt}
                              onChange={(e) => {
                                const newLayers = layers.map(l => 
                                  l.id === layer.id ? { ...l, negativePrompt: e.target.value } : l
                                );
                                setLayers(newLayers);
                              }}
                              className="bg-[hsl(220_20%_8%)] border border-[hsl(0_0%_25%)] text-[hsl(var(--lcd-amber))] placeholder:text-[hsl(var(--muted-foreground))] font-mono text-xs shadow-recessed focus:border-destructive transition-colors"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="bg-[hsl(0_0%_20%)]" />

                {/* Advanced Settings */}
                <div className="space-y-3">
                  <button
                    onClick={() => setAdvancedOpen(!advancedOpen)}
                    className="w-full camera-button px-4 py-2 flex items-center justify-between border-2 border-[hsl(0_0%_25%)] hover:border-accent transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Settings2 className="h-4 w-4 text-accent" />
                      <span className="text-lcd text-sm font-bold uppercase tracking-wide">Camera Settings</span>
                    </div>
                    {advancedOpen ? <ChevronUp className="h-4 w-4 text-accent" /> : <ChevronDown className="h-4 w-4 text-accent" />}
                  </button>

                  {advancedOpen && (
                    <div className="bg-gradient-to-br from-[hsl(0_0%_12%)] to-[hsl(0_0%_8%)] rounded-lg p-5 border-2 border-[hsl(0_0%_20%)] shadow-recessed space-y-4">
                      {/* Camera Controls - Pro Style */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 px-2 py-1 bg-[hsl(0_0%_8%)] rounded border border-[hsl(0_0%_25%)]">
                            <Aperture className="h-3 w-3 text-accent" />
                            <span className="text-lcd text-[10px] uppercase tracking-widest">Lens</span>
                          </div>
                          <Select value={lens} onValueChange={setLens}>
                            <SelectTrigger className="bg-[hsl(220_20%_8%)] border-2 border-[hsl(0_0%_25%)] text-lcd font-mono text-xs shadow-recessed hover:border-accent transition-colors">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[hsl(0_0%_10%)] border-2 border-[hsl(0_0%_25%)]">
                              <SelectItem value="24mm" className="text-lcd font-mono">24mm Wide</SelectItem>
                              <SelectItem value="35mm" className="text-lcd font-mono">35mm</SelectItem>
                              <SelectItem value="50mm" className="text-lcd font-mono">50mm Standard</SelectItem>
                              <SelectItem value="85mm" className="text-lcd font-mono">85mm Portrait</SelectItem>
                              <SelectItem value="200mm" className="text-lcd font-mono">200mm Telephoto</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 px-2 py-1 bg-[hsl(0_0%_8%)] rounded border border-[hsl(0_0%_25%)]">
                            <Circle className="h-3 w-3 text-accent" />
                            <span className="text-lcd text-[10px] uppercase tracking-widest">Aperture</span>
                          </div>
                          <Select value={aperture} onValueChange={setAperture}>
                            <SelectTrigger className="bg-[hsl(220_20%_8%)] border-2 border-[hsl(0_0%_25%)] text-lcd font-mono text-xs shadow-recessed hover:border-accent transition-colors">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[hsl(0_0%_10%)] border-2 border-[hsl(0_0%_25%)]">
                              <SelectItem value="f/1.4" className="text-lcd font-mono">f/1.4 - Wide Open</SelectItem>
                              <SelectItem value="f/1.8" className="text-lcd font-mono">f/1.8</SelectItem>
                              <SelectItem value="f/2.8" className="text-lcd font-mono">f/2.8</SelectItem>
                              <SelectItem value="f/5.6" className="text-lcd font-mono">f/5.6</SelectItem>
                              <SelectItem value="f/11" className="text-lcd font-mono">f/11 - Deep Focus</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 px-2 py-1 bg-[hsl(0_0%_8%)] rounded border border-[hsl(0_0%_25%)]">
                            <Zap className="h-3 w-3 text-accent" />
                            <span className="text-lcd text-[10px] uppercase tracking-widest">Shutter</span>
                          </div>
                          <Select value={shutterSpeed} onValueChange={setShutterSpeed}>
                            <SelectTrigger className="bg-[hsl(220_20%_8%)] border-2 border-[hsl(0_0%_25%)] text-lcd font-mono text-xs shadow-recessed hover:border-accent transition-colors">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[hsl(0_0%_10%)] border-2 border-[hsl(0_0%_25%)]">
                              <SelectItem value="1/30s" className="text-lcd font-mono">1/30s - Motion Blur</SelectItem>
                              <SelectItem value="1/60s" className="text-lcd font-mono">1/60s</SelectItem>
                              <SelectItem value="1/125s" className="text-lcd font-mono">1/125s</SelectItem>
                              <SelectItem value="1/250s" className="text-lcd font-mono">1/250s</SelectItem>
                              <SelectItem value="1/500s" className="text-lcd font-mono">1/500s - Freeze</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 px-2 py-1 bg-[hsl(0_0%_8%)] rounded border border-[hsl(0_0%_25%)]">
                            <Sparkles className="h-3 w-3 text-accent" />
                            <span className="text-lcd text-[10px] uppercase tracking-widest">ISO</span>
                          </div>
                          <Select value={iso} onValueChange={setIso}>
                            <SelectTrigger className="bg-[hsl(220_20%_8%)] border-2 border-[hsl(0_0%_25%)] text-lcd font-mono text-xs shadow-recessed hover:border-accent transition-colors">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[hsl(0_0%_10%)] border-2 border-[hsl(0_0%_25%)]">
                              <SelectItem value="100" className="text-lcd font-mono">ISO 100 - Bright</SelectItem>
                              <SelectItem value="200" className="text-lcd font-mono">ISO 200</SelectItem>
                              <SelectItem value="400" className="text-lcd font-mono">ISO 400</SelectItem>
                              <SelectItem value="800" className="text-lcd font-mono">ISO 800</SelectItem>
                              <SelectItem value="1600" className="text-lcd font-mono">ISO 1600 - Low Light</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Separator className="bg-[hsl(0_0%_25%)]" />

                      {/* Aspect Ratio */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 px-2 py-1 bg-[hsl(0_0%_8%)] rounded border border-[hsl(0_0%_25%)]">
                          <div className="w-3 h-2 border border-accent rounded-sm" />
                          <span className="text-lcd text-[10px] uppercase tracking-widest">Frame Ratio</span>
                        </div>
                        <Select value={aspectRatio} onValueChange={setAspectRatio}>
                          <SelectTrigger className="bg-[hsl(220_20%_8%)] border-2 border-[hsl(0_0%_25%)] text-lcd font-mono text-xs shadow-recessed hover:border-accent transition-colors">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[hsl(0_0%_10%)] border-2 border-[hsl(0_0%_25%)]">
                            <SelectItem value="1:1" className="text-lcd font-mono">1:1 Square</SelectItem>
                            <SelectItem value="4:3" className="text-lcd font-mono">4:3 Standard</SelectItem>
                            <SelectItem value="16:9" className="text-lcd font-mono">16:9 Widescreen</SelectItem>
                            <SelectItem value="21:9" className="text-lcd font-mono">21:9 Ultrawide</SelectItem>
                            <SelectItem value="9:16" className="text-lcd font-mono">9:16 Portrait</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <div className="flex items-center justify-between px-3 py-2 bg-[hsl(0_0%_8%)] rounded border border-[hsl(0_0%_25%)]">
                          <span className="text-lcd text-[10px] uppercase tracking-wide">Lock Ratio</span>
                          <Switch
                            checked={enforceAspectRatio}
                            onCheckedChange={setEnforceAspectRatio}
                            className="data-[state=checked]:bg-accent"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Separator className="bg-[hsl(0_0%_20%)]" />

                {/* Analysis & Final Prompt */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-3 py-1.5 bg-[hsl(0_0%_8%)] rounded border border-[hsl(0_0%_25%)]">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-3 w-3 text-[hsl(var(--lcd-amber))]" />
                      <span className="text-lcd text-xs uppercase tracking-widest font-bold">AI Analysis</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={analyzePrompt}
                    className="w-full camera-button px-4 py-3 flex items-center justify-center gap-2 border-2 border-[hsl(0_0%_25%)] hover:border-[hsl(var(--lcd-amber))] transition-colors group"
                  >
                    <Sparkles className="h-4 w-4 text-[hsl(var(--lcd-amber))] group-hover:scale-110 transition-transform" />
                    <span className="text-lcd text-sm font-bold uppercase tracking-wide">Run AI Co-Pilot</span>
                  </button>

                  {/* Complexity Meter - Professional Style */}
                  <div className="space-y-2 p-3 bg-[hsl(0_0%_8%)] rounded border border-[hsl(0_0%_25%)]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-lcd text-[10px] uppercase tracking-widest">Complexity</span>
                      <span className="text-lcd text-xs font-bold">{complexity}%</span>
                    </div>
                    <div className="relative h-3 bg-[hsl(0_0%_5%)] rounded-full overflow-hidden border border-[hsl(0_0%_20%)] shadow-recessed">
                      <div 
                        className="absolute inset-y-0 left-0 transition-all duration-500 rounded-full"
                        style={{ 
                          width: `${complexity}%`,
                          background: complexity > 80 
                            ? 'linear-gradient(90deg, hsl(var(--lcd-amber)), hsl(0 100% 50%))'
                            : complexity > 50
                            ? 'linear-gradient(90deg, hsl(var(--lcd-amber)), hsl(var(--lcd-text)))'
                            : 'linear-gradient(90deg, hsl(var(--accent)), hsl(var(--lcd-text)))',
                          boxShadow: `0 0 10px ${complexity > 80 ? 'hsl(0 100% 50% / 0.6)' : 'hsl(var(--accent) / 0.4)'}`
                        }}
                      />
                    </div>
                  </div>

                  {assembledPrompt && (
                    <div className="bg-gradient-to-br from-[hsl(0_0%_12%)] to-[hsl(0_0%_8%)] rounded-lg p-4 border-2 border-[hsl(0_0%_20%)] shadow-recessed">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-lcd text-[10px] uppercase tracking-widest font-bold">Final Prompt</span>
                      </div>
                      <ScrollArea className="h-32">
                        <pre className="text-lcd text-[11px] leading-relaxed whitespace-pre-wrap font-mono">{assembledPrompt}</pre>
                      </ScrollArea>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Bottom Control Panel - Physical Camera Buttons */}
          <div className="relative bg-gradient-to-b from-[hsl(0_0%_15%)] to-[hsl(0_0%_10%)] border-t-2 border-[hsl(0_0%_25%)] px-6 py-4">
            <div className="flex items-center gap-4">
              {/* Function Buttons */}
              <button className="camera-button p-2 border border-[hsl(0_0%_30%)] rounded hover:border-accent transition-colors" title="Reset">
                <RotateCcw className="h-4 w-4 text-accent" />
              </button>
              
              <button className="camera-button p-2 border border-[hsl(0_0%_30%)] rounded hover:border-accent transition-colors" title="Info">
                <Info className="h-4 w-4 text-accent" />
              </button>

              {/* Main Shutter Button */}
              <button 
                onClick={handleGenerate}
                className="flex-1 group relative overflow-hidden"
              >
                <div className="relative bg-gradient-to-br from-primary to-[hsl(0_100%_35%)] px-8 py-4 rounded-lg border-2 border-primary shadow-[0_4px_16px_rgba(255,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_20px_rgba(255,0,0,0.7),inset_0_2px_4px_rgba(255,255,255,0.3)] active:shadow-[inset_0_4px_12px_rgba(0,0,0,0.6)] transition-all duration-150 group-active:scale-95">
                  <div className="flex items-center justify-center gap-3">
                    <Camera className="h-6 w-6 text-white drop-shadow-lg" />
                    <span className="text-white text-xl font-bold uppercase tracking-widest drop-shadow-lg">GENERATE</span>
                  </div>
                </div>
              </button>

              <DrawerClose asChild>
                <button className="camera-button px-4 py-2 border-2 border-[hsl(0_0%_30%)] rounded hover:border-destructive transition-colors">
                  <span className="text-lcd text-xs font-bold uppercase tracking-wide">Close</span>
                </button>
              </DrawerClose>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
