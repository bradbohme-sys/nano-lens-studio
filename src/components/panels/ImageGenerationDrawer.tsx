import { useState } from "react";
import { 
  Camera, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Paintbrush, 
  ChevronDown,
  ChevronUp,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Play,
  Menu,
  Grid3x3,
  Maximize2,
  Lock,
  Unlock,
  Eye,
  Sun,
  Droplet,
  Zap,
  Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

// SVG Texture Patterns for Photorealistic Camera Body
const CameraTextures = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
    <defs>
      {/* Rubber Grip Texture - Raised Dots Pattern */}
      <pattern id="rubberGrip" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill="#0f0f0f"/>
        <circle cx="3" cy="3" r="1.5" fill="#1a1a1a" opacity="0.7"/>
        <circle cx="9" cy="3" r="1.5" fill="#1a1a1a" opacity="0.7"/>
        <circle cx="3" cy="9" r="1.5" fill="#1a1a1a" opacity="0.7"/>
        <circle cx="9" cy="9" r="1.5" fill="#1a1a1a" opacity="0.7"/>
        <circle cx="6" cy="6" r="1.3" fill="#0a0a0a" opacity="0.9"/>
      </pattern>
      
      {/* Brushed Metal Texture - Horizontal Lines */}
      <pattern id="brushedMetal" x="0" y="0" width="120" height="3" patternUnits="userSpaceOnUse">
        <rect width="120" height="3" fill="#2d2d2d"/>
        <line x1="0" y1="0" x2="120" y2="0" stroke="#3a3a3a" strokeWidth="0.5" opacity="0.4"/>
        <line x1="0" y1="1.5" x2="120" y2="1.5" stroke="#222" strokeWidth="0.5" opacity="0.6"/>
        <line x1="0" y1="3" x2="120" y2="3" stroke="#3a3a3a" strokeWidth="0.5" opacity="0.3"/>
      </pattern>
      
      {/* Knurled Dial Texture - Diamond Pattern */}
      <pattern id="knurledDial" x="0" y="0" width="4" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
        <rect width="4" height="8" fill="#2a2a2a"/>
        <line x1="2" y1="0" x2="2" y2="8" stroke="#3a3a3a" strokeWidth="0.8"/>
        <line x1="0" y1="4" x2="4" y2="4" stroke="#1a1a1a" strokeWidth="0.5" opacity="0.6"/>
      </pattern>
      
      {/* LCD Grain Effect */}
      <filter id="lcdGrain">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="2"/>
        <feColorMatrix type="saturate" values="0"/>
        <feComponentTransfer>
          <feFuncA type="discrete" tableValues="0 0 0 0.015 0.015"/>
        </feComponentTransfer>
        <feBlend mode="soft-light" in="SourceGraphic"/>
      </filter>
      
      {/* Button Emboss/Depth Effect */}
      <filter id="buttonEmboss">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/>
        <feOffset dx="0" dy="1.5" result="offsetBlur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.35"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      {/* Inner Shadow for Recessed Elements */}
      <filter id="insetShadow">
        <feComponentTransfer in="SourceAlpha">
          <feFuncA type="table" tableValues="1 0"/>
        </feComponentTransfer>
        <feGaussianBlur stdDeviation="2"/>
        <feOffset dx="0" dy="2" result="offsetblur"/>
        <feFlood floodColor="#000000" result="color"/>
        <feComposite in2="offsetblur" operator="in"/>
        <feComposite in2="SourceAlpha" operator="in"/>
        <feMerge>
          <feMergeNode in="SourceGraphic"/>
          <feMergeNode/>
        </feMerge>
      </filter>
    </defs>
  </svg>
);

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
  const [isGenerating, setIsGenerating] = useState(false);

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
    if (!basePrompt) analysis += "⚠️ No base prompt provided.\n";
    if (layers.length === 0) analysis += "ℹ️ No layers added.\n";
    if (complexity > 80) {
      analysis += "⚠️ High complexity detected.\n";
    } else {
      analysis += "✓ Composition looks good!\n";
    }
    toast.info(analysis);
    assemblePrompt();
  };

  const assemblePrompt = () => {
    let prompt = `Expert image composition.\n\nBASE: ${basePrompt}\n\n`;
    layers.forEach((layer, index) => {
      if (layer.type === 'reference') {
        prompt += `LAYER ${index + 1} (${layer.name}): ${layer.prompt}\n`;
        if (layer.negativePrompt) prompt += `Avoid: ${layer.negativePrompt}\n`;
      } else {
        prompt += `LAYER ${index + 1} (${layer.color} sketch): ${layer.prompt}\n`;
      }
    });
    prompt += `\nSettings: ${lens}, ${aperture}, ${shutterSpeed}, ISO ${iso}`;
    setAssembledPrompt(prompt);
  };

  const handleGenerate = () => {
    if (!basePrompt) {
      toast.error("Add a base prompt first");
      return;
    }
    setIsGenerating(true);
    assemblePrompt();
    toast.success("Generating image...");
    if (onGenerate) onGenerate();
    
    // Reset after 2 seconds
    setTimeout(() => {
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <>
      <CameraTextures />
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button 
            className="fixed bottom-8 right-8 z-50 group"
            aria-label="Open ICE Camera"
            style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.6))' }}
          >
            {/* Hyper-Realistic Shutter Button */}
            <div className="relative w-24 h-24">
              {/* Outer Chrome Ring with Reflection */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#4a4a4a] via-[#2a2a2a] to-[#1a1a1a] shadow-[0_10px_25px_rgba(0,0,0,0.7),inset_0_1px_3px_rgba(255,255,255,0.15),inset_0_-2px_6px_rgba(0,0,0,0.5)]" 
                   style={{ filter: 'url(#buttonEmboss)' }} />
              
              {/* Red Shutter Button */}
              <div className="absolute inset-[8px] rounded-full bg-gradient-to-br from-[#ff4444] via-[#dd0000] to-[#aa0000] shadow-[0_6px_18px_rgba(255,0,0,0.6),inset_0_2px_4px_rgba(255,100,100,0.4),inset_0_-3px_8px_rgba(100,0,0,0.6)] flex items-center justify-center group-hover:from-[#ff5555] group-hover:via-[#ee1111] group-active:shadow-[inset_0_6px_12px_rgba(0,0,0,0.8)] group-active:scale-95 transition-all duration-150">
                <Camera className="w-8 h-8 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" strokeWidth={2.5} />
              </div>
              
              {/* Highlight Gleam */}
              <div className="absolute top-[12px] left-[12px] w-[18px] h-[18px] rounded-full bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
              
              {/* Pulse Animation Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-red-500/30 animate-ping" />
            </div>
          </button>
        </DrawerTrigger>
        
        <DrawerContent 
          className="h-[94vh] border-none p-0 overflow-hidden"
          style={{ 
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 50%, #1a1a1a 100%)',
          }}
        >
          {/* DSLR Camera Body - Canon EOS Style */}
          <div className="relative mx-auto w-full max-w-[1400px] h-full flex flex-col">
            
            {/* Camera Top Panel - Mode & Status */}
            <div className="relative px-8 py-4 border-b border-white/10" 
                 style={{ 
                   background: 'url(#brushedMetal)',
                   boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.08), inset 0 -2px 6px rgba(0,0,0,0.5)'
                 }}>
              <div className="flex items-center justify-between">
                {/* Left: Camera Model & Mode */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-black/40 border border-white/20 backdrop-blur-sm">
                    <Camera className="w-5 h-5 text-red-500" />
                    <span className="text-white text-sm font-bold tracking-[0.3em]">ICE•7D</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-gradient-to-r from-orange-500/90 to-red-500/90 shadow-lg">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-white text-xs font-bold tracking-widest">CREATIVE MODE</span>
                  </div>
                </div>
                
                {/* Right: Status Icons */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-sm bg-black/30 border border-emerald-500/30">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] animate-pulse" />
                    <span className="text-emerald-400 text-[10px] font-mono tracking-wider">RDY</span>
                  </div>
                  <div className="px-2 py-1 rounded-sm bg-black/30 border border-white/10">
                    <span className="text-cyan-400 text-[10px] font-mono">ISO {iso}</span>
                  </div>
                  <div className="px-2 py-1 rounded-sm bg-black/30 border border-white/10">
                    <span className="text-amber-400 text-[10px] font-mono">{aperture}</span>
                  </div>
                  <div className="px-2 py-1 rounded-sm bg-black/30 border border-white/10">
                    <span className="text-orange-400 text-[10px] font-mono">{shutterSpeed}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Camera Body Container */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* Left Grip Area with Rubber Texture */}
              <div className="w-16 relative border-r border-white/10" 
                   style={{ 
                     background: 'url(#rubberGrip)',
                     boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.5)'
                   }}>
                {/* Strap Lug */}
                <div className="absolute top-8 left-1/2 -translate-x-1/2 w-8 h-3 rounded-sm bg-gradient-to-b from-[#333] to-[#1a1a1a] border border-white/10" 
                     style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.8), inset 0 1px rgba(255,255,255,0.1)' }} />
              </div>

              {/* Center: LCD Screen Area */}
              <div className="flex-1 flex flex-col">
                
                {/* LCD Bezel Top */}
                <div className="h-3 bg-gradient-to-b from-black/60 to-transparent" />
                
                {/* Main LCD Display */}
                <div className="flex-1 mx-4 mb-4 rounded-lg overflow-hidden relative"
                     style={{ 
                       background: 'linear-gradient(145deg, #1e3a3a 0%, #0f2020 100%)',
                       boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8), inset 0 2px 4px rgba(0,0,0,0.9), 0 1px 2px rgba(255,255,255,0.05)',
                       filter: 'url(#lcdGrain)'
                     }}>
                  
                  {/* LCD Corner Screws */}
                  <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-black/80 border border-white/10" />
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-black/80 border border-white/10" />
                  <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-black/80 border border-white/10" />
                  <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-black/80 border border-white/10" />
                  
                  <ScrollArea className="h-full">
                    <div className="p-8 space-y-6">
                      
                      {/* Base Creative Brief */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 px-3 py-2 rounded border border-cyan-500/30 bg-black/30">
                          <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                          <span className="text-cyan-300 text-xs font-mono tracking-[0.15em] uppercase">Creative Brief</span>
                        </div>
                        <Textarea
                          value={basePrompt}
                          onChange={(e) => {
                            setBasePrompt(e.target.value);
                            updateComplexity(layers.length);
                          }}
                          placeholder="Describe your creative vision: mood, style, lighting, composition..."
                          className="min-h-[100px] bg-black/40 border-2 border-cyan-500/20 text-cyan-100 placeholder:text-cyan-900/50 font-mono text-sm rounded-lg focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 resize-none"
                          style={{ 
                            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.6)',
                          }}
                        />
                      </div>

                      <Separator className="bg-white/10" />

                      {/* Layer Control Buttons */}
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          onClick={addReferenceLayer}
                          className="group relative overflow-hidden rounded-lg border-2 border-orange-500/30 bg-gradient-to-br from-orange-950/40 to-black/40 p-4 hover:border-orange-400/60 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-all duration-200 active:scale-95"
                          style={{ filter: 'url(#buttonEmboss)' }}
                        >
                          <div className="flex items-center justify-center gap-3">
                            <ImageIcon className="w-5 h-5 text-orange-400" />
                            <span className="text-orange-200 text-sm font-bold tracking-wide uppercase">Add Reference</span>
                          </div>
                        </button>
                        
                        <button
                          onClick={addSketchLayer}
                          className="group relative overflow-hidden rounded-lg border-2 border-purple-500/30 bg-gradient-to-br from-purple-950/40 to-black/40 p-4 hover:border-purple-400/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-200 active:scale-95"
                          style={{ filter: 'url(#buttonEmboss)' }}
                        >
                          <div className="flex items-center justify-center gap-3">
                            <Paintbrush className="w-5 h-5 text-purple-400" />
                            <span className="text-purple-200 text-sm font-bold tracking-wide uppercase">Add Sketch</span>
                          </div>
                        </button>
                      </div>

                      {/* Composition Layers Stack */}
                      {layers.length > 0 && (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between px-3 py-2 rounded border border-emerald-500/30 bg-black/30">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-emerald-400" />
                              <span className="text-emerald-300 text-xs font-mono tracking-[0.15em] uppercase">Layer Stack</span>
                            </div>
                            <span className="text-emerald-400 text-[10px] font-mono font-bold">{layers.length} ACTIVE</span>
                          </div>
                          
                          {layers.map((layer, index) => (
                            <div key={layer.id} className="relative p-4 rounded-lg border-2 border-white/10 bg-gradient-to-br from-black/60 to-black/40"
                                 style={{ boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.4)' }}>
                              {/* Layer Number Badge */}
                              <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 border-2 border-black flex items-center justify-center shadow-lg">
                                <span className="text-white text-xs font-bold">{index + 1}</span>
                              </div>
                              
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    {layer.type === 'reference' ? (
                                      <>
                                        <div className="p-2 rounded bg-orange-500/20 border border-orange-500/40">
                                          <ImageIcon className="w-4 h-4 text-orange-400" />
                                        </div>
                                        <span className="text-orange-200 font-mono text-sm font-bold">{layer.name}</span>
                                      </>
                                    ) : (
                                      <>
                                        <div className="p-2 rounded bg-purple-500/20 border border-purple-500/40">
                                          <Paintbrush className="w-4 h-4 text-purple-400" />
                                        </div>
                                        <span className="text-purple-200 font-mono text-sm font-bold">Sketch</span>
                                        <div className="w-5 h-5 rounded-full border-2 border-white/30 shadow-inner" 
                                             style={{ 
                                               backgroundColor: layer.color.toLowerCase() === 'red' ? '#ef4444' :
                                                 layer.color.toLowerCase() === 'blue' ? '#3b82f6' :
                                                 layer.color.toLowerCase() === 'green' ? '#22c55e' :
                                                 layer.color.toLowerCase() === 'yellow' ? '#eab308' :
                                                 layer.color.toLowerCase() === 'purple' ? '#a855f7' : '#f97316'
                                             }} />
                                      </>
                                    )}
                                  </div>
                                  <button 
                                    onClick={() => removeLayer(layer.id)}
                                    className="p-2 rounded bg-red-500/20 border border-red-500/40 hover:bg-red-500/30 transition-colors"
                                  >
                                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                                  </button>
                                </div>
                                
                                <Input
                                  placeholder="Layer instruction..."
                                  value={layer.prompt}
                                  onChange={(e) => {
                                    setLayers(layers.map(l => 
                                      l.id === layer.id ? { ...l, prompt: e.target.value } : l
                                    ));
                                  }}
                                  className="bg-black/40 border border-white/10 text-cyan-100 placeholder:text-cyan-900/40 font-mono text-xs"
                                />
                                
                                {layer.type === 'reference' && (
                                  <Input
                                    placeholder="Negative prompt (things to avoid)..."
                                    value={layer.negativePrompt}
                                    onChange={(e) => {
                                      setLayers(layers.map(l => 
                                        l.id === layer.id ? { ...l, negativePrompt: e.target.value } : l
                                      ));
                                    }}
                                    className="bg-black/40 border border-amber-500/20 text-amber-200 placeholder:text-amber-900/40 font-mono text-xs"
                                  />
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <Separator className="bg-white/10" />

                      {/* Camera Settings Panel */}
                      <div className="space-y-3">
                        <button
                          onClick={() => setAdvancedOpen(!advancedOpen)}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 border-blue-500/30 bg-gradient-to-r from-blue-950/40 to-black/40 hover:border-blue-400/50 transition-all"
                        >
                          <div className="flex items-center gap-3">
                            <Camera className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-200 text-sm font-mono font-bold tracking-wide uppercase">Camera Settings</span>
                          </div>
                          {advancedOpen ? <ChevronUp className="w-4 h-4 text-blue-400" /> : <ChevronDown className="w-4 h-4 text-blue-400" />}
                        </button>

                        {advancedOpen && (
                          <div className="p-5 rounded-lg border border-white/10 bg-black/30 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              {/* Lens */}
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 px-2 py-1 bg-black/40 rounded border border-white/10">
                                  <Eye className="w-3 h-3 text-cyan-400" />
                                  <span className="text-cyan-300 text-[10px] font-mono tracking-widest uppercase">Lens</span>
                                </div>
                                <Select value={lens} onValueChange={setLens}>
                                  <SelectTrigger className="bg-black/60 border border-cyan-500/30 text-cyan-100 font-mono text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-black/95 border border-cyan-500/30 backdrop-blur-xl">
                                    <SelectItem value="24mm" className="text-cyan-100 font-mono">24mm Wide</SelectItem>
                                    <SelectItem value="35mm" className="text-cyan-100 font-mono">35mm</SelectItem>
                                    <SelectItem value="50mm" className="text-cyan-100 font-mono">50mm Normal</SelectItem>
                                    <SelectItem value="85mm" className="text-cyan-100 font-mono">85mm Portrait</SelectItem>
                                    <SelectItem value="200mm" className="text-cyan-100 font-mono">200mm Tele</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              {/* Aperture */}
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 px-2 py-1 bg-black/40 rounded border border-white/10">
                                  <Droplet className="w-3 h-3 text-amber-400" />
                                  <span className="text-amber-300 text-[10px] font-mono tracking-widest uppercase">Aperture</span>
                                </div>
                                <Select value={aperture} onValueChange={setAperture}>
                                  <SelectTrigger className="bg-black/60 border border-amber-500/30 text-amber-100 font-mono text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-black/95 border border-amber-500/30 backdrop-blur-xl">
                                    <SelectItem value="f/1.4" className="text-amber-100 font-mono">f/1.4 Wide</SelectItem>
                                    <SelectItem value="f/1.8" className="text-amber-100 font-mono">f/1.8</SelectItem>
                                    <SelectItem value="f/2.8" className="text-amber-100 font-mono">f/2.8</SelectItem>
                                    <SelectItem value="f/5.6" className="text-amber-100 font-mono">f/5.6</SelectItem>
                                    <SelectItem value="f/11" className="text-amber-100 font-mono">f/11 Deep</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              {/* Shutter */}
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 px-2 py-1 bg-black/40 rounded border border-white/10">
                                  <Zap className="w-3 h-3 text-orange-400" />
                                  <span className="text-orange-300 text-[10px] font-mono tracking-widest uppercase">Shutter</span>
                                </div>
                                <Select value={shutterSpeed} onValueChange={setShutterSpeed}>
                                  <SelectTrigger className="bg-black/60 border border-orange-500/30 text-orange-100 font-mono text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-black/95 border border-orange-500/30 backdrop-blur-xl">
                                    <SelectItem value="1/30s" className="text-orange-100 font-mono">1/30s Slow</SelectItem>
                                    <SelectItem value="1/60s" className="text-orange-100 font-mono">1/60s</SelectItem>
                                    <SelectItem value="1/125s" className="text-orange-100 font-mono">1/125s</SelectItem>
                                    <SelectItem value="1/250s" className="text-orange-100 font-mono">1/250s</SelectItem>
                                    <SelectItem value="1/500s" className="text-orange-100 font-mono">1/500s Fast</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              {/* ISO */}
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 px-2 py-1 bg-black/40 rounded border border-white/10">
                                  <Sun className="w-3 h-3 text-emerald-400" />
                                  <span className="text-emerald-300 text-[10px] font-mono tracking-widest uppercase">ISO</span>
                                </div>
                                <Select value={iso} onValueChange={setIso}>
                                  <SelectTrigger className="bg-black/60 border border-emerald-500/30 text-emerald-100 font-mono text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-black/95 border border-emerald-500/30 backdrop-blur-xl">
                                    <SelectItem value="100" className="text-emerald-100 font-mono">ISO 100</SelectItem>
                                    <SelectItem value="200" className="text-emerald-100 font-mono">ISO 200</SelectItem>
                                    <SelectItem value="400" className="text-emerald-100 font-mono">ISO 400</SelectItem>
                                    <SelectItem value="800" className="text-emerald-100 font-mono">ISO 800</SelectItem>
                                    <SelectItem value="1600" className="text-emerald-100 font-mono">ISO 1600</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <Separator className="bg-white/10" />

                            {/* Aspect Ratio */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 px-2 py-1 bg-black/40 rounded border border-white/10">
                                <Maximize2 className="w-3 h-3 text-purple-400" />
                                <span className="text-purple-300 text-[10px] font-mono tracking-widest uppercase">Frame Ratio</span>
                              </div>
                              <Select value={aspectRatio} onValueChange={setAspectRatio}>
                                <SelectTrigger className="bg-black/60 border border-purple-500/30 text-purple-100 font-mono text-xs">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent className="bg-black/95 border border-purple-500/30 backdrop-blur-xl">
                                  <SelectItem value="1:1" className="text-purple-100 font-mono">1:1 Square</SelectItem>
                                  <SelectItem value="4:3" className="text-purple-100 font-mono">4:3 Standard</SelectItem>
                                  <SelectItem value="16:9" className="text-purple-100 font-mono">16:9 Wide</SelectItem>
                                  <SelectItem value="21:9" className="text-purple-100 font-mono">21:9 Cinema</SelectItem>
                                  <SelectItem value="9:16" className="text-purple-100 font-mono">9:16 Portrait</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              <div className="flex items-center justify-between px-3 py-2 bg-black/40 rounded border border-white/10">
                                <div className="flex items-center gap-2">
                                  {enforceAspectRatio ? <Lock className="w-3 h-3 text-purple-400" /> : <Unlock className="w-3 h-3 text-purple-400/50" />}
                                  <span className="text-purple-200 text-xs font-mono">Lock Ratio</span>
                                </div>
                                <Switch
                                  checked={enforceAspectRatio}
                                  onCheckedChange={setEnforceAspectRatio}
                                  className="data-[state=checked]:bg-purple-500"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <Separator className="bg-white/10" />

                      {/* AI Analysis Section */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 px-3 py-2 rounded border border-pink-500/30 bg-black/30">
                          <Sparkles className="w-4 h-4 text-pink-400" />
                          <span className="text-pink-300 text-xs font-mono tracking-[0.15em] uppercase">AI Co-Pilot</span>
                        </div>
                        
                        <button 
                          onClick={analyzePrompt}
                          className="w-full p-4 rounded-lg border-2 border-pink-500/40 bg-gradient-to-br from-pink-950/40 to-black/40 hover:border-pink-400/60 hover:shadow-[0_0_20px_rgba(236,72,153,0.2)] transition-all duration-200 active:scale-95"
                        >
                          <div className="flex items-center justify-center gap-3">
                            <Sparkles className="w-5 h-5 text-pink-400" />
                            <span className="text-pink-200 text-sm font-bold tracking-wide uppercase">Analyze Composition</span>
                          </div>
                        </button>
                        
                        {/* Complexity Meter */}
                        <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-cyan-300 text-[10px] font-mono tracking-widest uppercase">Complexity</span>
                            <span className="text-cyan-100 text-sm font-mono font-bold">{complexity}%</span>
                          </div>
                          <div className="h-2 bg-black/60 rounded-full overflow-hidden border border-white/10">
                            <div 
                              className="h-full transition-all duration-500 rounded-full"
                              style={{ 
                                width: `${complexity}%`,
                                background: complexity > 80 
                                  ? 'linear-gradient(90deg, #f59e0b, #ef4444)'
                                  : complexity > 50
                                  ? 'linear-gradient(90deg, #10b981, #f59e0b)'
                                  : 'linear-gradient(90deg, #06b6d4, #10b981)',
                                boxShadow: '0 0 10px currentColor'
                              }}
                            />
                          </div>
                        </div>
                        
                        {assembledPrompt && (
                          <div className="p-4 bg-black/40 rounded-lg border border-emerald-500/20">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                              <span className="text-emerald-300 text-[10px] font-mono tracking-widest uppercase">Final Prompt</span>
                            </div>
                            <ScrollArea className="h-32">
                              <pre className="text-emerald-100/90 text-[11px] leading-relaxed whitespace-pre-wrap font-mono">{assembledPrompt}</pre>
                            </ScrollArea>
                          </div>
                        )}
                      </div>
                      
                    </div>
                  </ScrollArea>
                </div>
              </div>

              {/* Right Control Panel - D-Pad & Buttons */}
              <div className="w-40 border-l border-white/10 p-4 flex flex-col items-center gap-6"
                   style={{ 
                     background: 'linear-gradient(90deg, #1a1a1a 0%, #0f0f0f 50%, #1a1a1a 100%)',
                     boxShadow: 'inset 3px 0 8px rgba(0,0,0,0.5)'
                   }}>
                
                {/* Mode Dial - Enhanced Realism */}
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-b from-[#3a3a3a] via-[#2a2a2a] to-[#1a1a1a] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),0_2px_0_rgba(255,255,255,0.1),0_4px_12px_rgba(0,0,0,0.5)] border-2 border-white/20">
                  {/* Knurled edge texture */}
                  <div className="absolute inset-0 rounded-full opacity-40" style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'ridges\' width=\'3\' height=\'100\' patternUnits=\'userSpaceOnUse\'%3E%3Crect x=\'0\' width=\'1\' height=\'100\' fill=\'rgba(255,255,255,0.15)\'/%3E%3Crect x=\'1\' width=\'1\' height=\'100\' fill=\'rgba(0,0,0,0.15)\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100\' height=\'100\' fill=\'url(%23ridges)\'/%3E%3C/svg%3E")' }} />
                  
                  <div className="absolute inset-2 rounded-full bg-gradient-to-b from-[#0a0a0a] to-[#000000] shadow-[inset_0_2px_8px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.05)]" />
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Settings2 className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
                  </div>
                  {/* Dial indicator with embossing */}
                  <div className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-gradient-to-b from-red-500 to-red-700 rounded-full shadow-[0_0_6px_rgba(239,68,68,0.9),inset_0_1px_0_rgba(255,255,255,0.3)]" />
                  {/* Mode markings */}
                  <div className="absolute inset-0">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 h-1 bg-white/30"
                        style={{
                          top: '8px',
                          left: '50%',
                          transform: `translateX(-50%) rotate(${angle}deg)`,
                          transformOrigin: '50% 40px',
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Function Buttons - Enhanced */}
                <div className="flex flex-col gap-3">
                  {[Menu, Grid3x3, Play].map((Icon, i) => (
                    <button key={i} 
                            className="relative w-12 h-12 rounded-lg bg-gradient-to-b from-[#3a3a3a] via-[#2a2a2a] to-[#1a1a1a] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_3px_6px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.08)] border-2 border-white/20 hover:shadow-[0_5px_10px_rgba(0,0,0,0.7)] active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.7)] active:translate-y-0.5 transition-all group">
                      <div className="absolute inset-0.5 rounded opacity-30" style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'50\' height=\'50\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'dots\' width=\'3\' height=\'3\' patternUnits=\'userSpaceOnUse\'%3E%3Ccircle cx=\'1.5\' cy=\'1.5\' r=\'0.4\' fill=\'rgba(255,255,255,0.15)\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'50\' height=\'50\' fill=\'url(%23dots)\'/%3E%3C/svg%3E")' }} />
                      <Icon className="relative w-5 h-5 mx-auto text-cyan-400/80 group-hover:text-cyan-300 transition-colors" />
                    </button>
                  ))}
                </div>
                
                {/* D-Pad Navigation Cluster - Enhanced */}
                <div className="relative w-28 h-28">
                  {/* Center SET button - Enhanced */}
                  <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-gradient-to-b from-[#4a4a4a] via-[#2a2a2a] to-[#1a1a1a] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_3px_6px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.1)] border-2 border-white/25 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_4px_10px_rgba(0,0,0,0.7)] active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.7)] active:translate-y-0.5 transition-all z-10">
                    <div className="absolute inset-2 rounded-full bg-[#0a0a0a] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]" />
                    <span className="relative text-[11px] text-cyan-400 font-bold tracking-widest drop-shadow-[0_0_4px_rgba(34,211,238,0.5)]">SET</span>
                  </button>

                  {/* Up button - Enhanced */}
                  <button className="absolute top-0 left-1/2 -translate-x-1/2 w-11 h-12 rounded-t-2xl bg-gradient-to-b from-[#3a3a3a] via-[#2a2a2a] to-[#1a1a1a] shadow-[0_2px_0_rgba(255,255,255,0.08),0_4px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.6)] active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.7)] active:translate-y-0.5 transition-all border-t-2 border-x-2 border-white/15">
                    <ChevronUp className="w-5 h-5 mx-auto mt-1 text-white/70 group-hover:text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white/10 rounded-full" />
                  </button>

                  {/* Right button - Enhanced */}
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-11 rounded-r-2xl bg-gradient-to-r from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] shadow-[0_2px_0_rgba(255,255,255,0.08),0_4px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.6)] active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.7)] active:translate-x-0.5 transition-all border-r-2 border-y-2 border-white/15">
                    <ChevronRight className="w-5 h-5 mx-auto text-white/70 group-hover:text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 h-4 w-0.5 bg-white/10 rounded-full" />
                  </button>

                  {/* Down button - Enhanced */}
                  <button className="absolute bottom-0 left-1/2 -translate-x-1/2 w-11 h-12 rounded-b-2xl bg-gradient-to-b from-[#1a1a1a] via-[#0a0a0a] to-[#000000] shadow-[0_2px_0_rgba(255,255,255,0.08),0_4px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.6)] active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.7)] active:translate-y-0.5 transition-all border-b-2 border-x-2 border-white/15">
                    <ChevronDown className="w-5 h-5 mx-auto mb-1 text-white/70 group-hover:text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-white/10 rounded-full" />
                  </button>

                  {/* Left button - Enhanced */}
                  <button className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-11 rounded-l-2xl bg-gradient-to-l from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] shadow-[0_2px_0_rgba(255,255,255,0.08),0_4px_8px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] hover:shadow-[0_6px_12px_rgba(0,0,0,0.6)] active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.7)] active:translate-x-0.5 transition-all border-l-2 border-y-2 border-white/15">
                    <ChevronLeft className="w-5 h-5 mx-auto text-white/70 group-hover:text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                    <div className="absolute left-1 top-1/2 -translate-y-1/2 h-4 w-0.5 bg-white/10 rounded-full" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Control Bar - Professional Camera Controls */}
            <div className="flex items-center justify-between px-8 py-6 border-t border-white/10"
                 style={{ 
                   background: 'url(#brushedMetal)',
                   boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.5), inset 0 -1px 2px rgba(255,255,255,0.05)'
                 }}>
              {/* Left Button - INFO */}
              <button
                className="group relative w-16 h-16 rounded-full bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.05)] border border-white/10 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_3px_6px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.08)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] active:translate-y-0.5 transition-all"
              >
                <div className="absolute inset-0 rounded-full" style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'knurl\' width=\'4\' height=\'4\' patternUnits=\'userSpaceOnUse\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'0.5\' fill=\'rgba(255,255,255,0.03)\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100\' height=\'100\' fill=\'url(%23knurl)\'/%3E%3C/svg%3E")' }} />
                <span className="relative z-10 text-cyan-400 text-[11px] font-bold tracking-widest group-hover:text-cyan-300 transition-colors">INFO</span>
              </button>
              
              {/* Center Button - SHUTTER/GENERATE (AF-ON Style) */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="group relative w-28 h-28 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {/* Main button body */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#8B0000] via-[#660000] to-[#4a0000] shadow-[0_6px_0_#2a0000,0_8px_16px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.2)] group-hover:shadow-[0_6px_0_#2a0000,0_10px_20px_rgba(139,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] group-active:shadow-[0_2px_0_#2a0000,0_4px_8px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(0,0,0,0.4)] group-active:translate-y-1 transition-all border-2 border-[#a00000]" />
                
                {/* Metallic ring */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-b from-[#3a3a3a] to-[#1a1a1a] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)]" />
                
                {/* Inner red glow */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-b from-red-500/20 to-red-700/40 shadow-[inset_0_2px_8px_rgba(220,38,38,0.6)]" />
                
                {/* Knurled texture */}
                <div className="absolute inset-0 rounded-full opacity-30" style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'diamond\' width=\'6\' height=\'6\' patternUnits=\'userSpaceOnUse\' patternTransform=\'rotate(45)\'%3E%3Crect width=\'1\' height=\'6\' fill=\'rgba(255,255,255,0.1)\'/%3E%3Crect width=\'6\' height=\'1\' fill=\'rgba(255,255,255,0.1)\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100\' height=\'100\' fill=\'url(%23diamond)\'/%3E%3C/svg%3E")' }} />
                
                {/* Center icon/text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  {isGenerating ? (
                    <>
                      <Camera className="w-8 h-8 text-white animate-pulse mb-1" />
                      <span className="text-[10px] text-white font-bold tracking-widest">CAPTURE</span>
                    </>
                  ) : (
                    <>
                      <div className="w-7 h-7 rounded-full border-3 border-white mb-1 shadow-[0_0_10px_rgba(255,255,255,0.6)]" />
                      <span className="text-[10px] text-white font-bold tracking-widest drop-shadow-lg">SHOOT</span>
                    </>
                  )}
                </div>
                
                {/* Highlight gleam */}
                <div className="absolute top-3 left-5 w-6 h-6 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
              </button>

              {/* Right Button - MENU/CLOSE */}
              <DrawerClose asChild>
                <button
                  className="group relative w-16 h-16 rounded-full bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.5),0_1px_0_rgba(255,255,255,0.05)] border border-white/10 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_3px_6px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.08)] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] active:translate-y-0.5 transition-all"
                >
                  <div className="absolute inset-0 rounded-full" style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'knurl2\' width=\'4\' height=\'4\' patternUnits=\'userSpaceOnUse\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'0.5\' fill=\'rgba(255,255,255,0.03)\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100\' height=\'100\' fill=\'url(%23knurl2)\'/%3E%3C/svg%3E")' }} />
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <Menu className="w-5 h-5 text-white/70 group-hover:text-white/90 transition-colors" />
                  </div>
                </button>
              </DrawerClose>
            </div>
            
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};