import { useState } from "react";
import { Wand2, Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SelectionToolsProps {
  onSettingsChange?: (settings: MagicWandSettings) => void;
}

interface MagicWandSettings {
  tolerance: number;
  searchRadius: number;
  edgeThreshold: number;
  searchType: string;
  mode: 'copy' | 'transparency' | 'cut';
  showPreview: boolean;
}

export const SelectionTools = ({ onSettingsChange }: SelectionToolsProps) => {
  const [tolerance, setTolerance] = useState(32);
  const [searchRadius, setSearchRadius] = useState(10);
  const [edgeThreshold, setEdgeThreshold] = useState(50);
  const [searchType, setSearchType] = useState('rgb');
  const [mode, setMode] = useState<'copy' | 'transparency' | 'cut'>('copy');
  const [showPreview, setShowPreview] = useState(true);

  const handleSettingChange = () => {
    onSettingsChange?.({
      tolerance,
      searchRadius,
      edgeThreshold,
      searchType,
      mode,
      showPreview
    });
  };

  return (
    <div className="flex-1 camera-panel p-4 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold font-mono flex items-center gap-2">
          <Wand2 className="h-4 w-4" />
          MAGIC WAND
        </h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs text-muted-foreground font-mono">
                TOLERANCE: {tolerance}
              </Label>
              <div className="h-1 w-20 bg-gradient-to-r from-primary/20 to-primary rounded" 
                   style={{ width: `${(tolerance / 255) * 80}px` }} />
            </div>
            <Slider
              value={[tolerance]}
              onValueChange={(value) => {
                setTolerance(value[0]);
                handleSettingChange();
              }}
              max={255}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground font-mono">
              SEARCH RADIUS: {searchRadius}px
            </Label>
            <Slider
              value={[searchRadius]}
              onValueChange={(value) => {
                setSearchRadius(value[0]);
                handleSettingChange();
              }}
              max={50}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground font-mono">
              EDGE THRESHOLD: {edgeThreshold}%
            </Label>
            <Slider
              value={[edgeThreshold]}
              onValueChange={(value) => {
                setEdgeThreshold(value[0]);
                handleSettingChange();
              }}
              max={100}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground font-mono">SEARCH TYPE</Label>
            <Select value={searchType} onValueChange={(value) => {
              setSearchType(value);
              handleSettingChange();
            }}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rgb">RGB</SelectItem>
                <SelectItem value="hsv">HSV</SelectItem>
                <SelectItem value="lab">LAB</SelectItem>
                <SelectItem value="luminance">Luminance</SelectItem>
                <SelectItem value="hue">Hue Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground font-mono">MODE</Label>
            <Select value={mode} onValueChange={(value: any) => {
              setMode(value);
              handleSettingChange();
            }}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="copy">Copy (New Layer)</SelectItem>
                <SelectItem value="transparency">Transparency (Modifier)</SelectItem>
                <SelectItem value="cut">Cut (Copy + Transparency)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between pt-2">
            <Label className="text-xs text-muted-foreground font-mono">SHOW PREVIEW</Label>
            <Switch 
              checked={showPreview}
              onCheckedChange={(checked) => {
                setShowPreview(checked);
                handleSettingChange();
              }}
            />
          </div>

          <div className="pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground font-mono mb-3">CONTROLS</div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Click</span>
                <span className="font-mono">Create segment</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shift+Click</span>
                <span className="font-mono">Add to layer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Alt+Shift+Click</span>
                <span className="font-mono">Remove segment</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Scroll (hover)</span>
                <span className="font-mono">Adjust tolerance</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
