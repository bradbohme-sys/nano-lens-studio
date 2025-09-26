import { Activity, Clock, Cpu, HardDrive } from "lucide-react";

interface StatusBarProps {
  isProcessing: boolean;
  activeTool: string;
}

export const StatusBar = ({ isProcessing, activeTool }: StatusBarProps) => {
  return (
    <footer className="camera-panel h-12 flex items-center justify-between px-4 border-t border-border">
      {/* Left Status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className={`status-indicator ${isProcessing ? 'status-processing' : 'status-ready'}`}></div>
          <span className="text-sm font-mono">
            {isProcessing ? 'PROCESSING' : `${activeTool.toUpperCase()} TOOL`}
          </span>
        </div>
        
        {isProcessing && (
          <div className="flex items-center gap-2">
            <Activity size={16} className="animate-pulse" />
            <span className="text-sm text-muted-foreground">AI Working...</span>
          </div>
        )}
      </div>

      {/* Center Info */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Clock size={14} />
          <span className="text-xs font-mono">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <div className="lcd-display px-2 py-1">
          <span className="text-lcd text-xs">READY TO SHOOT</span>
        </div>
      </div>

      {/* Right System Info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Cpu size={14} />
          <span className="text-xs">GPU: Ready</span>
        </div>
        
        <div className="flex items-center gap-2">
          <HardDrive size={14} />
          <span className="text-xs">Storage: 89%</span>
        </div>
        
        <div className="lcd-display px-2 py-1">
          <span className="text-lcd-amber text-xs">API: 47/100</span>
        </div>
      </div>
    </footer>
  );
};