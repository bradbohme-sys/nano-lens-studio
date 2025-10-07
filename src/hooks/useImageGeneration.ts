import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { CameraSettings } from './useProjectManagement';

export const useImageGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const generateImage = async (prompt: string, cameraSettings: CameraSettings) => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return null;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-image', {
        body: { 
          prompt,
          cameraSettings 
        }
      });

      if (error) {
        if (error.message?.includes('Rate limit')) {
          toast.error('Rate limit exceeded. Please wait and try again.');
        } else if (error.message?.includes('Payment required')) {
          toast.error('Please add credits to your workspace to continue.');
        } else {
          toast.error('Failed to generate image');
        }
        throw error;
      }

      if (!data?.imageUrl) {
        throw new Error('No image URL in response');
      }

      setGeneratedImage(data.imageUrl);
      toast.success('Image generated successfully!');
      return data.imageUrl;
    } catch (error) {
      console.error('Error generating image:', error);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    isGenerating,
    generatedImage,
    setGeneratedImage,
    generateImage,
  };
};
