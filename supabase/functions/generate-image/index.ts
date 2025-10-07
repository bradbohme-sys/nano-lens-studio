import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, cameraSettings } = await req.json();
    console.log('Generating image with prompt:', prompt);
    console.log('Camera settings:', cameraSettings);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Build enhanced prompt based on camera settings
    const enhancedPrompt = buildEnhancedPrompt(prompt, cameraSettings);
    console.log('Enhanced prompt:', enhancedPrompt);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        messages: [
          {
            role: 'user',
            content: enhancedPrompt
          }
        ],
        modalities: ['image', 'text']
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response received');

    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    if (!imageUrl) {
      throw new Error('No image generated');
    }

    return new Response(
      JSON.stringify({ 
        imageUrl,
        prompt: enhancedPrompt
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-image function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function buildEnhancedPrompt(basePrompt: string, settings: any): string {
  let prompt = basePrompt;
  
  // Add camera settings to prompt
  if (settings.aperture) {
    const apertureValue = `f/${settings.aperture}`;
    const dofEffect = settings.aperture < 4 ? 'shallow depth of field, bokeh background' : 
                      settings.aperture > 8 ? 'deep depth of field, sharp throughout' : 
                      'balanced depth of field';
    prompt += `, shot at ${apertureValue} with ${dofEffect}`;
  }
  
  if (settings.iso) {
    const isoEffect = settings.iso > 1600 ? 'with visible film grain' :
                     settings.iso > 800 ? 'with subtle grain' :
                     'clean and crisp';
    prompt += `, ISO ${settings.iso} ${isoEffect}`;
  }
  
  if (settings.shutterSpeed) {
    const speedEffect = settings.shutterSpeed < 60 ? 'motion blur effect' :
                       settings.shutterSpeed > 250 ? 'frozen motion, sharp action' :
                       'natural motion capture';
    prompt += `, shutter speed 1/${settings.shutterSpeed} ${speedEffect}`;
  }
  
  if (settings.exposure) {
    const exposureEffect = settings.exposure > 0 ? 'bright and airy' :
                          settings.exposure < 0 ? 'dark and moody' :
                          'well-exposed';
    prompt += `, ${exposureEffect}`;
  }
  
  if (settings.contrast) {
    const contrastEffect = settings.contrast > 50 ? 'high contrast, dramatic' :
                          settings.contrast < 50 ? 'soft, low contrast' :
                          'balanced contrast';
    prompt += `, ${contrastEffect}`;
  }
  
  if (settings.saturation) {
    const saturationEffect = settings.saturation > 50 ? 'vibrant, saturated colors' :
                            settings.saturation < 50 ? 'muted, desaturated colors' :
                            'natural color saturation';
    prompt += `, ${saturationEffect}`;
  }
  
  // Add professional photography terms
  prompt += ', professional photography, high quality, ultra detailed, 16:9 aspect ratio';
  
  return prompt;
}
