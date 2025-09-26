import { useState } from "react";
import { CameraControls } from "./camera/CameraControls";
import { ToolSidebar } from "./tools/ToolSidebar";
import { MainCanvas } from "./canvas/MainCanvas";
import { ModuleTabs } from "./navigation/ModuleTabs";
import { StatusBar } from "./ui/StatusBar";
import { LayersPanel } from "./panels/LayersPanel";

export const DSLRInterface = () => {
  const [activeModule, setActiveModule] = useState<'editor' | 'composer' | 'settings' | 'export'>('editor');
  const [activeTool, setActiveTool] = useState<string>('select');
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <div className="h-screen w-full bg-camera-body flex flex-col">
      {/* Top Navigation */}
      <header className="camera-panel h-16 flex items-center justify-between px-6 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="text-primary text-xl font-bold font-mono">
            AI CAMERA
          </div>
          <div className="status-indicator status-ready"></div>
          <span className="text-sm text-muted-foreground">READY</span>
        </div>
        
        <ModuleTabs 
          activeModule={activeModule} 
          onModuleChange={setActiveModule}
        />
        
        <div className="flex items-center gap-4">
          <div className="lcd-display px-3 py-1 rounded animate-lcd-glow">
            <span className="text-lcd">ISO 400</span>
          </div>
          <div className="lcd-display px-3 py-1 rounded">
            <span className="text-lcd">f/2.8</span>
          </div>
          <div className="lcd-display px-3 py-1 rounded">
            <span className="text-lcd">1/60</span>
          </div>
        </div>
      </header>

      {/* Main Interface */}
      <div className="flex-1 flex">
        {/* Left Tool Sidebar */}
        <ToolSidebar 
          activeTool={activeTool}
          onToolChange={setActiveTool}
          module={activeModule}
        />

        {/* Center Canvas Area */}
        <div className="flex-1 flex flex-col">
          <MainCanvas 
            activeTool={activeTool}
            isProcessing={isProcessing}
          />
          
          {/* Bottom Status Bar */}
          <StatusBar 
            isProcessing={isProcessing}
            activeTool={activeTool}
          />
        </div>

        {/* Right Controls Panel */}
        <div className="w-80 flex flex-col">
          <CameraControls 
            activeModule={activeModule}
            onProcessingChange={setIsProcessing}
          />
          
          <LayersPanel />
        </div>
      </div>
    </div>
  );
};