import { useState } from "react";
import { Mountain, RotateCcw, Sun, Cloud, Trees } from "lucide-react";

export const ScenePanel = () => {
  const [sceneType, setSceneType] = useState("studio");
  const [timeOfDay, setTimeOfDay] = useState("day");
  const [weather, setWeather] = useState("clear");
  const [rotation, setRotation] = useState(0);
  const [depth, setDepth] = useState(50);
  const [atmosphere, setAtmosphere] = useState(50);

  return (
    <div className="p-4 space-y-6">
      <h2 className="font-semibold mb-4 text-center font-mono">SCENE</h2>
      
      {/* Scene Type */}
      <div>
        <label className="text-xs font-mono">SCENE TYPE</label>
        <select 
          value={sceneType}
          onChange={(e) => setSceneType(e.target.value)}
          className="w-full mt-1 bg-input border border-border rounded px-2 py-1 text-sm"
        >
          <option value="studio">Studio</option>
          <option value="outdoor">Outdoor</option>
          <option value="urban">Urban</option>
          <option value="nature">Nature</option>
          <option value="interior">Interior</option>
          <option value="abstract">Abstract</option>
        </select>
      </div>

      {/* Time of Day */}
      <div>
        <label className="text-xs font-mono">TIME OF DAY</label>
        <select 
          value={timeOfDay}
          onChange={(e) => setTimeOfDay(e.target.value)}
          className="w-full mt-1 bg-input border border-border rounded px-2 py-1 text-sm"
        >
          <option value="dawn">Dawn</option>
          <option value="day">Day</option>
          <option value="dusk">Dusk</option>
          <option value="night">Night</option>
          <option value="golden_hour">Golden Hour</option>
        </select>
      </div>

      {/* Weather */}
      <div>
        <label className="text-xs font-mono">WEATHER</label>
        <select 
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
          className="w-full mt-1 bg-input border border-border rounded px-2 py-1 text-sm"
        >
          <option value="clear">Clear</option>
          <option value="cloudy">Cloudy</option>
          <option value="rainy">Rainy</option>
          <option value="foggy">Foggy</option>
          <option value="stormy">Stormy</option>
        </select>
      </div>

      {/* Scene Controls */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <RotateCcw size={16} />
          <span className="text-sm font-mono min-w-[60px]">ROTATE</span>
          <input
            type="range"
            min="-180"
            max="180"
            value={rotation}
            onChange={(e) => setRotation(parseInt(e.target.value))}
            className="flex-1 accent-accent"
          />
          <div className="lcd-display px-2 py-1 min-w-[50px] text-center">
            <span className="text-lcd text-xs">{rotation}°</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Mountain size={16} />
          <span className="text-sm font-mono min-w-[60px]">DEPTH</span>
          <input
            type="range"
            min="0"
            max="100"
            value={depth}
            onChange={(e) => setDepth(parseInt(e.target.value))}
            className="flex-1 accent-accent"
          />
          <div className="lcd-display px-2 py-1 min-w-[50px] text-center">
            <span className="text-lcd text-xs">{depth}%</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Cloud size={16} />
          <span className="text-sm font-mono min-w-[60px]">ATMOSPHERE</span>
          <input
            type="range"
            min="0"
            max="100"
            value={atmosphere}
            onChange={(e) => setAtmosphere(parseInt(e.target.value))}
            className="flex-1 accent-accent"
          />
          <div className="lcd-display px-2 py-1 min-w-[50px] text-center">
            <span className="text-lcd text-xs">{atmosphere}%</span>
          </div>
        </div>
      </div>

      {/* AI Prompt Preview */}
      <div className="mt-6">
        <h3 className="text-sm font-mono mb-2">SCENE PROMPT</h3>
        <div className="lcd-display p-3 rounded text-xs">
          <div className="text-lcd">
            {sceneType} scene, {timeOfDay} lighting, {weather} weather,
            {rotation !== 0 && ` rotated ${rotation}°,`}
            {depth}% depth of field, {atmosphere}% atmospheric effects
          </div>
        </div>
      </div>
    </div>
  );
};