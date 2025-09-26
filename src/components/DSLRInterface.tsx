import { useState } from "react";
import { CameraControls } from "./camera/CameraControls";
import { ToolSidebar } from "./tools/ToolSidebar";
import { MainCanvas } from "./canvas/MainCanvas";
import { ModuleTabs } from "./navigation/ModuleTabs";
import { StatusBar } from "./ui/StatusBar";
import { LayersPanel } from "./panels/LayersPanel";
import { RightPanelNav } from "./panels/RightPanelNav";
import { CharacterPanel } from "./panels/CharacterPanel";
import { ScenePanel } from "./panels/ScenePanel";
import { LightingPanel } from "./panels/LightingPanel";

export const DSLRInterface = () => {
  const [activeModule, setActiveModule] = useState<'editor' | 'composer' | 'settings' | 'export'>('editor');
  const [activeTool, setActiveTool] = useState<string>('select');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activePanel, setActivePanel] = useState<string>('camera');

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
        <div className="flex">
          <RightPanelNav 
            activePanel={activePanel}
            onPanelChange={setActivePanel}
          />
          
          <div className="w-72 flex flex-col">
            {activePanel === 'camera' && (
              <CameraControls 
                activeModule={activeModule}
                onProcessingChange={setIsProcessing}
              />
            )}
            {activePanel === 'character' && <CharacterPanel />}
            {activePanel === 'scene' && <ScenePanel />}
            {activePanel === 'lighting' && <LightingPanel />}
            {activePanel === 'layers' && <LayersPanel />}
            {activePanel === 'style' && (
              <div className="p-4">
                <h2 className="font-semibold mb-4 text-center font-mono">STYLE</h2>
                <p className="text-muted-foreground text-center">Style controls coming soon...</p>
              </div>
            )}
            {activePanel === 'effects' && (
              <div className="p-4">
                <h2 className="font-semibold mb-4 text-center font-mono">EFFECTS</h2>
                <p className="text-muted-foreground text-center">Effects controls coming soon...</p>
              </div>
            )}
            {activePanel === 'settings' && (
              <div className="p-4">
                <h2 className="font-semibold mb-4 text-center font-mono">SETTINGS</h2>
                <p className="text-muted-foreground text-center">Settings panel coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};