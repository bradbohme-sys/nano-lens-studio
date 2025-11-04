import { 
  MousePointer, 
  Crop, 
  Lasso,
  Wand2,
  Brush,
  Move,
  RotateCw,
  Square,
  Circle,
  Type,
  Scale,
  User,
  Mountain,
  Lightbulb,
  Camera
} from "lucide-react";
import { ImageGenerationDrawerV2 } from "../panels/ImageGenerationDrawerV2";

interface ToolSidebarProps {
  activeTool: string;
  onToolChange: (tool: string) => void;
  module: 'editor' | 'composer' | 'settings' | 'export';
}

export const ToolSidebar = ({ activeTool, onToolChange, module }: ToolSidebarProps) => {
  const editorTools = [
    { id: 'select', label: 'Select', icon: MousePointer },
    { id: 'move', label: 'Move', icon: Move },
    { id: 'rotate', label: 'Rotate', icon: RotateCw },
    { id: 'scale', label: 'Scale', icon: Scale },
    { id: 'crop', label: 'Crop', icon: Crop },
    { id: 'lasso', label: 'Lasso', icon: Lasso },
    { id: 'segment', label: 'Auto Segment', icon: Wand2 },
    { id: 'brush', label: 'Brush', icon: Brush },
    { id: 'character', label: 'Character', icon: User },
    { id: 'scene', label: 'Scene', icon: Mountain },
    { id: 'lighting', label: 'Lighting', icon: Lightbulb },
  ];

  const composerTools = [
    { id: 'select', label: 'Select', icon: MousePointer },
    { id: 'rectangle', label: 'Rectangle', icon: Square },
    { id: 'circle', label: 'Circle', icon: Circle },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'move', label: 'Move', icon: Move },
  ];

  const tools = module === 'composer' ? composerTools : editorTools;

  return (
    <aside className="w-16 camera-panel border-r border-border flex flex-col gap-2 p-2">
      {/* DSLR Camera V2 */}
      <ImageGenerationDrawerV2 />
      
      <div className="w-full h-px bg-border my-2"></div>
      
      {tools.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onToolChange(id)}
          className={`
            w-12 h-12 rounded-lg flex items-center justify-center transition-all group
            ${activeTool === id 
              ? 'tool-active' 
              : 'camera-button'
            }
          `}
          title={label}
        >
          <Icon size={20} />
        </button>
      ))}
      
      {/* Tool Options */}
      {activeTool !== 'select' && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="space-y-2">
            {activeTool === 'brush' && (
              <>
                <div className="camera-dial w-8 h-8 mx-auto"></div>
                <div className="text-xs text-center text-muted-foreground">SIZE</div>
              </>
            )}
            {activeTool === 'crop' && (
              <>
                <button className="camera-button w-full h-6 text-xs">APPLY</button>
                <button className="camera-button w-full h-6 text-xs">RESET</button>
              </>
            )}
          </div>
        </div>
      )}
    </aside>
  );
};