import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
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
import { ProjectsPanel } from "./panels/ProjectsPanel";
import { PromptPreviewPanel } from "./panels/PromptPreviewPanel";
import { useImageGeneration } from "@/hooks/useImageGeneration";
import { useProjectManagement } from "@/hooks/useProjectManagement";

export const DSLRInterface = () => {
  const [activeModule, setActiveModule] = useState<'editor' | 'composer' | 'settings' | 'export'>('editor');
  const [activeTool, setActiveTool] = useState<string>('select');
  const [activePanel, setActivePanel] = useState<string>('camera');
  
  const [aperture, setAperture] = useState(2.8);
  const [iso, setIso] = useState(400);
  const [shutterSpeed, setShutterSpeed] = useState(60);
  const [exposure, setExposure] = useState(0);
  const [contrast, setContrast] = useState(50);
  const [saturation, setSaturation] = useState(50);
  const [prompt, setPrompt] = useState("");
  const [referenceImage, setReferenceImage] = useState<{ data: string | null; enabled: boolean }>({ 
    data: null, 
    enabled: false 
  });

  const { isGenerating, generateImage } = useImageGeneration();
  const { currentProject, saveGeneratedImage } = useProjectManagement();

  const handleGenerate = async () => {
    const cameraSettings = {
      aperture,
      iso,
      shutterSpeed,
      exposure,
      contrast,
      saturation,
    };

    const imageUrl = await generateImage(prompt, cameraSettings, referenceImage.enabled ? referenceImage.data : null);
    
    if (imageUrl) {
      await saveGeneratedImage(currentProject?.id ?? null, prompt, cameraSettings, imageUrl);
    }
  };

  const handleReferenceImageChange = (imageData: string | null, enabled: boolean) => {
    setReferenceImage({ data: imageData, enabled });
  };

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
          {/* AI Prompt Input */}
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter AI prompt..."
            className="w-64 h-10 resize-none text-sm"
          />
          
          {/* Generate Button (Shutter Style) */}
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            size="lg"
            className="camera-button font-mono font-semibold px-6"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                GENERATING
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                GENERATE
              </>
            )}
          </Button>

          <div className="lcd-display px-3 py-1 rounded animate-lcd-glow">
            <span className="text-lcd">ISO {iso}</span>
          </div>
          <div className="lcd-display px-3 py-1 rounded">
            <span className="text-lcd">f/{aperture}</span>
          </div>
          <div className="lcd-display px-3 py-1 rounded">
            <span className="text-lcd">1/{shutterSpeed}</span>
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
            isProcessing={isGenerating}
          />
          
          {/* Bottom Status Bar */}
          <StatusBar 
            isProcessing={isGenerating}
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
                aperture={aperture}
                iso={iso}
                shutterSpeed={shutterSpeed}
                exposure={exposure}
                contrast={contrast}
                saturation={saturation}
                onApertureChange={setAperture}
                onIsoChange={setIso}
                onShutterSpeedChange={setShutterSpeed}
                onExposureChange={setExposure}
                onContrastChange={setContrast}
                onSaturationChange={setSaturation}
              />
            )}
            {activePanel === 'character' && <CharacterPanel />}
            {activePanel === 'scene' && <ScenePanel />}
            {activePanel === 'lighting' && <LightingPanel />}
            {activePanel === 'layers' && <LayersPanel onReferenceImageChange={handleReferenceImageChange} />}
            {activePanel === 'prompt-preview' && (
              <PromptPreviewPanel 
                cameraSettings={{ aperture, iso, shutterSpeed, exposure, contrast, saturation }}
                prompt={prompt}
              />
            )}
            {activePanel === 'projects' && <ProjectsPanel />}
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