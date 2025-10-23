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
    assemblePrompt();
    toast.success("Generating image...");
    if (onGenerate) onGenerate();
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
              <div className="w-32 border-l border-white/10 p-4 flex flex-col items-center gap-8"
                   style={{ 
                     background: 'linear-gradient(90deg, #1a1a1a 0%, #0f0f0f 50%, #1a1a1a 100%)',
                     boxShadow: 'inset 3px 0 8px rgba(0,0,0,0.5)'
                   }}>
                
                {/* Mode Dial */}
                <div className="relative w-20 h-20">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#3a3a3a] via-[#2a2a2a] to-[#1a1a1a] border-2 border-white/10"
                       style={{ 
                         background: 'url(#knurledDial)',
                         boxShadow: '0 4px 12px rgba(0,0,0,0.6), inset 0 -2px 6px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.1)'
                       }} />
                  <div className="absolute inset-3 rounded-full bg-gradient-to-br from-black to-[#1a1a1a] border border-white/20 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                  {/* Dial Indicator */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-red-500 rounded-b" />
                </div>
                
                {/* Function Buttons */}
                <div className="flex flex-col gap-3">
                  {[Menu, Grid3x3, Play].map((Icon, i) => (
                    <button key={i} 
                            className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-white/10 flex items-center justify-center hover:border-cyan-500/50 transition-colors active:scale-95"
                            style={{ boxShadow: '0 2px 6px rgba(0,0,0,0.6), inset 0 1px rgba(255,255,255,0.08)' }}>
                      <Icon className="w-4 h-4 text-cyan-400/80" />
                    </button>
                  ))}
                </div>
                
                {/* D-Pad Navigation Cluster */}
                <div className="relative w-24 h-24">
                  {/* Up */}
                  <button className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-t-lg bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] border border-white/10 flex items-center justify-center hover:bg-[#3a3a3a] active:scale-95"
                          style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.6), inset 0 1px rgba(255,255,255,0.05)' }}>
                    <ChevronUp className="w-4 h-4 text-white/60" />
                  </button>
                  {/* Down */}
                  <button className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-b-lg bg-gradient-to-t from-[#2a2a2a] to-[#1a1a1a] border border-white/10 flex items-center justify-center hover:bg-[#3a3a3a] active:scale-95"
                          style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.6), inset 0 1px rgba(255,255,255,0.05)' }}>
                    <ChevronDown className="w-4 h-4 text-white/60" />
                  </button>
                  {/* Left */}
                  <button className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-l-lg bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] border border-white/10 flex items-center justify-center hover:bg-[#3a3a3a] active:scale-95"
                          style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.6), inset 0 1px rgba(255,255,255,0.05)' }}>
                    <ChevronLeft className="w-4 h-4 text-white/60" />
                  </button>
                  {/* Right */}
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-r-lg bg-gradient-to-l from-[#2a2a2a] to-[#1a1a1a] border border-white/10 flex items-center justify-center hover:bg-[#3a3a3a] active:scale-95"
                          style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.6), inset 0 1px rgba(255,255,255,0.05)' }}>
                    <ChevronRight className="w-4 h-4 text-white/60" />
                  </button>
                  {/* Center OK Button */}
                  <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#3a3a3a] via-[#2a2a2a] to-[#1a1a1a] border-2 border-white/20 flex items-center justify-center hover:border-cyan-400/50 active:scale-95"
                          style={{ boxShadow: '0 3px 8px rgba(0,0,0,0.7), inset 0 1px 2px rgba(255,255,255,0.1)' }}>
                    <span className="text-white text-xs font-bold">OK</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Control Bar - Physical Buttons */}
            <div className="px-8 py-6 border-t border-white/10"
                 style={{ 
                   background: 'url(#brushedMetal)',
                   boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.5), inset 0 -1px 2px rgba(255,255,255,0.05)'
                 }}>
              <div className="flex items-center gap-6">
                {/* Info Button */}
                <button className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-white/10 flex items-center justify-center hover:border-cyan-500/50 transition-colors active:scale-95"
                        style={{ boxShadow: '0 3px 8px rgba(0,0,0,0.6), inset 0 1px rgba(255,255,255,0.08)' }}>
                  <span className="text-cyan-400 text-xs font-bold">INFO</span>
                </button>
                
                {/* Main Generate/Shutter Button */}
                <button 
                  onClick={handleGenerate}
                  className="flex-1 group relative overflow-hidden rounded-xl"
                >
                  <div className="relative px-12 py-5 bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-xl border-2 border-red-400/30 hover:from-red-500 hover:via-red-600 hover:to-red-700 active:scale-98 transition-all duration-200"
                       style={{ 
                         boxShadow: '0 6px 20px rgba(220,38,38,0.5), inset 0 1px 2px rgba(255,100,100,0.3), inset 0 -3px 8px rgba(100,0,0,0.4)'
                       }}>
                    <div className="flex items-center justify-center gap-4">
                      <Camera className="w-7 h-7 text-white drop-shadow-lg" strokeWidth={2.5} />
                      <span className="text-white text-2xl font-bold tracking-[0.3em] uppercase drop-shadow-lg">GENERATE</span>
                    </div>
                  </div>
                </button>
                
                {/* Close Button */}
                <DrawerClose asChild>
                  <button className="px-6 py-3 rounded-lg bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] border border-white/10 hover:border-white/30 transition-colors active:scale-95"
                          style={{ boxShadow: '0 3px 8px rgba(0,0,0,0.6), inset 0 1px rgba(255,255,255,0.08)' }}>
                    <span className="text-white text-sm font-bold tracking-wide uppercase">CLOSE</span>
                  </button>
                </DrawerClose>
              </div>
            </div>
            
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};