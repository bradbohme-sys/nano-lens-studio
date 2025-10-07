import { FileText } from "lucide-react";

interface PromptPreviewPanelProps {
  cameraSettings: {
    aperture: number;
    iso: number;
    shutterSpeed: number;
    exposure: number;
    contrast: number;
    saturation: number;
  };
  prompt: string;
  characterPrompt?: string;
  scenePrompt?: string;
  lightingPrompt?: string;
}

export const PromptPreviewPanel = ({ 
  cameraSettings, 
  prompt,
  characterPrompt = "",
  scenePrompt = "",
  lightingPrompt = ""
}: PromptPreviewPanelProps) => {
  const combinedPrompt = [
    prompt,
    characterPrompt,
    scenePrompt,
    lightingPrompt
  ].filter(Boolean).join(", ");

  const technicalSettings = `Camera: f/${cameraSettings.aperture}, ISO ${cameraSettings.iso}, 1/${cameraSettings.shutterSpeed}s${cameraSettings.exposure !== 0 ? `, ${cameraSettings.exposure > 0 ? '+' : ''}${cameraSettings.exposure} EV` : ''}, Contrast: ${cameraSettings.contrast}, Saturation: ${cameraSettings.saturation}`;

  return (
    <div className="flex-1 camera-panel p-4 overflow-y-auto">
      <div className="flex items-center gap-2 mb-4">
        <FileText size={16} />
        <h2 className="font-semibold font-mono">PROMPT PREVIEW</h2>
      </div>

      <div className="space-y-4">
        <div>
          <div className="text-xs text-muted-foreground font-mono mb-2">COMBINED PROMPT</div>
          <div className="lcd-display p-3 rounded min-h-[100px]">
            <div className="text-lcd text-sm whitespace-pre-wrap">
              {combinedPrompt || "Enter prompts in the panels to see them combined here"}
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs text-muted-foreground font-mono mb-2">TECHNICAL SETTINGS</div>
          <div className="lcd-display p-3 rounded">
            <div className="text-lcd text-xs">{technicalSettings}</div>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <div className="text-xs text-muted-foreground font-mono mb-2">PROMPT BREAKDOWN</div>
          <div className="space-y-2">
            {prompt && (
              <div className="camera-panel p-2 rounded">
                <div className="text-xs font-mono text-muted-foreground mb-1">Main Prompt</div>
                <div className="text-sm">{prompt}</div>
              </div>
            )}
            {characterPrompt && (
              <div className="camera-panel p-2 rounded">
                <div className="text-xs font-mono text-muted-foreground mb-1">Character</div>
                <div className="text-sm">{characterPrompt}</div>
              </div>
            )}
            {scenePrompt && (
              <div className="camera-panel p-2 rounded">
                <div className="text-xs font-mono text-muted-foreground mb-1">Scene</div>
                <div className="text-sm">{scenePrompt}</div>
              </div>
            )}
            {lightingPrompt && (
              <div className="camera-panel p-2 rounded">
                <div className="text-xs font-mono text-muted-foreground mb-1">Lighting</div>
                <div className="text-sm">{lightingPrompt}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};