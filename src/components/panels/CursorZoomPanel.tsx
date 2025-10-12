import { useState, useEffect, useRef } from "react";
import { ZoomIn, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface CursorZoomPanelProps {
  canvasRef?: React.RefObject<HTMLCanvasElement>;
}

export const CursorZoomPanel = ({ canvasRef }: CursorZoomPanelProps) => {
  const [zoom, setZoom] = useState(200); // 200% default
  const [bufferZone, setBufferZone] = useState(50); // pixels
  const [showBufferBorder, setShowBufferBorder] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });
  const zoomCanvasRef = useRef<HTMLCanvasElement>(null);

  const PANEL_SIZE = 200;
  const BUFFER_THRESHOLD = bufferZone;

  useEffect(() => {
    if (!canvasRef?.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setCursorPosition({ x, y });

      // Buffered follow logic
      const dx = x - panelPosition.x;
      const dy = y - panelPosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > BUFFER_THRESHOLD) {
        // Smooth dampening
        setPanelPosition({
          x: panelPosition.x + dx * 0.1,
          y: panelPosition.y + dy * 0.1,
        });
      }

      // Update zoom canvas
      if (zoomCanvasRef.current) {
        const ctx = zoomCanvasRef.current.getContext('2d');
        const mainCtx = canvasRef.current!.getContext('2d');
        
        if (ctx && mainCtx) {
          const sourceSize = PANEL_SIZE / (zoom / 100);
          const sourceX = x - sourceSize / 2;
          const sourceY = y - sourceSize / 2;

          ctx.clearRect(0, 0, PANEL_SIZE, PANEL_SIZE);
          
          try {
            ctx.drawImage(
              canvasRef.current!,
              sourceX, sourceY, sourceSize, sourceSize,
              0, 0, PANEL_SIZE, PANEL_SIZE
            );
          } catch (e) {
            // Handle edge cases
          }

          // Draw crosshair
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(PANEL_SIZE / 2, 0);
          ctx.lineTo(PANEL_SIZE / 2, PANEL_SIZE);
          ctx.moveTo(0, PANEL_SIZE / 2);
          ctx.lineTo(PANEL_SIZE, PANEL_SIZE / 2);
          ctx.stroke();

          // Draw buffer zone indicator
          if (showBufferBorder) {
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
            ctx.lineWidth = 2;
            ctx.strokeRect(
              PANEL_SIZE / 2 - BUFFER_THRESHOLD / 2,
              PANEL_SIZE / 2 - BUFFER_THRESHOLD / 2,
              BUFFER_THRESHOLD,
              BUFFER_THRESHOLD
            );
          }
        }
      }
    };

    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [canvasRef, zoom, bufferZone, showBufferBorder, panelPosition]);

  return (
    <div className="camera-panel p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ZoomIn className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-mono font-semibold">CURSOR ZOOM</span>
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
                <Label className="text-xs text-muted-foreground font-mono">BUFFER ZONE</Label>
                <Slider
                  value={[bufferZone]}
                  onValueChange={(val) => setBufferZone(val[0])}
                  max={100}
                  step={5}
                  className="mt-2"
                />
                <div className="text-right text-xs text-muted-foreground mt-1">
                  {bufferZone}px
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-xs text-muted-foreground font-mono">SHOW BUFFER</Label>
                <Switch
                  checked={showBufferBorder}
                  onCheckedChange={setShowBufferBorder}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="border border-border rounded bg-viewfinder relative">
        <canvas
          ref={zoomCanvasRef}
          width={PANEL_SIZE}
          height={PANEL_SIZE}
          className="w-full h-full"
        />
      </div>

      <div>
        <Label className="text-xs text-muted-foreground font-mono">ZOOM LEVEL</Label>
        <Slider
          value={[zoom]}
          onValueChange={(val) => setZoom(val[0])}
          min={100}
          max={800}
          step={50}
          className="mt-2"
        />
        <div className="text-right text-xs text-muted-foreground mt-1">
          {zoom}%
        </div>
      </div>

      <div className="text-xs text-muted-foreground font-mono text-center">
        {cursorPosition.x.toFixed(0)}, {cursorPosition.y.toFixed(0)}
      </div>
    </div>
  );
};
