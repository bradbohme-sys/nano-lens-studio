import { useState } from "react";
import { Aperture, Camera, Timer, Sun, Contrast, Palette, Sparkles } from "lucide-react";

interface CameraControlsProps {
  activeModule: 'editor' | 'composer' | 'settings' | 'export';
  onProcessingChange: (processing: boolean) => void;
}

export const CameraControls = ({ activeModule, onProcessingChange }: CameraControlsProps) => {
  const [aperture, setAperture] = useState(2.8);
  const [iso, setIso] = useState(400);
  const [shutterSpeed, setShutterSpeed] = useState(60);
  const [exposure, setExposure] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);

  const handleGenerate = async () => {
    onProcessingChange(true);
    // Simulate AI processing
    setTimeout(() => {
      onProcessingChange(false);
    }, 3000);
  };

  return (
    <div className="camera-panel p-4 border-b border-border">
      <h2 className="font-semibold mb-4 text-center font-mono">CAMERA CONTROLS</h2>
      
      {/* Main Camera Settings */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Aperture Dial */}
        <div className="text-center">
          <div className="camera-dial w-16 h-16 mx-auto mb-2 relative animate-dial-turn">
            <Aperture className="absolute inset-0 m-auto" size={24} />
          </div>
          <div className="lcd-display p-1 rounded text-center">
            <div className="text-lcd text-xs">f/{aperture}</div>
          </div>
          <input
            type="range"
            min="1.4"
            max="22"
            step="0.1"
            value={aperture}
            onChange={(e) => setAperture(parseFloat(e.target.value))}
            className="w-full mt-2 accent-primary"
          />
        </div>

        {/* ISO Dial */}
        <div className="text-center">
          <div className="camera-dial w-16 h-16 mx-auto mb-2 relative">
            <Camera className="absolute inset-0 m-auto" size={24} />
          </div>
          <div className="lcd-display p-1 rounded text-center">
            <div className="text-lcd text-xs">ISO {iso}</div>
          </div>
          <input
            type="range"
            min="100"
            max="6400"
            step="100"
            value={iso}
            onChange={(e) => setIso(parseInt(e.target.value))}
            className="w-full mt-2 accent-primary"
          />
        </div>

        {/* Shutter Speed Dial */}
        <div className="text-center">
          <div className="camera-dial w-16 h-16 mx-auto mb-2 relative">
            <Timer className="absolute inset-0 m-auto" size={24} />
          </div>
          <div className="lcd-display p-1 rounded text-center">
            <div className="text-lcd text-xs">1/{shutterSpeed}</div>
          </div>
          <input
            type="range"
            min="2"
            max="1000"
            step="1"
            value={shutterSpeed}
            onChange={(e) => setShutterSpeed(parseInt(e.target.value))}
            className="w-full mt-2 accent-primary"
          />
        </div>
      </div>

      {/* Image Adjustments */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <Sun size={16} />
          <span className="text-sm font-mono min-w-[80px]">EXPOSURE</span>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={exposure}
            onChange={(e) => setExposure(parseFloat(e.target.value))}
            className="flex-1 accent-accent"
          />
          <div className="lcd-display px-2 py-1 min-w-[50px] text-center">
            <span className="text-lcd text-xs">
              {exposure > 0 ? '+' : ''}{exposure.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Contrast size={16} />
          <span className="text-sm font-mono min-w-[80px]">CONTRAST</span>
          <input
            type="range"
            min="-100"
            max="100"
            step="5"
            value={contrast}
            onChange={(e) => setContrast(parseInt(e.target.value))}
            className="flex-1 accent-accent"
          />
          <div className="lcd-display px-2 py-1 min-w-[50px] text-center">
            <span className="text-lcd text-xs">{contrast}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Palette size={16} />
          <span className="text-sm font-mono min-w-[80px]">SATURATION</span>
          <input
            type="range"
            min="-100"
            max="100"
            step="5"
            value={saturation}
            onChange={(e) => setSaturation(parseInt(e.target.value))}
            className="flex-1 accent-accent"
          />
          <div className="lcd-display px-2 py-1 min-w-[50px] text-center">
            <span className="text-lcd text-xs">{saturation}</span>
          </div>
        </div>
      </div>

      {/* AI Generation Button */}
      <button
        onClick={handleGenerate}
        className="w-full camera-button p-4 rounded-lg font-mono font-semibold text-primary border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all animate-button-press"
      >
        <Sparkles className="inline-block mr-2" size={20} />
        GENERATE AI IMAGE
      </button>

      {/* Prompt Preview */}
      <div className="mt-4">
        <h3 className="text-sm font-mono mb-2">AI PROMPT PREVIEW</h3>
        <div className="lcd-display p-3 rounded text-xs">
          <div className="text-lcd">
            Professional photo, f/{aperture} aperture, ISO {iso}, 1/{shutterSpeed}s, 
            {exposure !== 0 && ` ${exposure > 0 ? '+' : ''}${exposure} exposure,`}
            {contrast !== 0 && ` ${contrast > 0 ? 'high' : 'low'} contrast,`}
            {saturation !== 0 && ` ${saturation > 0 ? 'vibrant' : 'muted'} colors,`}
            DSLR quality, professional lighting
          </div>
        </div>
      </div>
    </div>
  );
};