import { 
  Camera, 
  Settings, 
  Layers, 
  Palette, 
  Sparkles, 
  User, 
  Mountain, 
  Lightbulb,
  FolderOpen,
  FileText,
  Wand2,
  Lasso,
  ZoomIn,
  Microscope
} from "lucide-react";

interface RightPanelNavProps {
  activePanel: string;
  onPanelChange: (panel: string) => void;
}

export const RightPanelNav = ({ activePanel, onPanelChange }: RightPanelNavProps) => {
  const panels = [
    { id: 'camera', icon: Camera, label: 'Camera' },
    { id: 'character', icon: User, label: 'Character' },
    { id: 'scene', icon: Mountain, label: 'Scene' },
    { id: 'lighting', icon: Lightbulb, label: 'Lighting' },
    { id: 'layers', icon: Layers, label: 'Layers' },
    { id: 'ai-tools', icon: Wand2, label: 'AI Tools' },
    { id: 'selection', icon: Wand2, label: 'Selection' },
    { id: 'lasso', icon: Lasso, label: 'Lasso' },
    { id: 'cursor-zoom', icon: ZoomIn, label: 'Cursor Zoom' },
    { id: 'microscope', icon: Microscope, label: 'Microscope' },
    { id: 'color-sphere', icon: Palette, label: 'Color Sphere' },
    { id: 'prompt-preview', icon: FileText, label: 'Prompt Preview' },
    { id: 'projects', icon: FolderOpen, label: 'Projects' },
  ];

  return (
    <div className="w-12 camera-panel border-r border-border flex flex-col gap-1 p-2">
      {panels.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => onPanelChange(id)}
          className={`
            relative group p-2 rounded-md transition-all camera-button
            ${activePanel === id 
              ? 'bg-primary text-primary-foreground' 
              : 'hover:bg-muted'
            }
          `}
          title={label}
        >
          <Icon size={16} />
          
          {/* Tooltip */}
          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
            <div className="camera-panel px-2 py-1 rounded text-xs font-mono whitespace-nowrap">
              {label}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};