import { useState } from "react";
import { Lasso } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LassoToolProps {
  onSettingsChange?: (settings: LassoSettings) => void;
}

interface LassoSettings {
  mode: 'freehand' | 'polygonal' | 'hybrid' | 'magic';
  curveTension: number;
  snapRadius: number;
  edgeThreshold: number;
  directionalStrength: number;
  cursorInfluence: number;
  traceInfluence: number;
  wandSearchType: string;
  smoothingWeight: number;
  pinInterval: number;
  simplifyTolerance: number;
  autoSimplify: boolean;
}

export const LassoTool = ({ onSettingsChange }: LassoToolProps) => {
  const [mode, setMode] = useState<'freehand' | 'polygonal' | 'hybrid' | 'magic'>('freehand');
  const [curveTension, setCurveTension] = useState(50);
  const [snapRadius, setSnapRadius] = useState(10);
  const [edgeThreshold, setEdgeThreshold] = useState(50);
  const [directionalStrength, setDirectionalStrength] = useState(50);
  const [cursorInfluence, setCursorInfluence] = useState(70);
  const [traceInfluence, setTraceInfluence] = useState(30);
  const [wandSearchType, setWandSearchType] = useState('rgb');
  const [smoothingWeight, setSmoothingWeight] = useState(50);
  const [pinInterval, setPinInterval] = useState(50);
  const [simplifyTolerance, setSimplifyTolerance] = useState(5);
  const [autoSimplify, setAutoSimplify] = useState(true);

  const handleSettingChange = () => {
    onSettingsChange?.({
      mode,
      curveTension,
      snapRadius,
      edgeThreshold,
      directionalStrength,
      cursorInfluence,
      traceInfluence,
      wandSearchType,
      smoothingWeight,
      pinInterval,
      simplifyTolerance,
      autoSimplify
    });
  };

  return (
    <div className="flex-1 camera-panel p-4 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold font-mono flex items-center gap-2">
          <Lasso className="h-4 w-4" />
          LASSO TOOL
        </h2>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-4">
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
                <SelectItem value="freehand">Freehand</SelectItem>
                <SelectItem value="polygonal">Polygonal</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="magic">Magic (Wand)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground font-mono">
              CURVE TENSION: {curveTension}%
            </Label>
            <Slider
              value={[curveTension]}
              onValueChange={(value) => {
                setCurveTension(value[0]);
                handleSettingChange();
              }}
              max={100}
              step={1}
              className="mt-2"
            />
          </div>

          {mode === 'magic' && (
            <>
              <div>
                <Label className="text-xs text-muted-foreground font-mono">
                  SNAP RADIUS: {snapRadius}px
                </Label>
                <Slider
                  value={[snapRadius]}
                  onValueChange={(value) => {
                    setSnapRadius(value[0]);
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
                <Label className="text-xs text-muted-foreground font-mono">
                  DIRECTIONAL STRENGTH: {directionalStrength}%
                </Label>
                <Slider
                  value={[directionalStrength]}
                  onValueChange={(value) => {
                    setDirectionalStrength(value[0]);
                    handleSettingChange();
                  }}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground font-mono">
                  CURSOR INFLUENCE: {cursorInfluence}%
                </Label>
                <Slider
                  value={[cursorInfluence]}
                  onValueChange={(value) => {
                    setCursorInfluence(value[0]);
                    handleSettingChange();
                  }}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground font-mono">
                  TRACE INFLUENCE: {traceInfluence}%
                </Label>
                <Slider
                  value={[traceInfluence]}
                  onValueChange={(value) => {
                    setTraceInfluence(value[0]);
                    handleSettingChange();
                  }}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-xs text-muted-foreground font-mono">WAND SEARCH TYPE</Label>
                <Select value={wandSearchType} onValueChange={(value) => {
                  setWandSearchType(value);
                  handleSettingChange();
                }}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rgb">RGB</SelectItem>
                    <SelectItem value="hsv">HSV</SelectItem>
                    <SelectItem value="lab">LAB</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div>
            <Label className="text-xs text-muted-foreground font-mono">
              SMOOTHING WEIGHT: {smoothingWeight}%
            </Label>
            <Slider
              value={[smoothingWeight]}
              onValueChange={(value) => {
                setSmoothingWeight(value[0]);
                handleSettingChange();
              }}
              max={100}
              step={1}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground font-mono">
              PIN INTERVAL: {pinInterval}ms
            </Label>
            <Slider
              value={[pinInterval]}
              onValueChange={(value) => {
                setPinInterval(value[0]);
                handleSettingChange();
              }}
              max={200}
              step={10}
              className="mt-2"
            />
          </div>

          <div>
            <Label className="text-xs text-muted-foreground font-mono">
              SIMPLIFY TOLERANCE: {simplifyTolerance}px
            </Label>
            <Slider
              value={[simplifyTolerance]}
              onValueChange={(value) => {
                setSimplifyTolerance(value[0]);
                handleSettingChange();
              }}
              max={20}
              step={1}
              className="mt-2"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <Label className="text-xs text-muted-foreground font-mono">AUTO SIMPLIFY</Label>
            <Switch 
              checked={autoSimplify}
              onCheckedChange={(checked) => {
                setAutoSimplify(checked);
                handleSettingChange();
              }}
            />
          </div>

          <div className="pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground font-mono mb-3">CONTROLS</div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Right-Click</span>
                <span className="font-mono">Start line/Drop pin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Backspace</span>
                <span className="font-mono">Remove last pin</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Esc/Delete</span>
                <span className="font-mono">Cancel lasso</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ctrl+Drag</span>
                <span className="font-mono">Adjust pins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Alt+Click</span>
                <span className="font-mono">Remove pin</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};
