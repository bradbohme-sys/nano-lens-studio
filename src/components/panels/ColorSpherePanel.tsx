import { useState } from "react";
import { Palette, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ColorSpherePanel = () => {
  const [selectedColor, setSelectedColor] = useState({ h: 200, s: 80, l: 50 });
  const [colorMode, setColorMode] = useState<'HSL' | 'RGB' | 'LAB'>('HSL');
  const [lightSimulation, setLightSimulation] = useState<'none' | 'D65' | 'tungsten' | 'fluorescent'>('none');
  const [sphereRotation, setSphereRotation] = useState({ x: 0, y: 0 });

  const hslToRgb = (h: number, s: number, l: number) => {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return {
      r: Math.round(255 * f(0)),
      g: Math.round(255 * f(8)),
      b: Math.round(255 * f(4)),
    };
  };

  const rgb = hslToRgb(selectedColor.h, selectedColor.s, selectedColor.l);

  const updateHSL = (key: 'h' | 's' | 'l', value: number) => {
    setSelectedColor(prev => ({ ...prev, [key]: value }));
  };

  const updateRGB = (key: 'r' | 'g' | 'b', value: number) => {
    // Convert RGB to HSL (simplified)
    const r = key === 'r' ? value / 255 : rgb.r / 255;
    const g = key === 'g' ? value / 255 : rgb.g / 255;
    const b = key === 'b' ? value / 255 : rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;

    if (max === min) {
      setSelectedColor({ h: 0, s: 0, l: l * 100 });
    } else {
      const d = max - min;
      const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      let h = 0;

      if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      else if (max === g) h = ((b - r) / d + 2) / 6;
      else h = ((r - g) / d + 4) / 6;

      setSelectedColor({ h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) });
    }
  };

  return (
    <div className="camera-panel p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Palette className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-mono font-semibold">COLOR SPHERE</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0"
          onClick={() => setSphereRotation({ x: 0, y: 0 })}
        >
          <RotateCw className="h-3 w-3" />
        </Button>
      </div>

      {/* 3D Color Sphere Visualization */}
      <div className="relative aspect-square border border-border rounded bg-viewfinder overflow-hidden">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 40% 40%, 
              hsl(${selectedColor.h}, ${selectedColor.s}%, ${Math.min(selectedColor.l + 30, 100)}%), 
              hsl(${selectedColor.h}, ${selectedColor.s}%, ${selectedColor.l}%) 50%, 
              hsl(${selectedColor.h}, ${selectedColor.s}%, ${Math.max(selectedColor.l - 30, 0)}%) 70%,
              hsl(0, 0%, 0%) 100%)`,
          }}
        />
        
        {/* Selected color indicator */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-white shadow-lg"
          style={{
            background: `hsl(${selectedColor.h}, ${selectedColor.s}%, ${selectedColor.l}%)`,
          }}
        />

        {/* Light simulation overlay */}
        {lightSimulation !== 'none' && (
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute inset-0"
              style={{
                background:
                  lightSimulation === 'tungsten'
                    ? 'radial-gradient(circle at 30% 30%, rgba(255, 200, 100, 0.2), transparent)'
                    : lightSimulation === 'fluorescent'
                    ? 'radial-gradient(circle at 30% 30%, rgba(200, 220, 255, 0.2), transparent)'
                    : 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.1), transparent)',
              }}
            />
          </div>
        )}
      </div>

      {/* Color Mode Tabs */}
      <Tabs value={colorMode} onValueChange={(val) => setColorMode(val as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="HSL" className="text-xs">HSL</TabsTrigger>
          <TabsTrigger value="RGB" className="text-xs">RGB</TabsTrigger>
          <TabsTrigger value="LAB" className="text-xs">LAB</TabsTrigger>
        </TabsList>

        <TabsContent value="HSL" className="space-y-3 mt-4">
          <div>
            <Label className="text-xs text-muted-foreground font-mono">HUE</Label>
            <Slider
              value={[selectedColor.h]}
              onValueChange={(val) => updateHSL('h', val[0])}
              max={360}
              step={1}
              className="mt-2"
            />
            <div className="text-right text-xs text-muted-foreground mt-1">{selectedColor.h}°</div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground font-mono">SATURATION</Label>
            <Slider
              value={[selectedColor.s]}
              onValueChange={(val) => updateHSL('s', val[0])}
              max={100}
              step={1}
              className="mt-2"
            />
            <div className="text-right text-xs text-muted-foreground mt-1">{selectedColor.s}%</div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground font-mono">LIGHTNESS</Label>
            <Slider
              value={[selectedColor.l]}
              onValueChange={(val) => updateHSL('l', val[0])}
              max={100}
              step={1}
              className="mt-2"
            />
            <div className="text-right text-xs text-muted-foreground mt-1">{selectedColor.l}%</div>
          </div>
        </TabsContent>

        <TabsContent value="RGB" className="space-y-3 mt-4">
          <div>
            <Label className="text-xs text-muted-foreground font-mono">RED</Label>
            <Slider
              value={[rgb.r]}
              onValueChange={(val) => updateRGB('r', val[0])}
              max={255}
              step={1}
              className="mt-2"
            />
            <div className="text-right text-xs text-muted-foreground mt-1">{rgb.r}</div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground font-mono">GREEN</Label>
            <Slider
              value={[rgb.g]}
              onValueChange={(val) => updateRGB('g', val[0])}
              max={255}
              step={1}
              className="mt-2"
            />
            <div className="text-right text-xs text-muted-foreground mt-1">{rgb.g}</div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground font-mono">BLUE</Label>
            <Slider
              value={[rgb.b]}
              onValueChange={(val) => updateRGB('b', val[0])}
              max={255}
              step={1}
              className="mt-2"
            />
            <div className="text-right text-xs text-muted-foreground mt-1">{rgb.b}</div>
          </div>
        </TabsContent>

        <TabsContent value="LAB" className="space-y-3 mt-4">
          <div className="text-xs text-muted-foreground text-center py-4">
            LAB color space (perceptually uniform)
          </div>
        </TabsContent>
      </Tabs>

      {/* Light Simulation */}
      <div>
        <Label className="text-xs text-muted-foreground font-mono">LIGHT SIMULATION</Label>
        <Select value={lightSimulation} onValueChange={(val: any) => setLightSimulation(val)}>
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="D65">D65 Daylight</SelectItem>
            <SelectItem value="tungsten">Tungsten</SelectItem>
            <SelectItem value="fluorescent">Fluorescent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Current Color Display */}
      <div className="flex items-center justify-between p-3 border border-border rounded">
        <div
          className="w-12 h-12 rounded border border-border"
          style={{
            background: `hsl(${selectedColor.h}, ${selectedColor.s}%, ${selectedColor.l}%)`,
          }}
        />
        <div className="text-xs font-mono text-muted-foreground">
          <div>HSL({selectedColor.h}, {selectedColor.s}%, {selectedColor.l}%)</div>
          <div>RGB({rgb.r}, {rgb.g}, {rgb.b})</div>
        </div>
      </div>
    </div>
  );
};
