import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { 
  Wand2, 
  X, 
  Settings2, 
  Layers, 
  Focus, 
  Circle, 
  Grid,
  Info,
  Menu,
  Play,
  Trash2,
  Sun,
  Droplets,
  Navigation,
  RotateCcw
} from "lucide-react";
import { useImageGeneration } from "@/hooks/useImageGeneration";
import { toast } from "sonner";

export function ImageGenerationDrawerV2() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);
  const [steps, setSteps] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { generateImage } = useImageGeneration();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    try {
      const cameraSettings = {
        iso: 400,
        aperture: 5.6,
        shutterSpeed: 250,
        width,
        height,
        steps,
        exposure: 0,
        contrast: 0,
        saturation: 0,
      };
      
      await generateImage(prompt, cameraSettings);
    } catch (error) {
      console.error("Generation error:", error);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="camera-button">
          <Wand2 className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[90vh] bg-transparent border-none">
        {/* PROFESSIONAL DSLR CAMERA BODY */}
        <div className="relative h-full w-full flex items-center justify-center p-4">
          
          {/* SVG TEXTURE DEFINITIONS - ULTRA REALISTIC */}
          <svg width="0" height="0" className="absolute">
            <defs>
              {/* FINE RUBBER GRIP - High Density Dots */}
              <pattern id="fineRubberGrip" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.2" fill="#0a0a0a" opacity="0.8"/>
                <circle cx="6" cy="2" r="1.2" fill="#0a0a0a" opacity="0.8"/>
                <circle cx="4" cy="6" r="1.2" fill="#0a0a0a" opacity="0.8"/>
                <circle cx="2" cy="6" r="1.2" fill="#0a0a0a" opacity="0.7"/>
                <circle cx="6" cy="6" r="1.2" fill="#0a0a0a" opacity="0.7"/>
              </pattern>

              {/* CARBON FIBER WEAVE */}
              <pattern id="carbonFiber" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="#0f0f0f"/>
                <path d="M0,10 L10,0 L20,10 L10,20 Z" fill="#1a1a1a" opacity="0.6"/>
                <path d="M10,0 L20,10 L10,20 L0,10 Z" fill="#0a0a0a" opacity="0.4"/>
                <line x1="0" y1="10" x2="20" y2="10" stroke="#2a2a2a" strokeWidth="0.5"/>
                <line x1="10" y1="0" x2="10" y2="20" stroke="#2a2a2a" strokeWidth="0.5"/>
              </pattern>

              {/* BRUSHED METAL - Horizontal Lines */}
              <pattern id="brushedMetal" x="0" y="0" width="100" height="4" patternUnits="userSpaceOnUse">
                <rect width="100" height="4" fill="#3a3a3a"/>
                <line x1="0" y1="1" x2="100" y2="1" stroke="#4a4a4a" strokeWidth="0.5"/>
                <line x1="0" y1="2" x2="100" y2="2" stroke="#2a2a2a" strokeWidth="0.5"/>
                <line x1="0" y1="3" x2="100" y2="3" stroke="#1a1a1a" strokeWidth="0.3"/>
              </pattern>

              {/* FINE KNURLED TEXTURE */}
              <pattern id="fineKnurled" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse">
                <rect width="6" height="6" fill="#2d2d2d"/>
                <path d="M0,0 L3,3 L0,6 M3,0 L6,3 L3,6 M6,0 L3,3 L6,6" 
                      stroke="#3d3d3d" strokeWidth="0.5" fill="none"/>
                <path d="M0,0 L3,3 L0,6 M3,0 L6,3 L3,6" 
                      stroke="#1d1d1d" strokeWidth="0.5" fill="none" opacity="0.5"/>
              </pattern>

              {/* MATTE BLACK METAL GRAIN */}
              <pattern id="metalGrain" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                <rect width="4" height="4" fill="#1a1a1a"/>
                <circle cx="1" cy="1" r="0.3" fill="#0a0a0a" opacity="0.4"/>
                <circle cx="3" cy="2" r="0.3" fill="#2a2a2a" opacity="0.3"/>
                <circle cx="2" cy="3" r="0.3" fill="#0a0a0a" opacity="0.5"/>
              </pattern>

              {/* LEATHERETTE TEXTURE */}
              <pattern id="leatherette" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                <rect width="12" height="12" fill="#1a1a1a"/>
                <path d="M2,2 Q4,4 6,2 T10,2 M2,6 Q4,8 6,6 T10,6 M2,10 Q4,12 6,10 T10,10" 
                      stroke="#0a0a0a" strokeWidth="0.5" fill="none" opacity="0.6"/>
              </pattern>

              {/* THREAD PATTERN for Shutter Button */}
              <pattern id="threadPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M0,2 Q4,0 8,2 M0,6 Q4,4 8,6" stroke="#4a4a4a" strokeWidth="0.8" fill="none"/>
              </pattern>

              {/* 3D BUTTON EMBOSS - Deep */}
              <filter id="deepButtonEmboss" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                <feOffset dx="0" dy="2" result="offsetblur"/>
                <feComponentTransfer>
                  <feFuncA type="linear" slope="0.5"/>
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* DEEP INSET SHADOW */}
              <filter id="deepInsetShadow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dx="0" dy="3" result="offsetblur"/>
                <feFlood floodColor="#000000" floodOpacity="0.8"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                  <feMergeNode/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              {/* CHROME REFLECTION */}
              <linearGradient id="chromeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#e0e0e0', stopOpacity: 1 }} />
                <stop offset="30%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                <stop offset="50%" style={{ stopColor: '#b0b0b0', stopOpacity: 1 }} />
                <stop offset="70%" style={{ stopColor: '#ffffff', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#d0d0d0', stopOpacity: 1 }} />
              </linearGradient>

              {/* AMBER LCD GLOW */}
              <filter id="amberGlow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </svg>

          {/* MAIN CAMERA BODY FRAME */}
          <div className="relative w-full max-w-7xl h-full bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#000000] rounded-2xl shadow-[0_20px_80px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.03)] border border-white/5 overflow-hidden"
               style={{ 
                 backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'4\' height=\'4\' fill=\'%231a1a1a\'/%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'0.3\' fill=\'%230a0a0a\' opacity=\'0.4\'/%3E%3C/svg%3E")',
                 backgroundSize: '4px 4px'
               }}>
            
            {/* TOP PANEL - Model Name & Status LCD */}
            <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] border-b border-white/5 flex items-center justify-between px-8"
                 style={{ 
                   backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'100\' height=\'4\' fill=\'%233a3a3a\'/%3E%3Cline x1=\'0\' y1=\'1\' x2=\'100\' y2=\'1\' stroke=\'%234a4a4a\' stroke-width=\'0.5\'/%3E%3C/svg%3E")',
                   backgroundSize: '100px 4px',
                   backgroundRepeat: 'repeat-x'
                 }}>
              
              {/* Model Name */}
              <div className="text-white/60 font-bold text-xl tracking-wider" style={{ fontFamily: 'monospace' }}>
                ICE-7D <span className="text-xs text-white/30 ml-2">Mark II</span>
              </div>

              {/* TOP LCD STATUS PANEL */}
              <div className="relative bg-gradient-to-b from-[#1a2a1a] to-[#0a1a0a] rounded-lg px-6 py-3 border border-[#2a4a2a]/50 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),0_0_20px_rgba(0,255,150,0.1)]"
                   style={{ filter: 'url(#amberGlow)' }}>
                <div className="flex items-center gap-6 text-[#00ffaa] font-mono text-sm"
                     style={{ textShadow: '0 0 8px rgba(0,255,170,0.6)' }}>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-[#00ffaa]/50">ISO</span>
                    <span className="text-lg font-bold">400</span>
                  </div>
                  <div className="w-px h-8 bg-[#00ffaa]/20"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-[#00ffaa]/50">F</span>
                    <span className="text-lg font-bold">5.6</span>
                  </div>
                  <div className="w-px h-8 bg-[#00ffaa]/20"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-[#00ffaa]/50">SHUTTER</span>
                    <span className="text-lg font-bold">1/250</span>
                  </div>
                  <div className="w-px h-8 bg-[#00ffaa]/20"></div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isGenerating ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`}
                         style={{ boxShadow: isGenerating ? '0 0 10px rgba(255,0,0,0.8)' : '0 0 10px rgba(0,255,0,0.8)' }}></div>
                    <span className="text-xs">{isGenerating ? 'BUSY' : 'RDY'}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-[#00ffaa]/50">SHOTS</span>
                    <span className="text-lg font-bold">999</span>
                  </div>
                </div>
              </div>

              {/* Battery Indicator */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-5 border-2 border-white/30 rounded-sm relative">
                  <div className="absolute top-1/2 -right-1 w-1 h-2 bg-white/30 -translate-y-1/2 rounded-r"></div>
                  <div className="absolute inset-0.5 bg-gradient-to-r from-green-500 to-green-400 rounded-[1px]"></div>
                </div>
                <span className="text-white/40 text-xs font-mono">100%</span>
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="absolute top-20 left-0 right-0 bottom-0 flex">
              
              {/* LEFT PANEL - Function Buttons & Deep Grip */}
              <div className="w-24 bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f] border-r border-white/5 flex flex-col items-center py-8 gap-4"
                   style={{ 
                     backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'8\' height=\'8\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1.2\' fill=\'%230a0a0a\' opacity=\'0.8\'/%3E%3Ccircle cx=\'6\' cy=\'6\' r=\'1.2\' fill=\'%230a0a0a\' opacity=\'0.7\'/%3E%3C/svg%3E")',
                     backgroundSize: '8px 8px'
                   }}>
                
                {/* Deep Rubber Grip Area */}
                <div className="w-16 h-32 bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0f0f0f] rounded-lg mb-4 shadow-[inset_0_4px_12px_rgba(0,0,0,0.8)]"
                     style={{ 
                       backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'8\' height=\'8\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1.2\' fill=\'%230a0a0a\' opacity=\'0.8\'/%3E%3Ccircle cx=\'6\' cy=\'2\' r=\'1.2\' fill=\'%230a0a0a\' opacity=\'0.8\'/%3E%3Ccircle cx=\'4\' cy=\'6\' r=\'1.2\' fill=\'%230a0a0a\' opacity=\'0.8\'/%3E%3C/svg%3E")',
                       backgroundSize: '8px 8px'
                     }}></div>

                {/* Function Buttons */}
                <button className="group relative w-14 h-14 bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-full shadow-[0_4px_0_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.05),inset_0_-2px_4px_rgba(0,0,0,0.3)] hover:shadow-[0_2px_0_rgba(0,0,0,0.5),inset_0_3px_6px_rgba(0,0,0,0.5)] hover:translate-y-1 active:shadow-[0_0_0_rgba(0,0,0,0.5),inset_0_4px_8px_rgba(0,0,0,0.7)] active:translate-y-2 transition-all duration-75 border border-white/5"
                        style={{ 
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'6\' height=\'6\' fill=\'%232d2d2d\'/%3E%3Cpath d=\'M0,0 L3,3 L0,6\' stroke=\'%233d3d3d\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
                          backgroundSize: '6px 6px'
                        }}>
                  <div className="absolute inset-2 flex items-center justify-center">
                    <Settings2 className="w-5 h-5 text-white/70 group-hover:text-white/90" />
                  </div>
                  <span className="absolute -right-12 top-1/2 -translate-y-1/2 text-[10px] text-white/40 whitespace-nowrap">Fn</span>
                </button>

                <button className="group relative w-14 h-14 bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-full shadow-[0_4px_0_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.05),inset_0_-2px_4px_rgba(0,0,0,0.3)] hover:shadow-[0_2px_0_rgba(0,0,0,0.5),inset_0_3px_6px_rgba(0,0,0,0.5)] hover:translate-y-1 active:shadow-[0_0_0_rgba(0,0,0,0.5),inset_0_4px_8px_rgba(0,0,0,0.7)] active:translate-y-2 transition-all duration-75 border border-white/5"
                        style={{ 
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'6\' height=\'6\' fill=\'%232d2d2d\'/%3E%3Cpath d=\'M0,0 L3,3 L0,6\' stroke=\'%233d3d3d\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
                          backgroundSize: '6px 6px'
                        }}>
                  <div className="absolute inset-2 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-white/70 group-hover:text-white/90" />
                  </div>
                  <span className="absolute -right-16 top-1/2 -translate-y-1/2 text-[10px] text-white/40 whitespace-nowrap">Layers</span>
                </button>

                <button className="group relative w-14 h-14 bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-full shadow-[0_4px_0_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.05),inset_0_-2px_4px_rgba(0,0,0,0.3)] hover:shadow-[0_2px_0_rgba(0,0,0,0.5),inset_0_3px_6px_rgba(0,0,0,0.5)] hover:translate-y-1 active:shadow-[0_0_0_rgba(0,0,0,0.5),inset_0_4px_8px_rgba(0,0,0,0.7)] active:translate-y-2 transition-all duration-75 border border-white/5"
                        style={{ 
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'6\' height=\'6\' fill=\'%232d2d2d\'/%3E%3Cpath d=\'M0,0 L3,3 L0,6\' stroke=\'%233d3d3d\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
                          backgroundSize: '6px 6px'
                        }}>
                  <div className="absolute inset-2 flex items-center justify-center">
                    <Sun className="w-5 h-5 text-white/70 group-hover:text-white/90" />
                  </div>
                  <span className="absolute -right-12 top-1/2 -translate-y-1/2 text-[10px] text-white/40 whitespace-nowrap">WB</span>
                </button>

                <button className="group relative w-14 h-14 bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-full shadow-[0_4px_0_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.05),inset_0_-2px_4px_rgba(0,0,0,0.3)] hover:shadow-[0_2px_0_rgba(0,0,0,0.5),inset_0_3px_6px_rgba(0,0,0,0.5)] hover:translate-y-1 active:shadow-[0_0_0_rgba(0,0,0,0.5),inset_0_4px_8px_rgba(0,0,0,0.7)] active:translate-y-2 transition-all duration-75 border border-white/5"
                        style={{ 
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'6\' height=\'6\' fill=\'%232d2d2d\'/%3E%3Cpath d=\'M0,0 L3,3 L0,6\' stroke=\'%233d3d3d\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
                          backgroundSize: '6px 6px'
                        }}>
                  <div className="absolute inset-2 flex items-center justify-center">
                    <Circle className="w-5 h-5 text-white/70 group-hover:text-white/90" />
                  </div>
                  <span className="absolute -right-16 top-1/2 -translate-y-1/2 text-[10px] text-white/40 whitespace-nowrap">DoF</span>
                </button>

                <button className="group relative w-14 h-14 bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-full shadow-[0_4px_0_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.05),inset_0_-2px_4px_rgba(0,0,0,0.3)] hover:shadow-[0_2px_0_rgba(0,0,0,0.5),inset_0_3px_6px_rgba(0,0,0,0.5)] hover:translate-y-1 active:shadow-[0_0_0_rgba(0,0,0,0.5),inset_0_4px_8px_rgba(0,0,0,0.7)] active:translate-y-2 transition-all duration-75 border border-white/5"
                        style={{ 
                          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'6\' height=\'6\' fill=\'%232d2d2d\'/%3E%3Cpath d=\'M0,0 L3,3 L0,6\' stroke=\'%233d3d3d\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
                          backgroundSize: '6px 6px'
                        }}>
                  <div className="absolute inset-2 flex items-center justify-center">
                    <Grid className="w-5 h-5 text-white/70 group-hover:text-white/90" />
                  </div>
                  <span className="absolute -right-16 top-1/2 -translate-y-1/2 text-[10px] text-white/40 whitespace-nowrap">Grid</span>
                </button>
              </div>

              {/* CENTER PANEL - Main LCD Screen Content */}
              <div className="flex-1 bg-[#0a0a0a] border-x border-white/5 overflow-y-auto">
                <DrawerHeader className="border-b border-white/10 bg-gradient-to-b from-[#1a1a1a]/50 to-transparent">
                  <DrawerTitle className="text-white/90 text-xl font-semibold">AI Image Generation</DrawerTitle>
                  <DrawerDescription className="text-white/50">
                    Configure camera settings and generate images
                  </DrawerDescription>
                </DrawerHeader>

                <div className="p-8 space-y-6">
                  {/* Prompt Input */}
                  <div className="space-y-2">
                    <Label htmlFor="prompt" className="text-white/80 text-sm font-medium">
                      Prompt
                    </Label>
                    <Input
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe the image you want to generate..."
                      className="bg-[#1a1a1a] border-white/20 text-white placeholder:text-white/30 focus:border-[#00ffaa]/50 focus:ring-[#00ffaa]/20"
                    />
                  </div>

                  {/* Negative Prompt */}
                  <div className="space-y-2">
                    <Label htmlFor="negative" className="text-white/80 text-sm font-medium">
                      Negative Prompt
                    </Label>
                    <Input
                      id="negative"
                      value={negativePrompt}
                      onChange={(e) => setNegativePrompt(e.target.value)}
                      placeholder="What to avoid in the image..."
                      className="bg-[#1a1a1a] border-white/20 text-white placeholder:text-white/30 focus:border-[#00ffaa]/50 focus:ring-[#00ffaa]/20"
                    />
                  </div>

                  {/* Dimensions */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm font-medium">
                        Width: {width}px
                      </Label>
                      <Slider
                        value={[width]}
                        onValueChange={(value) => setWidth(value[0])}
                        min={512}
                        max={2048}
                        step={64}
                        className="[&_[role=slider]]:bg-[#00ffaa] [&_[role=slider]]:border-[#00ffaa]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white/80 text-sm font-medium">
                        Height: {height}px
                      </Label>
                      <Slider
                        value={[height]}
                        onValueChange={(value) => setHeight(value[0])}
                        min={512}
                        max={2048}
                        step={64}
                        className="[&_[role=slider]]:bg-[#00ffaa] [&_[role=slider]]:border-[#00ffaa]"
                      />
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="space-y-2">
                    <Label className="text-white/80 text-sm font-medium">
                      Inference Steps: {steps}
                    </Label>
                    <Slider
                      value={[steps]}
                      onValueChange={(value) => setSteps(value[0])}
                      min={1}
                      max={50}
                      step={1}
                      className="[&_[role=slider]]:bg-[#00ffaa] [&_[role=slider]]:border-[#00ffaa]"
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL - Advanced Controls */}
              <div className="w-64 bg-gradient-to-l from-[#1a1a1a] to-[#0f0f0f] border-l border-white/5 flex flex-col items-center py-8 gap-6"
                   style={{ 
                     backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'20\' height=\'20\' fill=\'%230f0f0f\'/%3E%3Cpath d=\'M0,10 L10,0 L20,10 L10,20 Z\' fill=\'%231a1a1a\' opacity=\'0.6\'/%3E%3C/svg%3E")',
                     backgroundSize: '20px 20px'
                   }}>
                
                {/* ULTIMATE REALISTIC SHUTTER BUTTON */}
                <div className="relative w-40 h-40 flex items-center justify-center mb-4">
                  {/* Mounting Plate - Dark Metal */}
                  <div className="absolute w-32 h-32 bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0f0f0f] rounded-full shadow-[inset_0_4px_12px_rgba(0,0,0,0.9),0_8px_24px_rgba(0,0,0,0.8)] border border-white/5"
                       style={{ 
                         backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'4\' height=\'4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'4\' height=\'4\' fill=\'%231a1a1a\'/%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'0.3\' fill=\'%230a0a0a\' opacity=\'0.4\'/%3E%3C/svg%3E")',
                         backgroundSize: '4px 4px'
                       }}></div>

                  {/* Chrome Ring - Outer */}
                  <div className="absolute w-28 h-28 rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.7),inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-2px_4px_rgba(0,0,0,0.5)] border-2 border-white/10"
                       style={{ 
                         background: 'linear-gradient(135deg, #e0e0e0 0%, #ffffff 30%, #b0b0b0 50%, #ffffff 70%, #d0d0d0 100%)'
                       }}></div>

                  {/* Brushed Metal Ring - Inner */}
                  <div className="absolute w-24 h-24 rounded-full shadow-[inset_0_3px_8px_rgba(0,0,0,0.6),0_2px_4px_rgba(255,255,255,0.1)] border border-white/20"
                       style={{ 
                         backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'100\' height=\'4\' fill=\'%233a3a3a\'/%3E%3Cline x1=\'0\' y1=\'1\' x2=\'100\' y2=\'1\' stroke=\'%234a4a4a\' stroke-width=\'0.5\'/%3E%3C/svg%3E")',
                         backgroundSize: '100px 4px'
                       }}></div>

                  {/* Thread Pattern Ring */}
                  <div className="absolute w-20 h-20 rounded-full"
                       style={{ 
                         backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'8\' height=\'8\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,2 Q4,0 8,2 M0,6 Q4,4 8,6\' stroke=\'%234a4a4a\' stroke-width=\'0.8\' fill=\'none\'/%3E%3C/svg%3E")',
                         backgroundSize: '8px 8px'
                       }}></div>

                  {/* MAIN SHUTTER BUTTON */}
                  <button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="group relative w-16 h-16 rounded-full shadow-[0_8px_0_#1a0000,inset_0_3px_6px_rgba(255,100,100,0.3),inset_0_-3px_6px_rgba(0,0,0,0.5),0_0_30px_rgba(255,50,50,0.2)] hover:shadow-[0_4px_0_#1a0000,inset_0_4px_8px_rgba(255,100,100,0.4),inset_0_-4px_8px_rgba(0,0,0,0.6)] hover:translate-y-1 active:shadow-[0_0_0_#1a0000,inset_0_6px_12px_rgba(0,0,0,0.8)] active:translate-y-2 transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed border-2 border-[#3a0000]"
                    style={{ 
                      background: 'radial-gradient(circle at 30% 30%, #ff4444, #cc0000 40%, #8a0000 70%, #550000)',
                      backgroundImage: `radial-gradient(circle at 30% 30%, #ff4444, #cc0000 40%, #8a0000 70%, #550000), url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='20' height='20' fill='%230f0f0f'/%3E%3Cpath d='M0,10 L10,0 L20,10 L10,20 Z' fill='%231a1a1a' opacity='0.6'/%3E%3C/svg%3E")`,
                      backgroundBlendMode: 'normal, overlay',
                      backgroundSize: 'cover, 10px 10px'
                    }}
                  >
                    {/* Highlight Spot */}
                    <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-gradient-radial from-white/40 to-transparent blur-sm"></div>
                    
                    {/* Center Knurled Detail */}
                    <div className="absolute inset-3 rounded-full border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]"
                         style={{ 
                           backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'6\' height=\'6\' fill=\'%232d2d2d\'/%3E%3Cpath d=\'M0,0 L3,3 L0,6 M3,0 L6,3 L3,6\' stroke=\'%233d3d3d\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
                           backgroundSize: '6px 6px'
                         }}></div>

                    {/* Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Circle className="w-6 h-6 text-white/90 group-hover:text-white" />
                    </div>

                    {/* Glow Effect when Active */}
                    {isGenerating && (
                      <div className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse"></div>
                    )}
                  </button>

                  {/* Label */}
                  <div className="absolute -bottom-8 text-center">
                    <span className="text-white/60 text-sm font-bold tracking-wider">SHOOT</span>
                    <div className="text-white/30 text-[10px]">CAPTURE</div>
                  </div>
                </div>

                {/* Mode Dial */}
                <div className="relative w-32 h-32 mt-8">
                  {/* Dial Base */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0f0f0f] rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.03)] border border-white/10"
                       style={{ 
                         backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'6\' height=\'6\' fill=\'%232d2d2d\'/%3E%3Cpath d=\'M0,0 L3,3 L0,6 M3,0 L6,3 L3,6\' stroke=\'%233d3d3d\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
                         backgroundSize: '6px 6px'
                       }}></div>

                  {/* Mode Indicator */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-4 bg-gradient-to-b from-red-500 to-red-600 rounded-full shadow-[0_0_8px_rgba(255,0,0,0.6)]"></div>

                  {/* Center Button */}
                  <div className="absolute inset-10 bg-gradient-to-br from-[#3a3a3a] via-[#2a2a2a] to-[#1a1a1a] rounded-full shadow-[inset_0_3px_8px_rgba(0,0,0,0.7),0_2px_4px_rgba(255,255,255,0.05)] border border-white/10 flex items-center justify-center">
                    <span className="text-white/50 text-xs font-bold">MODE</span>
                  </div>

                  {/* Mode Markers */}
                  <div className="absolute inset-6 flex items-center justify-center">
                    <div className="text-[10px] text-white/40 font-mono absolute -top-2">A</div>
                    <div className="text-[10px] text-white/40 font-mono absolute -right-2">M</div>
                    <div className="text-[10px] text-white/40 font-mono absolute -bottom-2">P</div>
                    <div className="text-[10px] text-white/40 font-mono absolute -left-2">S</div>
                  </div>
                </div>

                {/* D-PAD Navigation Cluster */}
                <div className="relative w-40 h-40 mt-8">
                  {/* Background Plate */}
                  <div className="absolute inset-4 bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#000000] rounded-2xl shadow-[inset_0_4px_12px_rgba(0,0,0,0.9)] border border-white/5"
                       style={{ 
                         backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'20\' height=\'20\' fill=\'%230f0f0f\'/%3E%3Cpath d=\'M0,10 L10,0 L20,10 L10,20 Z\' fill=\'%231a1a1a\' opacity=\'0.6\'/%3E%3C/svg%3E")',
                         backgroundSize: '20px 20px'
                       }}></div>

                  {/* UP Button */}
                  <button className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-t-xl shadow-[0_3px_0_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.05)] hover:shadow-[0_1px_0_rgba(0,0,0,0.5),inset_0_3px_6px_rgba(0,0,0,0.5)] hover:translate-y-0.5 active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.7)] active:translate-y-1 transition-all duration-75 border border-white/5 flex items-center justify-center"
                          style={{ 
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'6\' height=\'6\' fill=\'%232d2d2d\'/%3E%3Cpath d=\'M0,0 L3,3 L0,6\' stroke=\'%233d3d3d\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
                            backgroundSize: '6px 6px'
                          }}>
                    <Navigation className="w-4 h-4 text-white/60 -rotate-90" />
                  </button>

                  {/* RIGHT Button */}
                  <button className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-r from-[#2d2d2d] to-[#1a1a1a] rounded-r-xl shadow-[0_3px_0_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.05)] hover:shadow-[0_1px_0_rgba(0,0,0,0.5),inset_0_3px_6px_rgba(0,0,0,0.5)] hover:translate-y-0.5 active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.7)] active:translate-y-1 transition-all duration-75 border border-white/5 flex items-center justify-center"
                          style={{ 
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'6\' height=\'6\' fill=\'%232d2d2d\'/%3E%3Cpath d=\'M0,0 L3,3 L0,6\' stroke=\'%233d3d3d\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
                            backgroundSize: '6px 6px'
                          }}>
                    <Navigation className="w-4 h-4 text-white/60" />
                  </button>

                  {/* DOWN Button */}
                  <button className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-t from-[#2d2d2d] to-[#1a1a1a] rounded-b-xl shadow-[0_3px_0_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.05)] hover:shadow-[0_1px_0_rgba(0,0,0,0.5),inset_0_3px_6px_rgba(0,0,0,0.5)] hover:translate-y-0.5 active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.7)] active:translate-y-1 transition-all duration-75 border border-white/5 flex items-center justify-center"
                          style={{ 
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'6\' height=\'6\' fill=\'%232d2d2d\'/%3E%3Cpath d=\'M0,0 L3,3 L0,6\' stroke=\'%233d3d3d\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
                            backgroundSize: '6px 6px'
                          }}>
                    <Navigation className="w-4 h-4 text-white/60 rotate-90" />
                  </button>

                  {/* LEFT Button */}
                  <button className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-l from-[#2d2d2d] to-[#1a1a1a] rounded-l-xl shadow-[0_3px_0_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.05)] hover:shadow-[0_1px_0_rgba(0,0,0,0.5),inset_0_3px_6px_rgba(0,0,0,0.5)] hover:translate-y-0.5 active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.7)] active:translate-y-1 transition-all duration-75 border border-white/5 flex items-center justify-center"
                          style={{ 
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'6\' height=\'6\' fill=\'%232d2d2d\'/%3E%3Cpath d=\'M0,0 L3,3 L0,6\' stroke=\'%233d3d3d\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
                            backgroundSize: '6px 6px'
                          }}>
                    <Navigation className="w-4 h-4 text-white/60 rotate-180" />
                  </button>

                  {/* CENTER SET Button */}
                  <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-[#3a3a3a] via-[#2a2a2a] to-[#1a1a1a] rounded-full shadow-[0_4px_0_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(255,255,255,0.05),inset_0_-2px_6px_rgba(0,0,0,0.5)] hover:shadow-[0_2px_0_rgba(0,0,0,0.6),inset_0_3px_6px_rgba(0,0,0,0.5)] hover:translate-y-1 active:shadow-[0_0_0_rgba(0,0,0,0.6),inset_0_4px_8px_rgba(0,0,0,0.7)] active:translate-y-2 transition-all duration-75 border-2 border-white/10 flex items-center justify-center"
                          style={{ 
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'6\' height=\'6\' fill=\'%232d2d2d\'/%3E%3Cpath d=\'M0,0 L3,3 L0,6 M3,0 L6,3 L3,6\' stroke=\'%233d3d3d\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
                            backgroundSize: '6px 6px'
                          }}>
                    <span className="text-white/70 text-xs font-bold">SET</span>
                  </button>
                </div>

                {/* Quick Function Buttons */}
                <div className="flex gap-3 mt-8">
                  <button className="w-12 h-12 bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-lg shadow-[0_3px_0_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.05)] hover:shadow-[0_1px_0_rgba(0,0,0,0.5),inset_0_3px_6px_rgba(0,0,0,0.5)] hover:translate-y-0.5 active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.7)] active:translate-y-1 transition-all duration-75 border border-white/5 flex items-center justify-center"
                          style={{ 
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'6\' height=\'6\' fill=\'%232d2d2d\'/%3E%3Cpath d=\'M0,0 L3,3 L0,6\' stroke=\'%233d3d3d\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
                            backgroundSize: '6px 6px'
                          }}>
                    <Focus className="w-5 h-5 text-white/60" />
                  </button>

                  <button className="w-12 h-12 bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-lg shadow-[0_3px_0_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.05)] hover:shadow-[0_1px_0_rgba(0,0,0,0.5),inset_0_3px_6px_rgba(0,0,0,0.5)] hover:translate-y-0.5 active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.7)] active:translate-y-1 transition-all duration-75 border border-white/5 flex items-center justify-center"
                          style={{ 
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'6\' height=\'6\' fill=\'%232d2d2d\'/%3E%3Cpath d=\'M0,0 L3,3 L0,6\' stroke=\'%233d3d3d\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
                            backgroundSize: '6px 6px'
                          }}>
                    <RotateCcw className="w-5 h-5 text-white/60" />
                  </button>

                  <button className="w-12 h-12 bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-lg shadow-[0_3px_0_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.05)] hover:shadow-[0_1px_0_rgba(0,0,0,0.5),inset_0_3px_6px_rgba(0,0,0,0.5)] hover:translate-y-0.5 active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.7)] active:translate-y-1 transition-all duration-75 border border-white/5 flex items-center justify-center"
                          style={{ 
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'6\' height=\'6\' fill=\'%232d2d2d\'/%3E%3Cpath d=\'M0,0 L3,3 L0,6\' stroke=\'%233d3d3d\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
                            backgroundSize: '6px 6px'
                          }}>
                    <Droplets className="w-5 h-5 text-white/60" />
                  </button>
                </div>
              </div>
            </div>

            {/* BOTTOM CONTROL PANEL */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1a1a1a] to-[#0f0f0f] border-t border-white/5 flex items-center justify-center gap-6 px-8"
                 style={{ 
                   backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'4\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'100\' height=\'4\' fill=\'%233a3a3a\'/%3E%3Cline x1=\'0\' y1=\'1\' x2=\'100\' y2=\'1\' stroke=\'%234a4a4a\' stroke-width=\'0.5\'/%3E%3C/svg%3E")',
                   backgroundSize: '100px 4px',
                   backgroundRepeat: 'repeat-x'
                 }}>
              
              {/* INFO Button */}
              <button className="group relative w-16 h-16 bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-xl shadow-[0_4px_0_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.05),inset_0_-2px_4px_rgba(0,0,0,0.3)] hover:shadow-[0_2px_0_rgba(0,0,0,0.5),inset_0_3px_6px_rgba(0,0,0,0.5)] hover:translate-y-1 active:shadow-[0_0_0_rgba(0,0,0,0.5),inset_0_4px_8px_rgba(0,0,0,0.7)] active:translate-y-2 transition-all duration-75 border border-white/5 flex flex-col items-center justify-center"
                      style={{ 
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'6\' height=\'6\' fill=\'%232d2d2d\'/%3E%3Cpath d=\'M0,0 L3,3 L0,6\' stroke=\'%233d3d3d\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
                        backgroundSize: '6px 6px'
                      }}>
                <Info className="w-5 h-5 text-white/60 group-hover:text-white/80" />
                <span className="text-[10px] text-white/40 mt-1">INFO</span>
              </button>

              {/* PLAYBACK Button */}
              <button className="group relative w-16 h-16 bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-xl shadow-[0_4px_0_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.05),inset_0_-2px_4px_rgba(0,0,0,0.3)] hover:shadow-[0_2px_0_rgba(0,0,0,0.5),inset_0_3px_6px_rgba(0,0,0,0.5)] hover:translate-y-1 active:shadow-[0_0_0_rgba(0,0,0,0.5),inset_0_4px_8px_rgba(0,0,0,0.7)] active:translate-y-2 transition-all duration-75 border border-white/5 flex flex-col items-center justify-center"
                      style={{ 
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'6\' height=\'6\' fill=\'%232d2d2d\'/%3E%3Cpath d=\'M0,0 L3,3 L0,6\' stroke=\'%233d3d3d\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
                        backgroundSize: '6px 6px'
                      }}>
                <Play className="w-5 h-5 text-white/60 group-hover:text-white/80" />
                <span className="text-[10px] text-white/40 mt-1">PLAY</span>
              </button>

              {/* DELETE Button */}
              <button className="group relative w-16 h-16 bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-xl shadow-[0_4px_0_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.05),inset_0_-2px_4px_rgba(0,0,0,0.3)] hover:shadow-[0_2px_0_rgba(0,0,0,0.5),inset_0_3px_6px_rgba(0,0,0,0.5)] hover:translate-y-1 active:shadow-[0_0_0_rgba(0,0,0,0.5),inset_0_4px_8px_rgba(0,0,0,0.7)] active:translate-y-2 transition-all duration-75 border border-white/5 flex flex-col items-center justify-center"
                      style={{ 
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'6\' height=\'6\' fill=\'%232d2d2d\'/%3E%3Cpath d=\'M0,0 L3,3 L0,6\' stroke=\'%233d3d3d\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
                        backgroundSize: '6px 6px'
                      }}>
                <Trash2 className="w-5 h-5 text-white/60 group-hover:text-red-400" />
                <span className="text-[10px] text-white/40 mt-1">DELETE</span>
              </button>

              {/* MENU/CLOSE Button */}
              <button 
                onClick={() => setOpen(false)}
                className="group relative w-16 h-16 bg-gradient-to-b from-[#2d2d2d] to-[#1a1a1a] rounded-xl shadow-[0_4px_0_rgba(0,0,0,0.5),inset_0_2px_2px_rgba(255,255,255,0.05),inset_0_-2px_4px_rgba(0,0,0,0.3)] hover:shadow-[0_2px_0_rgba(0,0,0,0.5),inset_0_3px_6px_rgba(0,0,0,0.5)] hover:translate-y-1 active:shadow-[0_0_0_rgba(0,0,0,0.5),inset_0_4px_8px_rgba(0,0,0,0.7)] active:translate-y-2 transition-all duration-75 border border-white/5 flex flex-col items-center justify-center"
                style={{ 
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect width=\'6\' height=\'6\' fill=\'%232d2d2d\'/%3E%3Cpath d=\'M0,0 L3,3 L0,6\' stroke=\'%233d3d3d\' stroke-width=\'0.5\' fill=\'none\'/%3E%3C/svg%3E")',
                  backgroundSize: '6px 6px'
                }}
              >
                <Menu className="w-5 h-5 text-white/60 group-hover:text-white/80" />
                <span className="text-[10px] text-white/40 mt-1">MENU</span>
              </button>
            </div>

            {/* LENS MOUNT RING DETAIL (optional visual accent) */}
            <div className="absolute bottom-20 right-24 w-20 h-20 rounded-full border-4 border-white/5 shadow-[inset_0_0_20px_rgba(0,0,0,0.8),0_0_30px_rgba(255,255,255,0.02)]"
                 style={{ 
                   background: 'radial-gradient(circle, #1a1a1a 0%, #0f0f0f 50%, #000000 100%)'
                 }}>
              <div className="absolute inset-2 rounded-full border border-white/10"></div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
