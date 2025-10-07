import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface CameraSettings {
  aperture: number;
  iso: number;
  shutterSpeed: number;
  exposure: number;
  contrast: number;
  saturation: number;
}

export interface Project {
  id: string;
  name: string;
  settings: any;
  created_at: string;
  updated_at: string;
}

interface ProjectSettings {
  camera: CameraSettings;
  prompt?: string;
}

export const useProjectManagement = () => {
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const saveProject = async (name: string, settings: ProjectSettings) => {
    setIsSaving(true);
    try {
      if (currentProject?.id) {
        // Update existing project
        const { data, error } = await supabase
          .from('projects')
          .update({ name, settings: settings as any })
          .eq('id', currentProject.id)
          .select()
          .single();

        if (error) throw error;
        setCurrentProject(data as any);
        toast.success('Project updated successfully');
      } else {
        // Create new project
        const { data, error } = await supabase
          .from('projects')
          .insert([{ name, settings: settings as any }])
          .select()
          .single();

        if (error) throw error;
        setCurrentProject(data as any);
        toast.success('Project saved successfully');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    } finally {
      setIsSaving(false);
    }
  };

  const loadProject = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setCurrentProject(data as any);
      toast.success('Project loaded');
      return data as any;
    } catch (error) {
      console.error('Error loading project:', error);
      toast.error('Failed to load project');
      return null;
    }
  };

  const listProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error listing projects:', error);
      toast.error('Failed to load projects');
      return [];
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      if (currentProject?.id === id) {
        setCurrentProject(null);
      }
      toast.success('Project deleted');
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const saveGeneratedImage = async (
    projectId: string | null,
    prompt: string,
    cameraSettings: CameraSettings,
    imageData: string
  ) => {
    try {
      const { error } = await supabase
        .from('generated_images')
        .insert([{
          project_id: projectId,
          prompt,
          camera_settings: cameraSettings as any,
          image_data: imageData
        }]);

      if (error) throw error;
      toast.success('Image saved');
    } catch (error) {
      console.error('Error saving image:', error);
      toast.error('Failed to save image');
    }
  };

  const getProjectImages = async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from('generated_images')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error loading images:', error);
      toast.error('Failed to load images');
      return [];
    }
  };

  return {
    currentProject,
    setCurrentProject,
    isSaving,
    saveProject,
    loadProject,
    listProjects,
    deleteProject,
    saveGeneratedImage,
    getProjectImages,
  };
};
