import { useRef, useEffect, useState } from "react";
import { Upload, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface MainCanvasProps {
  activeTool: string;
  isProcessing: boolean;
}

export const MainCanvas = ({ activeTool, isProcessing }: MainCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasImage, setHasImage] = useState(false);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize canvas
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw placeholder grid
    if (!hasImage) {
      ctx.strokeStyle = 'hsl(var(--border))';
      ctx.lineWidth = 1;
      
      const gridSize = 20;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }
  }, [hasImage]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        // Calculate scaling to fit image
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        setHasImage(true);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex-1 relative bg-viewfinder border border-border m-4 rounded-lg overflow-hidden">
      {/* Canvas Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button 
          className="camera-button p-2 backdrop-blur-sm"
          onClick={() => setZoom(Math.min(zoom + 25, 400))}
        >
          <ZoomIn size={16} />
        </button>
        <div className="lcd-display px-2 py-1 backdrop-blur-sm">
          <span className="text-lcd">{zoom}%</span>
        </div>
        <button 
          className="camera-button p-2 backdrop-blur-sm"
          onClick={() => setZoom(Math.max(zoom - 25, 25))}
        >
          <ZoomOut size={16} />
        </button>
        <button 
          className="camera-button p-2 backdrop-blur-sm"
          onClick={() => setZoom(100)}
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full cursor-${activeTool === 'brush' ? 'crosshair' : 'default'}`}
        style={{ 
          transform: `scale(${zoom / 100})`,
          transformOrigin: 'center center'
        }}
      />

      {/* Upload Overlay */}
      {!hasImage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <label className="cursor-pointer group">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="camera-panel p-8 rounded-lg text-center group-hover:scale-105 transition-transform">
              <Upload size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Upload Image</h3>
              <p className="text-muted-foreground">
                Drag & drop or click to select an image
              </p>
            </div>
          </label>
        </div>
      )}

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
          <div className="camera-panel p-6 rounded-lg text-center">
            <div className="status-indicator status-processing w-4 h-4 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Processing Image</h3>
            <p className="text-muted-foreground">AI is working on your image...</p>
          </div>
        </div>
      )}
    </div>
  );
};