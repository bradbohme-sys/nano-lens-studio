import { useState } from "react";
import { Eye, EyeOff, Lock, Unlock, Trash2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  opacity: number;
  thumbnail?: string;
  modifierCount: number;
}

export const SpecialLayersBar = () => {
  const [layers, setLayers] = useState<Layer[]>([
    {
      id: '1',
      name: 'Background',
      visible: true,
      locked: false,
      opacity: 100,
      modifierCount: 0
    }
  ]);
  const [selectedLayer, setSelectedLayer] = useState<string>('1');

  const toggleVisibility = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const toggleLock = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, locked: !layer.locked } : layer
    ));
  };

  const deleteLayer = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (layers.length > 1) {
      setLayers(layers.filter(layer => layer.id !== id));
      if (selectedLayer === id) {
        setSelectedLayer(layers[0].id);
      }
    }
  };

  const updateOpacity = (id: string, value: number[]) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, opacity: value[0] } : layer
    ));
  };

  return (
    <div className="w-16 camera-panel border-l border-r border-border flex flex-col">
      <div className="text-xs font-mono text-center p-2 border-b border-border">
        LAYERS
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {layers.map((layer) => (
            <Popover key={layer.id}>
              <PopoverTrigger asChild>
                <div
                  className={`relative cursor-pointer border rounded transition-colors group ${
                    selectedLayer === layer.id ? 'border-primary' : 'border-border'
                  }`}
                  onClick={() => setSelectedLayer(layer.id)}
                >
                  {/* Thumbnail */}
                  <div className="aspect-square bg-viewfinder rounded flex items-center justify-center text-xs text-muted-foreground">
                    {layer.thumbnail ? (
                      <img src={layer.thumbnail} alt={layer.name} className="w-full h-full object-cover rounded" />
                    ) : (
                      layer.name[0]
                    )}
                  </div>

                  {/* Modifier count badge */}
                  {layer.modifierCount > 0 && (
                    <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-mono">
                      {layer.modifierCount}
                    </div>
                  )}

                  {/* Status indicators */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-1 flex justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!layer.visible && <EyeOff className="h-3 w-3 text-white" />}
                    {layer.locked && <Lock className="h-3 w-3 text-white" />}
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent side="left" className="w-64 p-3">
                <div className="space-y-3">
                  <div className="font-mono text-sm font-semibold">{layer.name}</div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => toggleVisibility(layer.id, e)}
                      className="flex-1"
                    >
                      {layer.visible ? <Eye className="h-4 w-4 mr-1" /> : <EyeOff className="h-4 w-4 mr-1" />}
                      {layer.visible ? 'Hide' : 'Show'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => toggleLock(layer.id, e)}
                      className="flex-1"
                    >
                      {layer.locked ? <Lock className="h-4 w-4 mr-1" /> : <Unlock className="h-4 w-4 mr-1" />}
                      {layer.locked ? 'Locked' : 'Unlock'}
                    </Button>
                  </div>

                  <div>
                    <div className="text-xs text-muted-foreground mb-2 font-mono">OPACITY</div>
                    <Slider
                      value={[layer.opacity]}
                      onValueChange={(value) => updateOpacity(layer.id, value)}
                      max={100}
                      step={1}
                    />
                    <div className="text-right text-xs text-muted-foreground mt-1">
                      {layer.opacity}%
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => deleteLayer(layer.id, e)}
                    disabled={layers.length === 1}
                    className="w-full"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete Layer
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
