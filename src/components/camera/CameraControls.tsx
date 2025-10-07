import { useState, useEffect } from "react";
import { Aperture, Camera, Timer, Sun, Contrast, Palette } from "lucide-react";
import { Label } from "@/components/ui/label";

interface CameraControlsProps {
  aperture: number;
  iso: number;
  shutterSpeed: number;
  exposure: number;
  contrast: number;
  saturation: number;
  onApertureChange: (value: number) => void;
  onIsoChange: (value: number) => void;
  onShutterSpeedChange: (value: number) => void;
  onExposureChange: (value: number) => void;
  onContrastChange: (value: number) => void;
  onSaturationChange: (value: number) => void;
}

export const CameraControls = ({
  aperture,
  iso,
  shutterSpeed,
  exposure,
  contrast,
  saturation,
  onApertureChange,
  onIsoChange,
  onShutterSpeedChange,
  onExposureChange,
  onContrastChange,
  onSaturationChange,
}: CameraControlsProps) => {

  return (
    <div className="camera-panel p-4 border-b border-border overflow-y-auto h-full">
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
            onChange={(e) => onApertureChange(parseFloat(e.target.value))}
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
            onChange={(e) => onIsoChange(parseInt(e.target.value))}
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
            onChange={(e) => onShutterSpeedChange(parseInt(e.target.value))}
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
            onChange={(e) => onExposureChange(parseFloat(e.target.value))}
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
            min="0"
            max="100"
            step="5"
            value={contrast}
            onChange={(e) => onContrastChange(parseInt(e.target.value))}
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
            min="0"
            max="100"
            step="5"
            value={saturation}
            onChange={(e) => onSaturationChange(parseInt(e.target.value))}
            className="flex-1 accent-accent"
          />
          <div className="lcd-display px-2 py-1 min-w-[50px] text-center">
            <span className="text-lcd text-xs">{saturation}</span>
          </div>
        </div>
      </div>

    </div>
  );
};
