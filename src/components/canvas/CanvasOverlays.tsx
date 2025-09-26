import { useState } from "react";
import { Move, RotateCcw, Scale, Lightbulb, User, Mountain } from "lucide-react";

interface CanvasOverlaysProps {
  activeTool: string;
  hasImage: boolean;
}

export const CanvasOverlays = ({ activeTool, hasImage }: CanvasOverlaysProps) => {
  const [showGuides, setShowGuides] = useState(true);

  if (!hasImage) return null;

  return (
    <>
      {/* Movement Grid Overlay */}
      {showGuides && (activeTool === 'move' || activeTool === 'select') && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Grid lines */}
          <div className="w-full h-full relative">
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-30">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border border-primary/50"></div>
              ))}
            </div>
            
            {/* Center crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-8 h-px bg-primary"></div>
              <div className="h-8 w-px bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>
      )}

      {/* Rotation Guides */}
      {showGuides && activeTool === 'rotate' && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative">
            {/* Rotation circle */}
            <div className="w-48 h-48 border-2 border-primary/50 rounded-full relative">
              {/* Rotation markers */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * 45) - 90;
                const radian = (angle * Math.PI) / 180;
                const x = Math.cos(radian) * 96;
                const y = Math.sin(radian) * 96;
                
                return (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-full"
                    style={{
                      left: `calc(50% + ${x}px - 4px)`,
                      top: `calc(50% + ${y}px - 4px)`,
                    }}
                  />
                );
              })}
              
              {/* Center point */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"></div>
            </div>
            
            {/* Rotation angle indicator */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 camera-panel px-2 py-1 rounded">
              <span className="text-xs font-mono">0°</span>
            </div>
          </div>
        </div>
      )}

      {/* Scale Guides */}
      {showGuides && activeTool === 'scale' && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Scale handles at corners and edges */}
          <div className="absolute top-2 left-2 w-3 h-3 bg-primary border-2 border-background rounded-sm"></div>
          <div className="absolute top-2 right-2 w-3 h-3 bg-primary border-2 border-background rounded-sm"></div>
          <div className="absolute bottom-2 left-2 w-3 h-3 bg-primary border-2 border-background rounded-sm"></div>
          <div className="absolute bottom-2 right-2 w-3 h-3 bg-primary border-2 border-background rounded-sm"></div>
          
          {/* Edge handles */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent border-2 border-background rounded-sm"></div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-accent border-2 border-background rounded-sm"></div>
          <div className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-accent border-2 border-background rounded-sm"></div>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 bg-accent border-2 border-background rounded-sm"></div>
          
          {/* Scale indicator */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 camera-panel px-2 py-1 rounded">
            <span className="text-xs font-mono">100%</span>
          </div>
        </div>
      )}

      {/* Character Positioning Overlay */}
      {showGuides && activeTool === 'character' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-8 h-8 border-2 border-accent rounded-full flex items-center justify-center">
            <User size={16} className="text-accent" />
          </div>
          <div className="absolute top-1/4 left-1/4 -translate-y-8 camera-panel px-2 py-1 rounded">
            <span className="text-xs font-mono">Character Zone</span>
          </div>
        </div>
      )}

      {/* Scene/Background Overlay */}
      {showGuides && activeTool === 'scene' && (
        <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-secondary/50">
          <div className="absolute top-2 left-2 camera-panel px-2 py-1 rounded flex items-center gap-1">
            <Mountain size={12} />
            <span className="text-xs font-mono">Scene Area</span>
          </div>
        </div>
      )}

      {/* Lighting Direction Overlay */}
      {showGuides && activeTool === 'lighting' && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Light rays */}
          <div className="absolute top-4 right-4">
            <div className="relative w-16 h-16">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 h-px bg-gradient-to-r from-yellow-400 to-transparent opacity-60"
                  style={{
                    width: '2rem',
                    transform: `rotate(${i * 30}deg) translate(-50%, -50%)`,
                    transformOrigin: '0 50%',
                  }}
                />
              ))}
              <Lightbulb size={16} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-400" />
            </div>
            
            <div className="camera-panel px-2 py-1 rounded mt-2">
              <span className="text-xs font-mono">Light Source</span>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Guides Button */}
      <button
        onClick={() => setShowGuides(!showGuides)}
        className={`absolute bottom-4 left-4 camera-button p-2 backdrop-blur-sm ${showGuides ? 'bg-primary text-primary-foreground' : ''}`}
        title="Toggle Guides"
      >
        <div className="w-4 h-4 border border-current grid grid-cols-2 grid-rows-2 gap-px">
          <div className="bg-current opacity-50"></div>
          <div className="bg-current opacity-50"></div>
          <div className="bg-current opacity-50"></div>
          <div className="bg-current opacity-50"></div>
        </div>
      </button>
    </>
  );
};