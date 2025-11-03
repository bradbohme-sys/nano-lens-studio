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
  Layers,
  Focus,
  Circle,
  Grid,
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

// SVG Texture Patterns for Ultra-Realistic Camera Body
const CameraTextures = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
    <defs>
      {/* Dark Rubber Grip Texture - 3D Raised Dots */}
      <pattern id="rubberGrip" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="#080808"/>
        <circle cx="2.5" cy="2.5" r="1.8" fill="#0d0d0d" opacity="0.8"/>
        <circle cx="7.5" cy="2.5" r="1.8" fill="#0d0d0d" opacity="0.8"/>
        <circle cx="2.5" cy="7.5" r="1.8" fill="#0d0d0d" opacity="0.8"/>
        <circle cx="7.5" cy="7.5" r="1.8" fill="#0d0d0d" opacity="0.8"/>
        <circle cx="5" cy="5" r="1.6" fill="#050505" opacity="0.95"/>
        {/* Highlight dots for 3D effect */}
        <circle cx="2" cy="2" r="0.4" fill="#1a1a1a" opacity="0.6"/>
        <circle cx="7" cy="2" r="0.4" fill="#1a1a1a" opacity="0.6"/>
        <circle cx="2" cy="7" r="0.4" fill="#1a1a1a" opacity="0.6"/>
        <circle cx="7" cy="7" r="0.4" fill="#1a1a1a" opacity="0.6"/>
      </pattern>
      
      {/* Carbon Fiber Texture */}
      <pattern id="carbonFiber" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
        <rect width="6" height="6" fill="#0a0a0a"/>
        <rect x="0" y="0" width="3" height="3" fill="#111" opacity="0.4"/>
        <rect x="3" y="3" width="3" height="3" fill="#111" opacity="0.4"/>
        <rect x="0" y="0" width="3" height="3" stroke="#1a1a1a" strokeWidth="0.5" fill="none" opacity="0.3"/>
        <rect x="3" y="3" width="3" height="3" stroke="#1a1a1a" strokeWidth="0.5" fill="none" opacity="0.3"/>
      </pattern>
      
      {/* Dark Brushed Metal - Horizontal Lines */}
      <pattern id="brushedMetal" x="0" y="0" width="100" height="2" patternUnits="userSpaceOnUse">
        <rect width="100" height="2" fill="#1a1a1a"/>
        <line x1="0" y1="0" x2="100" y2="0" stroke="#2a2a2a" strokeWidth="0.5" opacity="0.5"/>
        <line x1="0" y1="1" x2="100" y2="1" stroke="#0f0f0f" strokeWidth="0.5" opacity="0.7"/>
        <line x1="0" y1="2" x2="100" y2="2" stroke="#2a2a2a" strokeWidth="0.5" opacity="0.4"/>
      </pattern>
      
      {/* Fine Knurled Pattern - Diamond Grid */}
      <pattern id="knurledFine" x="0" y="0" width="3" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
        <rect width="3" height="6" fill="#1a1a1a"/>
        <line x1="1.5" y1="0" x2="1.5" y2="6" stroke="#2a2a2a" strokeWidth="0.6"/>
        <line x1="0" y1="3" x2="3" y2="3" stroke="#0f0f0f" strokeWidth="0.4" opacity="0.7"/>
      </pattern>
      
      {/* Matte Black Metal Grain */}
      <pattern id="matteBlack" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
        <rect width="50" height="50" fill="#0d0d0d"/>
        <circle cx="10" cy="10" r="0.3" fill="#1a1a1a" opacity="0.3"/>
        <circle cx="25" cy="15" r="0.2" fill="#0a0a0a" opacity="0.4"/>
        <circle cx="40" cy="20" r="0.3" fill="#1a1a1a" opacity="0.2"/>
        <circle cx="15" cy="35" r="0.2" fill="#0a0a0a" opacity="0.3"/>
        <circle cx="30" cy="40" r="0.3" fill="#1a1a1a" opacity="0.3"/>
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
      
      {/* Deep Button Emboss - Enhanced 3D */}
      <filter id="buttonEmboss">
        <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
        <feOffset dx="0" dy="2" result="offsetBlur"/>
        <feComponentTransfer>
          <feFuncA type="linear" slope="0.5"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      {/* Strong Inner Shadow */}
      <filter id="insetShadow">
        <feComponentTransfer in="SourceAlpha">
          <feFuncA type="table" tableValues="1 0"/>
        </feComponentTransfer>
        <feGaussianBlur stdDeviation="3"/>
        <feOffset dx="0" dy="3" result="offsetblur"/>
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
            style={{ filter: 'drop-shadow(0 12px 35px rgba(0,0,0,0.8))' }}
          >
            {/* Ultra-Realistic DSLR Shutter Button */}
            <div className="relative w-28 h-28">
              {/* Base Mounting Plate - Dark Metal */}
              <div className="absolute inset-0 rounded-full bg-[#0a0a0a] shadow-[0_0_0_4px_#1a1a1a,0_0_0_5px_#0d0d0d,0_12px_30px_rgba(0,0,0,0.9)]" />
              
              {/* Outer Chrome Ring - Beveled Edge */}
              <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-[#5a5a5a] via-[#2a2a2a] to-[#0d0d0d] shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),inset_0_-3px_8px_rgba(0,0,0,0.7),0_2px_0_rgba(255,255,255,0.1)]" 
                   style={{ filter: 'url(#buttonEmboss)' }} />
              
              {/* Middle Ring - Brushed Metal */}
              <div className="absolute inset-[12px] rounded-full" 
                   style={{ 
                     background: 'url(#brushedMetal)',
                     boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.8), inset 0 -1px 2px rgba(255,255,255,0.08)'
                   }} />
              
              {/* Red Shutter Button - Deep 3D */}
              <div className="absolute inset-[18px] rounded-full bg-gradient-to-b from-[#cc0000] via-[#990000] to-[#660000] shadow-[0_4px_0_#440000,0_6px_20px_rgba(220,0,0,0.8),inset_0_2px_6px_rgba(255,80,80,0.5),inset_0_-2px_8px_rgba(60,0,0,0.9)] flex items-center justify-center group-hover:from-[#dd1111] group-hover:via-[#aa0000] group-hover:shadow-[0_4px_0_#440000,0_8px_25px_rgba(255,0,0,0.9),inset_0_2px_6px_rgba(255,100,100,0.6)] group-active:shadow-[0_1px_0_#440000,inset_0_6px_16px_rgba(0,0,0,0.95)] group-active:translate-y-[3px] transition-all duration-100">
                {/* Knurled Texture Overlay */}
                <div className="absolute inset-0 rounded-full opacity-20" style={{ background: 'url(#knurledFine)' }} />
                <Camera className="relative w-9 h-9 text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)]" strokeWidth={2.8} />
              </div>
              
              {/* Top-Left Highlight Gleam */}
              <div className="absolute top-[16px] left-[18px] w-[22px] h-[22px] rounded-full bg-gradient-to-br from-white/35 to-transparent pointer-events-none blur-[1px]" />
              
              {/* Ready Indicator Ring */}
              <div className="absolute inset-0 rounded-full border-[3px] border-red-500/20 group-hover:border-red-400/40 transition-all" />
              
              {/* Subtle Pulse Animation */}
              <div className="absolute inset-0 rounded-full border-2 border-red-500/20 animate-ping" style={{ animationDuration: '3s' }} />
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
              
              {/* Left Control Panel - Physical Camera Buttons */}
              <div className="w-20 relative border-r border-white/10 flex flex-col items-center justify-center gap-6 py-8" 
                   style={{ 
                     background: 'url(#carbonFiber)',
                     boxShadow: 'inset -4px 0 12px rgba(0,0,0,0.7)'
                   }}>
                {/* Strap Lug Top */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-9 h-3.5 rounded-sm bg-gradient-to-b from-[#2a2a2a] to-[#0a0a0a] border border-white/15" 
                     style={{ boxShadow: '0 3px 6px rgba(0,0,0,0.9), inset 0 1px rgba(255,255,255,0.12)' }} />
                
                {/* Fn (Function) Button */}
                <button 
                  className="relative w-14 h-14 rounded-lg group"
                  title="Function Mode"
                >
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] shadow-[0_3px_0_#000000,0_5px_8px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_4px_0_#000000,0_6px_12px_rgba(0,0,0,0.9)] group-active:shadow-[0_1px_0_#000000,inset_0_3px_6px_rgba(0,0,0,0.8)] group-active:translate-y-[2px] transition-all border border-white/10" 
                       style={{ filter: 'url(#buttonEmboss)' }}>
                    {/* Matte texture overlay */}
                    <div className="absolute inset-0.5 rounded opacity-40" style={{ background: 'url(#matteBlack)' }} />
                  </div>
                  <span className="relative z-10 text-orange-400 text-xs font-bold tracking-widest group-hover:text-orange-300 drop-shadow-[0_0_4px_rgba(251,146,60,0.5)]">Fn</span>
                </button>
                
                {/* Layers/Reference Button */}
                <button 
                  className="relative w-14 h-14 rounded-lg group"
                  title="Layers Panel"
                >
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] shadow-[0_3px_0_#000000,0_5px_8px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_4px_0_#000000,0_6px_12px_rgba(0,0,0,0.9)] group-active:shadow-[0_1px_0_#000000,inset_0_3px_6px_rgba(0,0,0,0.8)] group-active:translate-y-[2px] transition-all border border-white/10" 
                       style={{ filter: 'url(#buttonEmboss)' }}>
                    <div className="absolute inset-0.5 rounded opacity-40" style={{ background: 'url(#matteBlack)' }} />
                  </div>
                  <Layers className="relative z-10 w-6 h-6 mx-auto text-purple-400 group-hover:text-purple-300 drop-shadow-[0_0_4px_rgba(168,85,247,0.5)]" />
                </button>
                
                {/* Focus/AF-ON Button */}
                <button 
                  className="relative w-14 h-14 rounded-full group"
                  title="Auto Focus"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] shadow-[0_3px_0_#000000,0_5px_8px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_4px_0_#000000,0_6px_12px_rgba(0,0,0,0.9)] group-active:shadow-[0_1px_0_#000000,inset_0_3px_6px_rgba(0,0,0,0.8)] group-active:translate-y-[2px] transition-all border border-white/10">
                    {/* Knurled ring texture */}
                    <div className="absolute inset-0 rounded-full opacity-30" style={{ background: 'url(#knurledFine)' }} />
                  </div>
                  <Focus className="relative z-10 w-6 h-6 mx-auto text-cyan-400 group-hover:text-cyan-300 drop-shadow-[0_0_4px_rgba(34,211,238,0.5)]" />
                </button>
                
                {/* DOF Preview Button (Small) */}
                <button 
                  className="relative w-12 h-8 rounded-md group"
                  title="Depth Preview"
                >
                  <div className="absolute inset-0 rounded-md bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] shadow-[0_2px_0_#000000,0_3px_6px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_3px_0_#000000,0_4px_8px_rgba(0,0,0,0.9)] group-active:shadow-[0_1px_0_#000000,inset_0_2px_4px_rgba(0,0,0,0.8)] group-active:translate-y-[1px] transition-all border border-white/10">
                    <div className="absolute inset-0.5 rounded opacity-40" style={{ background: 'url(#matteBlack)' }} />
                  </div>
                  <Circle className="relative z-10 w-4 h-4 mx-auto text-emerald-400 group-hover:text-emerald-300 drop-shadow-[0_0_3px_rgba(52,211,153,0.5)]" />
                </button>
                
                {/* Grid Overlay Toggle */}
                <button 
                  className="relative w-12 h-8 rounded-md group"
                  title="Grid Overlay"
                >
                  <div className="absolute inset-0 rounded-md bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] shadow-[0_2px_0_#000000,0_3px_6px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_3px_0_#000000,0_4px_8px_rgba(0,0,0,0.9)] group-active:shadow-[0_1px_0_#000000,inset_0_2px_4px_rgba(0,0,0,0.8)] group-active:translate-y-[1px] transition-all border border-white/10">
                    <div className="absolute inset-0.5 rounded opacity-40" style={{ background: 'url(#matteBlack)' }} />
                  </div>
                  <Grid className="relative z-10 w-4 h-4 mx-auto text-amber-400 group-hover:text-amber-300 drop-shadow-[0_0_3px_rgba(251,191,36,0.5)]" />
                </button>
                
                {/* Strap Lug Bottom */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-9 h-3.5 rounded-sm bg-gradient-to-b from-[#2a2a2a] to-[#0a0a0a] border border-white/15" 
                     style={{ boxShadow: '0 3px 6px rgba(0,0,0,0.9), inset 0 1px rgba(255,255,255,0.12)' }} />
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
                     background: 'url(#carbonFiber)',
                     boxShadow: 'inset 4px 0 12px rgba(0,0,0,0.7)'
                   }}>
                
                {/* Mode Dial - Ultra Realistic */}
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-b from-[#4a4a4a] via-[#2a2a2a] to-[#0d0d0d] shadow-[0_4px_0_#000000,0_6px_15px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.15),inset_0_-3px_8px_rgba(0,0,0,0.7)] border-2 border-white/25"
                     style={{ filter: 'url(#buttonEmboss)' }}>
                  {/* Knurled edge texture - deep grooves */}
                  <div className="absolute inset-0 rounded-full opacity-35" style={{ background: 'url(#knurledFine)' }} />
                  
                  {/* Inner recessed center */}
                  <div className="absolute inset-[10px] rounded-full bg-gradient-to-b from-[#0a0a0a] to-[#000000] shadow-[inset_0_3px_10px_rgba(0,0,0,0.95),0_1px_0_rgba(255,255,255,0.06)]" />
                  
                  {/* Brushed metal finish */}
                  <div className="absolute inset-[10px] rounded-full opacity-20" style={{ background: 'url(#brushedMetal)' }} />
                  
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Settings2 className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
                  </div>
                  
                  {/* Red indicator pointer - beveled */}
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-5 bg-gradient-to-b from-red-500 to-red-800 rounded-full shadow-[0_0_8px_rgba(239,68,68,1),inset_0_1px_0_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.8)] border border-red-600" />
                  
                  {/* Mode markings - engraved style */}
                  <div className="absolute inset-0">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 h-2 bg-white/40 shadow-[inset_0_1px_1px_rgba(0,0,0,0.6)]"
                        style={{
                          top: '6px',
                          left: '50%',
                          transform: `translateX(-50%) rotate(${angle}deg)`,
                          transformOrigin: '50% 42px',
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Function Buttons - Deep 3D Press */}
                <div className="flex flex-col gap-3">
                  {[Menu, Grid3x3, Play].map((Icon, i) => (
                    <button key={i} 
                            className="relative w-14 h-14 rounded-lg group">
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] shadow-[0_3px_0_#000000,0_5px_10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] group-hover:shadow-[0_4px_0_#000000,0_6px_12px_rgba(0,0,0,0.9)] group-active:shadow-[0_1px_0_#000000,inset_0_3px_8px_rgba(0,0,0,0.85)] group-active:translate-y-[2px] transition-all border border-white/10"
                           style={{ filter: 'url(#buttonEmboss)' }}>
                        {/* Matte texture */}
                        <div className="absolute inset-0.5 rounded opacity-45" style={{ background: 'url(#matteBlack)' }} />
                        
                        {/* Grip texture */}
                        <div className="absolute inset-0.5 rounded opacity-20" style={{ background: 'url(#knurledFine)' }} />
                      </div>
                      <Icon className="relative w-5 h-5 mx-auto text-cyan-400/80 group-hover:text-cyan-300 drop-shadow-[0_0_4px_rgba(34,211,238,0.4)] transition-colors" />
                    </button>
                  ))}
                </div>
                
                {/* D-Pad Navigation Cluster - Ultra Realistic 3D */}
                <div className="relative w-28 h-28">
                  {/* Center SET button - Deep press mechanism */}
                  <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full group z-10">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#4a4a4a] via-[#2a2a2a] to-[#0d0d0d] shadow-[0_3px_0_#000000,0_5px_10px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.15)] group-hover:shadow-[0_4px_0_#000000,0_6px_12px_rgba(0,0,0,0.9)] group-active:shadow-[0_1px_0_#000000,inset_0_3px_8px_rgba(0,0,0,0.85)] group-active:translate-y-[2px] transition-all border-2 border-white/20"
                         style={{ filter: 'url(#buttonEmboss)' }}>
                      {/* Knurled texture */}
                      <div className="absolute inset-0 rounded-full opacity-25" style={{ background: 'url(#knurledFine)' }} />
                    </div>
                    <div className="absolute inset-3 rounded-full bg-[#050505] shadow-[inset_0_3px_6px_rgba(0,0,0,0.95)]" />
                    <span className="relative text-xs text-cyan-400 font-bold tracking-[0.15em] drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]">SET</span>
                  </button>

                  {/* Up button - 3D tactile */}
                  <button className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-14 rounded-t-2xl group">
                    <div className="absolute inset-0 rounded-t-2xl bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] shadow-[0_3px_0_#000000,0_4px_8px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_4px_0_#000000,0_5px_10px_rgba(0,0,0,0.8)] group-active:shadow-[0_1px_0_#000000,inset_0_2px_6px_rgba(0,0,0,0.8)] group-active:translate-y-[2px] transition-all border-t-2 border-x-2 border-white/10"
                         style={{ filter: 'url(#buttonEmboss)' }}>
                      <div className="absolute inset-0.5 rounded-t-2xl opacity-40" style={{ background: 'url(#matteBlack)' }} />
                    </div>
                    <ChevronUp className="relative w-5 h-5 mx-auto mt-2 text-white/80 group-hover:text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]" />
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-white/15 rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.6)]" />
                  </button>

                  {/* Right button - 3D tactile */}
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-12 rounded-r-2xl group">
                    <div className="absolute inset-0 rounded-r-2xl bg-gradient-to-r from-[#1a1a1a] via-[#0d0d0d] to-[#050505] shadow-[0_3px_0_#000000,0_4px_8px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_4px_0_#000000,0_5px_10px_rgba(0,0,0,0.8)] group-active:shadow-[0_1px_0_#000000,inset_0_2px_6px_rgba(0,0,0,0.8)] group-active:translate-x-[2px] transition-all border-r-2 border-y-2 border-white/10"
                         style={{ filter: 'url(#buttonEmboss)' }}>
                      <div className="absolute inset-0.5 rounded-r-2xl opacity-40" style={{ background: 'url(#matteBlack)' }} />
                    </div>
                    <ChevronRight className="relative w-5 h-5 mx-auto text-white/80 group-hover:text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]" />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-0.5 bg-white/15 rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.6)]" />
                  </button>

                  {/* Down button - 3D tactile */}
                  <button className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-14 rounded-b-2xl group">
                    <div className="absolute inset-0 rounded-b-2xl bg-gradient-to-b from-[#0d0d0d] via-[#050505] to-[#000000] shadow-[0_3px_0_#000000,0_4px_8px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_4px_0_#000000,0_5px_10px_rgba(0,0,0,0.8)] group-active:shadow-[0_1px_0_#000000,inset_0_2px_6px_rgba(0,0,0,0.8)] group-active:translate-y-[2px] transition-all border-b-2 border-x-2 border-white/10"
                         style={{ filter: 'url(#buttonEmboss)' }}>
                      <div className="absolute inset-0.5 rounded-b-2xl opacity-40" style={{ background: 'url(#matteBlack)' }} />
                    </div>
                    <ChevronDown className="relative w-5 h-5 mx-auto mb-2 text-white/80 group-hover:text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]" />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-white/15 rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.6)]" />
                  </button>

                  {/* Left button - 3D tactile */}
                  <button className="absolute left-0 top-1/2 -translate-y-1/2 w-14 h-12 rounded-l-2xl group">
                    <div className="absolute inset-0 rounded-l-2xl bg-gradient-to-l from-[#1a1a1a] via-[#0d0d0d] to-[#050505] shadow-[0_3px_0_#000000,0_4px_8px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.1)] group-hover:shadow-[0_4px_0_#000000,0_5px_10px_rgba(0,0,0,0.8)] group-active:shadow-[0_1px_0_#000000,inset_0_2px_6px_rgba(0,0,0,0.8)] group-active:translate-x-[-2px] transition-all border-l-2 border-y-2 border-white/10"
                         style={{ filter: 'url(#buttonEmboss)' }}>
                      <div className="absolute inset-0.5 rounded-l-2xl opacity-40" style={{ background: 'url(#matteBlack)' }} />
                    </div>
                    <ChevronLeft className="relative w-5 h-5 mx-auto text-white/80 group-hover:text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.9)]" />
                    <div className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-0.5 bg-white/15 rounded-full shadow-[inset_0_1px_1px_rgba(0,0,0,0.6)]" />
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
              {/* Left Button - INFO (Enhanced Realism) */}
              <button
                className="group relative w-20 h-20 rounded-lg"
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] shadow-[0_4px_0_#000000,0_6px_12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] group-hover:shadow-[0_5px_0_#000000,0_7px_15px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.15)] group-active:shadow-[0_1px_0_#000000,inset_0_4px_8px_rgba(0,0,0,0.85)] group-active:translate-y-[3px] transition-all border border-white/10" 
                     style={{ filter: 'url(#buttonEmboss)' }}>
                  {/* Matte black texture */}
                  <div className="absolute inset-0.5 rounded-lg opacity-50" style={{ background: 'url(#matteBlack)' }} />
                  
                  {/* Knurled grip pattern */}
                  <div className="absolute inset-0 rounded-lg opacity-20" style={{ background: 'url(#knurledFine)' }} />
                </div>
                <span className="relative z-10 text-cyan-400 text-xs font-bold tracking-[0.15em] group-hover:text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)] transition-colors">INFO</span>
              </button>
              
              {/* Center Button - ULTIMATE REALISTIC SHUTTER BUTTON */}
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="group relative w-32 h-32 rounded-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {/* Base mounting plate - Dark metal foundation */}
                <div className="absolute inset-0 rounded-full bg-[#050505] shadow-[0_0_0_6px_#0d0d0d,0_0_0_7px_#1a1a1a,0_14px_35px_rgba(0,0,0,0.95)]" />
                
                {/* Outer beveled ring - Chrome edge */}
                <div className="absolute inset-[8px] rounded-full bg-gradient-to-br from-[#6a6a6a] via-[#2a2a2a] via-50% to-[#0a0a0a] shadow-[inset_0_3px_6px_rgba(255,255,255,0.2),inset_0_-4px_12px_rgba(0,0,0,0.8),0_2px_0_rgba(255,255,255,0.12)]" 
                     style={{ filter: 'url(#buttonEmboss)' }} />
                
                {/* Middle ring - Brushed dark metal */}
                <div className="absolute inset-[16px] rounded-full border border-white/5" 
                     style={{ 
                       background: 'url(#brushedMetal)',
                       boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.9), inset 0 -1px 2px rgba(255,255,255,0.06), 0 1px 0 rgba(255,255,255,0.08)'
                     }} />
                
                {/* Red shutter button - Deep 3D press mechanism */}
                <div className="absolute inset-[24px] rounded-full bg-gradient-to-b from-[#bb0000] via-[#880000] via-60% to-[#550000] shadow-[0_5px_0_#330000,0_7px_25px_rgba(200,0,0,0.9),inset_0_3px_8px_rgba(255,60,60,0.6),inset_0_-3px_12px_rgba(40,0,0,0.95)] group-hover:from-[#dd1111] group-hover:via-[#990000] group-hover:shadow-[0_6px_0_#330000,0_9px_30px_rgba(255,0,0,0.95),inset_0_3px_8px_rgba(255,80,80,0.7)] group-active:shadow-[0_1px_0_#330000,inset_0_8px_20px_rgba(0,0,0,0.98)] group-active:translate-y-[4px] disabled:group-hover:shadow-none disabled:group-hover:translate-y-0 transition-all duration-100 border border-[#660000]">
                  
                  {/* Fine knurled grip texture */}
                  <div className="absolute inset-0 rounded-full opacity-25" style={{ background: 'url(#knurledFine)' }} />
                  
                  {/* Carbon fiber center inlay */}
                  <div className="absolute inset-[6px] rounded-full opacity-15" style={{ background: 'url(#carbonFiber)' }} />
                  
                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    {isGenerating ? (
                      <>
                        <Camera className="w-9 h-9 text-white animate-pulse mb-1.5 drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)]" strokeWidth={3} />
                        <span className="text-[11px] text-white font-bold tracking-[0.2em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">CAPTURE</span>
                      </>
                    ) : (
                      <>
                        <div className="w-8 h-8 rounded-full border-[3px] border-white mb-1.5 shadow-[0_0_12px_rgba(255,255,255,0.7),inset_0_0_4px_rgba(255,255,255,0.3)]" />
                        <span className="text-[11px] text-white font-bold tracking-[0.2em] drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">SHOOT</span>
                      </>
                    )}
                  </div>
                  
                  {/* Top-left specular highlight */}
                  <div className="absolute top-[8px] left-[10px] w-[26px] h-[26px] rounded-full bg-gradient-to-br from-white/30 to-transparent pointer-events-none blur-[1.5px]" />
                  
                  {/* Bottom-right subtle shadow */}
                  <div className="absolute bottom-[6px] right-[8px] w-[20px] h-[20px] rounded-full bg-gradient-to-tl from-black/40 to-transparent pointer-events-none blur-[2px]" />
                </div>
                
                {/* Outer glow ring (ready state) */}
                <div className="absolute inset-0 rounded-full border-[3px] border-red-500/15 group-hover:border-red-400/30 disabled:border-red-500/5 transition-all" />
                
                {/* Subtle ambient pulse */}
                <div className="absolute inset-0 rounded-full border-2 border-red-500/10 animate-ping" style={{ animationDuration: '4s' }} />
              </button>

              {/* Right Button - MENU/CLOSE (Enhanced Realism) */}
              <DrawerClose asChild>
                <button
                  className="group relative w-20 h-20 rounded-lg"
                >
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a] shadow-[0_4px_0_#000000,0_6px_12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] group-hover:shadow-[0_5px_0_#000000,0_7px_15px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.15)] group-active:shadow-[0_1px_0_#000000,inset_0_4px_8px_rgba(0,0,0,0.85)] group-active:translate-y-[3px] transition-all border border-white/10" 
                       style={{ filter: 'url(#buttonEmboss)' }}>
                    {/* Matte black texture */}
                    <div className="absolute inset-0.5 rounded-lg opacity-50" style={{ background: 'url(#matteBlack)' }} />
                    
                    {/* Knurled grip pattern */}
                    <div className="absolute inset-0 rounded-lg opacity-20" style={{ background: 'url(#knurledFine)' }} />
                  </div>
                  <div className="relative z-10 w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <Menu className="w-6 h-6 text-white/80 group-hover:text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] transition-colors" />
                    <span className="text-[9px] text-white/60 font-mono tracking-wider mt-1 group-hover:text-white/80">MENU</span>
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