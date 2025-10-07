-- Create projects table to save camera settings and configurations
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create generated_images table to store AI-generated images
CREATE TABLE public.generated_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  prompt TEXT NOT NULL,
  camera_settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  image_data TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX idx_projects_created_at ON public.projects(created_at DESC);
CREATE INDEX idx_generated_images_project_id ON public.generated_images(project_id);
CREATE INDEX idx_generated_images_created_at ON public.generated_images(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust based on your needs)
CREATE POLICY "Anyone can view projects" 
ON public.projects 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create projects" 
ON public.projects 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update projects" 
ON public.projects 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete projects" 
ON public.projects 
FOR DELETE 
USING (true);

CREATE POLICY "Anyone can view generated images" 
ON public.generated_images 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create generated images" 
ON public.generated_images 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can delete generated images" 
ON public.generated_images 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();