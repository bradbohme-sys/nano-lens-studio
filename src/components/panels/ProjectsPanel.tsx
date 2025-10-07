import { useState } from "react";
import { Save, Loader2, FolderOpen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProjectManagement } from "@/hooks/useProjectManagement";

export const ProjectsPanel = () => {
  const [projectName, setProjectName] = useState("Untitled Project");
  const { currentProject, isSaving, saveProject, listProjects } = useProjectManagement();

  const handleSaveProject = async () => {
    await saveProject(projectName, {
      camera: {
        aperture: 2.8,
        iso: 400,
        shutterSpeed: 60,
        exposure: 0,
        contrast: 50,
        saturation: 50,
      },
      prompt: "",
    });
  };

  return (
    <div className="flex-1 camera-panel p-4 overflow-y-auto">
      <h2 className="font-semibold mb-4 text-center font-mono">PROJECTS</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="project-name" className="text-xs text-muted-foreground font-mono">PROJECT NAME</Label>
          <Input
            id="project-name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="mt-1"
          />
        </div>

        <Button 
          onClick={handleSaveProject}
          disabled={isSaving}
          className="w-full"
          variant="outline"
          size="sm"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Project
            </>
          )}
        </Button>

        {currentProject && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground font-mono mb-2">CURRENT PROJECT</div>
            <div className="lcd-display p-2 rounded">
              <div className="text-lcd text-sm">{currentProject.name}</div>
              <div className="text-lcd text-xs mt-1 opacity-70">
                {new Date(currentProject.updated_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground font-mono mb-2">QUICK ACTIONS</div>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="w-full justify-start">
              <FolderOpen className="mr-2 h-4 w-4" />
              Load Project
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};