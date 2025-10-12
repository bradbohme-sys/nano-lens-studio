import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

interface ToolSettings {
  [key: string]: any;
}

interface LeftSettingsPanelProps {
  activeTool: string;
  onCollapse: (collapsed: boolean) => void;
  collapsed?: boolean;
}

export const LeftSettingsPanel = ({ 
  activeTool, 
  onCollapse,
  collapsed = false 
}: LeftSettingsPanelProps) => {
  const [toolSettings, setToolSettings] = useState<ToolSettings>({
    lasso: {
      snapRadius: 20,
      curveTension: 0.5,
      aiEnhancement: true,
      smartSimplify: true,
      simplifyTolerance: 2,
    },
    brush: {
      size: 50,
      hardness: 80,
      opacity: 100,
      flow: 100,
      spacing: 25,
    },
    selection: {
      feather: 0,
      tolerance: 32,
      antiAlias: true,
      contiguous: true,
    },
    eraser: {
      size: 50,
      hardness: 100,
      opacity: 100,
      mode: 'erase',
    },
  });

  const updateSetting = (tool: string, key: string, value: any) => {
    setToolSettings(prev => ({
      ...prev,
      [tool]: {
        ...prev[tool],
        [key]: value,
      },
    }));
  };

  const renderToolSettings = () => {
    const settings = toolSettings[activeTool] || {};

    switch (activeTool) {
      case 'lasso':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground font-mono">SNAP RADIUS</Label>
              <Slider
                value={[settings.snapRadius || 20]}
                onValueChange={(val) => updateSetting('lasso', 'snapRadius', val[0])}
                max={50}
                step={1}
                className="mt-2"
              />
              <div className="text-right text-xs text-muted-foreground mt-1">
                {settings.snapRadius}px
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground font-mono">CURVE TENSION</Label>
              <Slider
                value={[settings.curveTension * 100 || 50]}
                onValueChange={(val) => updateSetting('lasso', 'curveTension', val[0] / 100)}
                max={100}
                step={1}
                className="mt-2"
              />
              <div className="text-right text-xs text-muted-foreground mt-1">
                {settings.curveTension?.toFixed(2)}
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground font-mono">SIMPLIFY TOLERANCE</Label>
              <Slider
                value={[settings.simplifyTolerance || 2]}
                onValueChange={(val) => updateSetting('lasso', 'simplifyTolerance', val[0])}
                max={10}
                step={0.5}
                className="mt-2"
              />
              <div className="text-right text-xs text-muted-foreground mt-1">
                {settings.simplifyTolerance}
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground font-mono">AI ENHANCEMENT</Label>
              <Switch
                checked={settings.aiEnhancement}
                onCheckedChange={(val) => updateSetting('lasso', 'aiEnhancement', val)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground font-mono">SMART SIMPLIFY</Label>
              <Switch
                checked={settings.smartSimplify}
                onCheckedChange={(val) => updateSetting('lasso', 'smartSimplify', val)}
              />
            </div>
          </div>
        );

      case 'brush':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground font-mono">BRUSH SIZE</Label>
              <Slider
                value={[settings.size || 50]}
                onValueChange={(val) => updateSetting('brush', 'size', val[0])}
                max={500}
                step={1}
                className="mt-2"
              />
              <div className="text-right text-xs text-muted-foreground mt-1">
                {settings.size}px
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground font-mono">HARDNESS</Label>
              <Slider
                value={[settings.hardness || 80]}
                onValueChange={(val) => updateSetting('brush', 'hardness', val[0])}
                max={100}
                step={1}
                className="mt-2"
              />
              <div className="text-right text-xs text-muted-foreground mt-1">
                {settings.hardness}%
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground font-mono">OPACITY</Label>
              <Slider
                value={[settings.opacity || 100]}
                onValueChange={(val) => updateSetting('brush', 'opacity', val[0])}
                max={100}
                step={1}
                className="mt-2"
              />
              <div className="text-right text-xs text-muted-foreground mt-1">
                {settings.opacity}%
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground font-mono">FLOW</Label>
              <Slider
                value={[settings.flow || 100]}
                onValueChange={(val) => updateSetting('brush', 'flow', val[0])}
                max={100}
                step={1}
                className="mt-2"
              />
              <div className="text-right text-xs text-muted-foreground mt-1">
                {settings.flow}%
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground font-mono">SPACING</Label>
              <Slider
                value={[settings.spacing || 25]}
                onValueChange={(val) => updateSetting('brush', 'spacing', val[0])}
                max={100}
                step={1}
                className="mt-2"
              />
              <div className="text-right text-xs text-muted-foreground mt-1">
                {settings.spacing}%
              </div>
            </div>
          </div>
        );

      case 'selection':
        return (
          <div className="space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground font-mono">FEATHER</Label>
              <Slider
                value={[settings.feather || 0]}
                onValueChange={(val) => updateSetting('selection', 'feather', val[0])}
                max={250}
                step={1}
                className="mt-2"
              />
              <div className="text-right text-xs text-muted-foreground mt-1">
                {settings.feather}px
              </div>
            </div>

            <div>
              <Label className="text-xs text-muted-foreground font-mono">TOLERANCE</Label>
              <Slider
                value={[settings.tolerance || 32]}
                onValueChange={(val) => updateSetting('selection', 'tolerance', val[0])}
                max={255}
                step={1}
                className="mt-2"
              />
              <div className="text-right text-xs text-muted-foreground mt-1">
                {settings.tolerance}
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground font-mono">ANTI-ALIAS</Label>
              <Switch
                checked={settings.antiAlias}
                onCheckedChange={(val) => updateSetting('selection', 'antiAlias', val)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground font-mono">CONTIGUOUS</Label>
              <Switch
                checked={settings.contiguous}
                onCheckedChange={(val) => updateSetting('selection', 'contiguous', val)}
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-sm text-muted-foreground text-center py-8">
            Select a tool to view settings
          </div>
        );
    }
  };

  if (collapsed) {
    return (
      <div className="w-12 camera-panel border-r border-border flex flex-col items-center py-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCollapse(false)}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="w-64 camera-panel border-r border-border flex flex-col">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <h2 className="font-semibold font-mono text-sm">TOOL SETTINGS</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCollapse(true)}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="text-xs font-mono text-muted-foreground mb-4">
            {activeTool.toUpperCase()}
          </div>
          {renderToolSettings()}
        </div>
      </ScrollArea>
    </div>
  );
};
