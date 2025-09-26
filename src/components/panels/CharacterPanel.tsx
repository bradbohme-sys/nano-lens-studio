import { useState } from "react";
import { User, RotateCcw, Move, Scale, Palette } from "lucide-react";

export const CharacterPanel = () => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(100);
  const [age, setAge] = useState(25);
  const [expression, setExpression] = useState("neutral");

  return (
    <div className="p-4 space-y-6">
      <h2 className="font-semibold mb-4 text-center font-mono">CHARACTER</h2>
      
      {/* Character Properties */}
      <div className="space-y-4">
        <div>
          <label className="text-xs font-mono">AGE</label>
          <input
            type="range"
            min="18"
            max="80"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            className="w-full mt-1 accent-accent"
          />
          <div className="lcd-display px-2 py-1 text-center mt-1">
            <span className="text-lcd text-xs">{age} years</span>
          </div>
        </div>

        <div>
          <label className="text-xs font-mono">EXPRESSION</label>
          <select 
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full mt-1 bg-input border border-border rounded px-2 py-1 text-sm"
          >
            <option value="neutral">Neutral</option>
            <option value="happy">Happy</option>
            <option value="serious">Serious</option>
            <option value="surprised">Surprised</option>
            <option value="confident">Confident</option>
          </select>
        </div>
      </div>

      {/* Position Controls */}
      <div className="space-y-4">
        <h3 className="text-sm font-mono">POSITION</h3>
        
        <div className="flex items-center gap-3">
          <Move size={16} />
          <span className="text-sm font-mono min-w-[20px]">X</span>
          <input
            type="range"
            min="0"
            max="100"
            value={position.x}
            onChange={(e) => setPosition({...position, x: parseInt(e.target.value)})}
            className="flex-1 accent-accent"
          />
          <div className="lcd-display px-2 py-1 min-w-[40px] text-center">
            <span className="text-lcd text-xs">{position.x}%</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Move size={16} />
          <span className="text-sm font-mono min-w-[20px]">Y</span>
          <input
            type="range"
            min="0"
            max="100"
            value={position.y}
            onChange={(e) => setPosition({...position, y: parseInt(e.target.value)})}
            className="flex-1 accent-accent"
          />
          <div className="lcd-display px-2 py-1 min-w-[40px] text-center">
            <span className="text-lcd text-xs">{position.y}%</span>
          </div>
        </div>
      </div>

      {/* Transform Controls */}
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
          <Scale size={16} />
          <span className="text-sm font-mono min-w-[60px]">SCALE</span>
          <input
            type="range"
            min="25"
            max="200"
            value={scale}
            onChange={(e) => setScale(parseInt(e.target.value))}
            className="flex-1 accent-accent"
          />
          <div className="lcd-display px-2 py-1 min-w-[50px] text-center">
            <span className="text-lcd text-xs">{scale}%</span>
          </div>
        </div>
      </div>

      {/* AI Prompt Preview */}
      <div className="mt-6">
        <h3 className="text-sm font-mono mb-2">CHARACTER PROMPT</h3>
        <div className="lcd-display p-3 rounded text-xs">
          <div className="text-lcd">
            {age}-year-old person, {expression} expression, positioned at {position.x}%,{position.y}%, 
            {rotation !== 0 && ` rotated ${rotation}°,`}
            {scale !== 100 && ` scaled ${scale}%,`}
            professional portrait style
          </div>
        </div>
      </div>
    </div>
  );
};