import { Camera, Layers, Settings, Download } from "lucide-react";

interface ModuleTabsProps {
  activeModule: 'editor' | 'composer' | 'settings' | 'export';
  onModuleChange: (module: 'editor' | 'composer' | 'settings' | 'export') => void;
}

export const ModuleTabs = ({ activeModule, onModuleChange }: ModuleTabsProps) => {
  const modules = [
    { id: 'editor', label: 'EDITOR', icon: Camera },
    { id: 'composer', label: 'COMPOSER', icon: Layers },
    { id: 'settings', label: 'ADVANCED', icon: Settings },
    { id: 'export', label: 'EXPORT', icon: Download },
  ] as const;

  return (
    <nav className="flex bg-muted rounded-lg p-1">
      {modules.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onModuleChange(id)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-md transition-all font-mono text-sm
            ${activeModule === id 
              ? 'tool-active' 
              : 'camera-button hover:bg-secondary'
            }
          `}
        >
          <Icon size={16} />
          {label}
        </button>
      ))}
    </nav>
  );
};