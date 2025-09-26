import { useState } from "react";
import { Lightbulb, Sun, Zap, Moon } from "lucide-react";

export const LightingPanel = () => {
  const [lightType, setLightType] = useState("natural");
  const [intensity, setIntensity] = useState(75);
  const [direction, setDirection] = useState(45);
  const [softness, setSoftness] = useState(50);
  const [temperature, setTemperature] = useState(5500);
  const [shadows, setShadows] = useState(50);

  return (
    <div className="p-4 space-y-6">
      <h2 className="font-semibold mb-4 text-center font-mono">LIGHTING</h2>
      
      {/* Light Type */}
      <div>
        <label className="text-xs font-mono">LIGHT TYPE</label>
        <select 
          value={lightType}
          onChange={(e) => setLightType(e.target.value)}
          className="w-full mt-1 bg-input border border-border rounded px-2 py-1 text-sm"
        >
          <option value="natural">Natural</option>
          <option value="studio">Studio</option>
          <option value="dramatic">Dramatic</option>
          <option value="soft">Soft</option>
          <option value="hard">Hard</option>
          <option value="rim">Rim</option>
          <option value="ambient">Ambient</option>
        </select>
      </div>

      {/* Lighting Controls */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Sun size={16} />
          <span className="text-sm font-mono min-w-[70px]">INTENSITY</span>
          <input
            type="range"
            min="0"
            max="100"
            value={intensity}
            onChange={(e) => setIntensity(parseInt(e.target.value))}
            className="flex-1 accent-accent"
          />
          <div className="lcd-display px-2 py-1 min-w-[50px] text-center">
            <span className="text-lcd text-xs">{intensity}%</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Zap size={16} />
          <span className="text-sm font-mono min-w-[70px]">DIRECTION</span>
          <input
            type="range"
            min="0"
            max="360"
            value={direction}
            onChange={(e) => setDirection(parseInt(e.target.value))}
            className="flex-1 accent-accent"
          />
          <div className="lcd-display px-2 py-1 min-w-[50px] text-center">
            <span className="text-lcd text-xs">{direction}°</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Moon size={16} />
          <span className="text-sm font-mono min-w-[70px]">SOFTNESS</span>
          <input
            type="range"
            min="0"
            max="100"
            value={softness}
            onChange={(e) => setSoftness(parseInt(e.target.value))}
            className="flex-1 accent-accent"
          />
          <div className="lcd-display px-2 py-1 min-w-[50px] text-center">
            <span className="text-lcd text-xs">{softness}%</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Lightbulb size={16} />
          <span className="text-sm font-mono min-w-[70px]">TEMP</span>
          <input
            type="range"
            min="2700"
            max="6500"
            value={temperature}
            onChange={(e) => setTemperature(parseInt(e.target.value))}
            className="flex-1 accent-accent"
          />
          <div className="lcd-display px-2 py-1 min-w-[50px] text-center">
            <span className="text-lcd text-xs">{temperature}K</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-4 h-4 bg-gradient-to-br from-foreground to-transparent rounded"></div>
          <span className="text-sm font-mono min-w-[70px]">SHADOWS</span>
          <input
            type="range"
            min="0"
            max="100"
            value={shadows}
            onChange={(e) => setShadows(parseInt(e.target.value))}
            className="flex-1 accent-accent"
          />
          <div className="lcd-display px-2 py-1 min-w-[50px] text-center">
            <span className="text-lcd text-xs">{shadows}%</span>
          </div>
        </div>
      </div>

      {/* AI Prompt Preview */}
      <div className="mt-6">
        <h3 className="text-sm font-mono mb-2">LIGHTING PROMPT</h3>
        <div className="lcd-display p-3 rounded text-xs">
          <div className="text-lcd">
            {lightType} lighting, {intensity}% intensity, {direction}° direction,
            {softness}% softness, {temperature}K temperature, {shadows}% shadows
          </div>
        </div>
      </div>
    </div>
  );
};