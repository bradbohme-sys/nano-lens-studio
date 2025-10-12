import { useState } from "react";
import { Eye, EyeOff, Lock, Unlock, Trash2, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Modifier {
  id: string;
  type: 'transparency' | 'warp' | 'mask' | 'blend' | 'filter';
  name: string;
  enabled: boolean;
  settings: Record<string, any>;
}

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;
  blendMode: string;
  maskVisible: boolean;
  maskColor: string;
  imageData?: string;
  modifiers: Modifier[];
}

interface EnhancedLayersPanelProps {
  onReferenceImageChange?: (imageData: string | null, enabled: boolean) => void;
}

export const EnhancedLayersPanel = ({ onReferenceImageChange }: EnhancedLayersPanelProps) => {
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: '1',
      name: 'Background',
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      maskVisible: true,
      maskColor: '#ff0000',
      modifiers: []
    }
  ]);
  const [selectedLayer, setSelectedLayer] = useState<string>('1');
  const [expandedModifiers, setExpandedModifiers] = useState<Record<string, boolean>>({});
  
  const updateMaskColor = (id: string, color: string) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, maskColor: color } : layer
    ));
  };

  const toggleVisibility = (id: string) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const toggleLock = (id: string) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, locked: !layer.locked } : layer
    ));
  };

  const toggleMaskVisibility = (id: string) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, maskVisible: !layer.maskVisible } : layer
    ));
  };

  const deleteLayer = (id: string) => {
    if (layers.length > 1) {
      setLayers(layers.filter(layer => layer.id !== id));
      if (selectedLayer === id) {
        setSelectedLayer(layers[0].id);
      }
    }
  };

  const addLayer = () => {
    const newLayer: Layer = {
      id: Date.now().toString(),
      name: `Layer ${layers.length + 1}`,
      visible: true,
      locked: false,
      opacity: 100,
      blendMode: 'normal',
      maskVisible: true,
      maskColor: '#ff0000',
      modifiers: []
    };
    setLayers([...layers, newLayer]);
    setSelectedLayer(newLayer.id);
  };

  const updateOpacity = (id: string, value: number[]) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, opacity: value[0] } : layer
    ));
  };

  const updateBlendMode = (id: string, mode: string) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, blendMode: mode } : layer
    ));
  };

  const addModifier = (layerId: string, type: Modifier['type']) => {
    const newModifier: Modifier = {
      id: Date.now().toString(),
      type,
      name: type.charAt(0).toUpperCase() + type.slice(1),
      enabled: true,
      settings: {}
    };

    setLayers(layers.map(layer => 
      layer.id === layerId 
        ? { ...layer, modifiers: [...layer.modifiers, newModifier] }
        : layer
    ));
  };

  const toggleModifier = (layerId: string, modifierId: string) => {
    setLayers(layers.map(layer => 
      layer.id === layerId 
        ? {
            ...layer,
            modifiers: layer.modifiers.map(mod =>
              mod.id === modifierId ? { ...mod, enabled: !mod.enabled } : mod
            )
          }
        : layer
    ));
  };

  const removeModifier = (layerId: string, modifierId: string) => {
    setLayers(layers.map(layer => 
      layer.id === layerId 
        ? {
            ...layer,
            modifiers: layer.modifiers.filter(mod => mod.id !== modifierId)
          }
        : layer
    ));
  };

  const selectedLayerData = layers.find(l => l.id === selectedLayer);

  return (
    <div className="flex-1 camera-panel p-4 overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold font-mono">LAYERS</h2>
        <Button onClick={addLayer} size="sm" variant="outline">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {layers.map((layer) => (
            <div
              key={layer.id}
              className={`border rounded p-2 cursor-pointer transition-colors ${
                selectedLayer === layer.id ? 'border-primary bg-primary/10' : 'border-border'
              }`}
              onClick={() => setSelectedLayer(layer.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm">{layer.name}</span>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => { e.stopPropagation(); toggleVisibility(layer.id); }}
                    className="h-6 w-6 p-0"
                  >
                    {layer.visible ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => { e.stopPropagation(); toggleMaskVisibility(layer.id); }}
                    className="h-6 w-6 p-0"
                    title="Toggle mask visibility"
                  >
                    <Eye className={`h-3 w-3 ${layer.maskVisible ? 'text-primary' : 'text-muted-foreground'}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => { e.stopPropagation(); toggleLock(layer.id); }}
                    className="h-6 w-6 p-0"
                  >
                    {layer.locked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => { e.stopPropagation(); }}
                    className="h-6 w-6 p-0"
                    title="Layer settings"
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => { e.stopPropagation(); deleteLayer(layer.id); }}
                    className="h-6 w-6 p-0"
                    disabled={layers.length === 1}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {layer.modifiers.length > 0 && (
                <div className="mt-2 space-y-1">
                  {layer.modifiers.map((modifier) => (
                    <div
                      key={modifier.id}
                      className="flex items-center justify-between text-xs bg-background/50 p-1 rounded"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className={modifier.enabled ? '' : 'opacity-50'}>{modifier.name}</span>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => toggleModifier(layer.id, modifier.id)}
                          className="h-4 w-4 p-0"
                        >
                          {modifier.enabled ? <Eye className="h-2 w-2" /> : <EyeOff className="h-2 w-2" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeModifier(layer.id, modifier.id)}
                          className="h-4 w-4 p-0"
                        >
                          <Trash2 className="h-2 w-2" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {selectedLayerData && (
        <div className="mt-4 pt-4 border-t border-border space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground font-mono">OPACITY</Label>
            <Slider
              value={[selectedLayerData.opacity]}
              onValueChange={(value) => updateOpacity(selectedLayer, value)}
              max={100}
              step={1}
              className="mt-2"
            />
            <div className="text-right text-xs text-muted-foreground mt-1">
              {selectedLayerData.opacity}%
            </div>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground font-mono">BLEND MODE</Label>
            <Select value={selectedLayerData.blendMode} onValueChange={(value) => updateBlendMode(selectedLayer, value)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="multiply">Multiply</SelectItem>
                <SelectItem value="screen">Screen</SelectItem>
                <SelectItem value="overlay">Overlay</SelectItem>
                <SelectItem value="darken">Darken</SelectItem>
                <SelectItem value="lighten">Lighten</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs text-muted-foreground font-mono mb-2 block">ADD MODIFIER</Label>
            <div className="flex gap-1 flex-wrap">
              {(['transparency', 'warp', 'mask', 'blend', 'filter'] as const).map((type) => (
                <Button
                  key={type}
                  size="sm"
                  variant="outline"
                  onClick={() => addModifier(selectedLayer, type)}
                  className="text-xs"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
