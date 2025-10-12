import { useState, useEffect, useRef } from "react";
import { Microscope, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface MicroscopePanelProps {
  canvasRef?: React.RefObject<HTMLCanvasElement>;
  activeTool?: string;
}

export const MicroscopePanel = ({ canvasRef, activeTool }: MicroscopePanelProps) => {
  const [pixelSize, setPixelSize] = useState(40); // 40x40 pixels default
  const [centerFollow, setCenterFollow] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showDiagnostics, setShowDiagnostics] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const microscopeCanvasRef = useRef<HTMLCanvasElement>(null);

  const PANEL_SIZE = 200;

  useEffect(() => {
    if (!canvasRef?.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setCursorPosition({ x, y });

      // Update microscope view
      if (microscopeCanvasRef.current) {
        const ctx = microscopeCanvasRef.current.getContext('2d');
        const mainCtx = canvasRef.current!.getContext('2d');
        
        if (ctx && mainCtx) {
          const halfSize = pixelSize / 2;
          const sourceX = Math.floor(x - halfSize);
          const sourceY = Math.floor(y - halfSize);

          ctx.clearRect(0, 0, PANEL_SIZE, PANEL_SIZE);
          
          // Disable image smoothing for pixel-perfect view
          ctx.imageSmoothingEnabled = false;

          try {
            ctx.drawImage(
              canvasRef.current!,
              sourceX, sourceY, pixelSize, pixelSize,
              0, 0, PANEL_SIZE, PANEL_SIZE
            );
          } catch (e) {
            // Handle edge cases
          }

          // Draw pixel grid
          if (showGrid) {
            const pixelsPerUnit = PANEL_SIZE / pixelSize;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 1;

            for (let i = 0; i <= pixelSize; i++) {
              const pos = i * pixelsPerUnit;
              // Vertical lines
              ctx.beginPath();
              ctx.moveTo(pos, 0);
              ctx.lineTo(pos, PANEL_SIZE);
              ctx.stroke();
              // Horizontal lines
              ctx.beginPath();
              ctx.moveTo(0, pos);
              ctx.lineTo(PANEL_SIZE, pos);
              ctx.stroke();
            }
          }

          // Draw center crosshair
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(PANEL_SIZE / 2, PANEL_SIZE / 2 - 10);
          ctx.lineTo(PANEL_SIZE / 2, PANEL_SIZE / 2 + 10);
          ctx.moveTo(PANEL_SIZE / 2 - 10, PANEL_SIZE / 2);
          ctx.lineTo(PANEL_SIZE / 2 + 10, PANEL_SIZE / 2);
          ctx.stroke();

          // Draw diagnostic overlays for tools
          if (showDiagnostics) {
            if (activeTool === 'wand' || activeTool === 'selection') {
              // Show search radius
              const searchRadius = 20; // Example
              const radiusInPixels = (searchRadius / pixelSize) * PANEL_SIZE;
              
              ctx.strokeStyle = 'rgba(59, 130, 246, 0.6)';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.arc(PANEL_SIZE / 2, PANEL_SIZE / 2, radiusInPixels, 0, Math.PI * 2);
              ctx.stroke();

              // Draw pixel candidates
              ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
              const pixelsPerUnit = PANEL_SIZE / pixelSize;
              for (let i = 0; i < pixelSize; i++) {
                for (let j = 0; j < pixelSize; j++) {
                  const dx = i - pixelSize / 2;
                  const dy = j - pixelSize / 2;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  
                  if (distance < searchRadius) {
                    ctx.fillRect(
                      i * pixelsPerUnit,
                      j * pixelsPerUnit,
                      pixelsPerUnit,
                      pixelsPerUnit
                    );
                  }
                }
              }
            }

            if (activeTool === 'lasso') {
              // Show magnetic forces
              ctx.strokeStyle = 'rgba(34, 197, 94, 0.6)';
              ctx.lineWidth = 1;
              
              // Draw example magnetic pull vectors
              for (let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                const force = 30; // Example force
                ctx.beginPath();
                ctx.moveTo(PANEL_SIZE / 2, PANEL_SIZE / 2);
                ctx.lineTo(
                  PANEL_SIZE / 2 + Math.cos(angle) * force,
                  PANEL_SIZE / 2 + Math.sin(angle) * force
                );
                ctx.stroke();
              }
            }
          }
        }
      }
    };

    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [canvasRef, pixelSize, showGrid, showDiagnostics, activeTool, centerFollow]);

  return (
    <div className="camera-panel p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Microscope className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-mono font-semibold">MICROSCOPE</span>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Settings className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64" side="left">
            <div className="space-y-3">
              <div>
                <Label className="text-xs text-muted-foreground font-mono">VIEW SIZE</Label>
                <Slider
                  value={[pixelSize]}
                  onValueChange={(val) => setPixelSize(val[0])}
                  min={10}
                  max={100}
                  step={5}
                  className="mt-2"
                />
                <div className="text-right text-xs text-muted-foreground mt-1">
                  {pixelSize}x{pixelSize} px
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground font-mono">CENTER FOLLOW</Label>
                <Switch
                  checked={centerFollow}
                  onCheckedChange={setCenterFollow}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground font-mono">PIXEL GRID</Label>
                <Switch
                  checked={showGrid}
                  onCheckedChange={setShowGrid}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground font-mono">DIAGNOSTICS</Label>
                <Switch
                  checked={showDiagnostics}
                  onCheckedChange={setShowDiagnostics}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="border border-border rounded bg-viewfinder relative">
        <canvas
          ref={microscopeCanvasRef}
          width={PANEL_SIZE}
          height={PANEL_SIZE}
          className="w-full h-full"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      <div className="space-y-1 text-xs font-mono text-muted-foreground">
        <div>Position: {Math.floor(cursorPosition.x)}, {Math.floor(cursorPosition.y)}</div>
        <div>View: {pixelSize}x{pixelSize}px</div>
        {activeTool && <div className="text-primary">Tool: {activeTool.toUpperCase()}</div>}
      </div>
    </div>
  );
};
