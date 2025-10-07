import { useState, useRef } from "react";
import { Eye, EyeOff, Lock, Unlock, Trash2, Plus, Image as ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Layer {
  id: string;
  name: string;
  visible: boolean;
  locked: boolean;
  type: 'background' | 'image' | 'adjustment' | 'reference';
  imageData?: string;
  isReference?: boolean;
}

interface LayersPanelProps {
  onReferenceImageChange?: (imageData: string | null, enabled: boolean) => void;
}

export const LayersPanel = ({ onReferenceImageChange }: LayersPanelProps) => {
  const [layers, setLayers] = useState<Layer[]>([
    { id: '1', name: 'Background', visible: true, locked: false, type: 'background' },
  ]);
  
  const [selectedLayer, setSelectedLayer] = useState('1');
  const [useReferenceImage, setUseReferenceImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const deleteLayer = (id: string) => {
    setLayers(layers.filter(layer => layer.id !== id));
  };

  const addLayer = (imageData?: string, isReference?: boolean) => {
    const newLayer: Layer = {
      id: Date.now().toString(),
      name: isReference ? 'Reference Image' : `Layer ${layers.length + 1}`,
      visible: true,
      locked: false,
      type: isReference ? 'reference' : 'image',
      imageData,
      isReference,
    };
    setLayers([...layers, newLayer]);
    if (isReference && imageData) {
      setSelectedLayer(newLayer.id);
    }
  };

  const handleReferenceImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        addLayer(imageData, true);
        if (onReferenceImageChange) {
          onReferenceImageChange(imageData, true);
        }
      };
      reader.readAsDataURL(file);
      if (event.target) event.target.value = '';
    }
  };

  const handleReferenceToggle = (enabled: boolean) => {
    setUseReferenceImage(enabled);
    const referenceLayer = layers.find(l => l.isReference);
    if (onReferenceImageChange && referenceLayer) {
      onReferenceImageChange(referenceLayer.imageData || null, enabled);
    }
  };

  return (
    <div className="flex-1 camera-panel p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold font-mono">LAYERS</h2>
        <button
          onClick={() => addLayer()}
          className="camera-button p-1 rounded"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Reference Image Section */}
      <div className="mb-4 pb-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <Label htmlFor="use-reference" className="text-sm font-mono">USE REFERENCE IMAGE</Label>
          <Switch
            id="use-reference"
            checked={useReferenceImage}
            onCheckedChange={handleReferenceToggle}
            disabled={!layers.some(l => l.isReference)}
          />
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleReferenceImageUpload}
          className="hidden"
        />
        
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="outline"
          size="sm"
          className="w-full"
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload Reference Image
        </Button>

        {layers.find(l => l.isReference) && (
          <div className="mt-2 p-2 rounded border border-primary/50 bg-primary/10">
            <div className="text-xs text-muted-foreground font-mono mb-1">REFERENCE ACTIVE</div>
            <div className="text-xs">
              {useReferenceImage ? 'Will be sent with prompt' : 'Disabled'}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-1">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={`
              group flex items-center gap-2 p-2 rounded border transition-all cursor-pointer
              ${selectedLayer === layer.id 
                ? 'bg-primary/20 border-primary' 
                : 'border-border hover:bg-muted/50'
              }
            `}
            onClick={() => setSelectedLayer(layer.id)}
          >
            {/* Layer Type Icon */}
            <div className={`w-8 h-8 bg-muted rounded flex items-center justify-center ${layer.isReference ? 'border border-primary' : ''}`}>
              {layer.imageData ? (
                <img src={layer.imageData} alt={layer.name} className="w-full h-full object-cover rounded" />
              ) : (
                <ImageIcon size={14} className="text-muted-foreground" />
              )}
            </div>

            {/* Layer Info */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{layer.name}</div>
              <div className="text-xs text-muted-foreground capitalize">{layer.type}</div>
            </div>

            {/* Layer Controls */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleVisibility(layer.id);
                }}
                className="camera-button p-1"
              >
                {layer.visible ? <Eye size={12} /> : <EyeOff size={12} />}
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLock(layer.id);
                }}
                className="camera-button p-1"
              >
                {layer.locked ? <Lock size={12} /> : <Unlock size={12} />}
              </button>
              
              {layer.type !== 'background' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteLayer(layer.id);
                  }}
                  className="camera-button p-1 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 size={12} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Layer Properties */}
      {selectedLayer && (
        <div className="mt-4 pt-4 border-t border-border">
          <h3 className="text-sm font-mono mb-3">LAYER PROPERTIES</h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs font-mono">OPACITY</label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="100"
                className="w-full mt-1 accent-accent"
              />
            </div>
            
            <div>
              <label className="text-xs font-mono">BLEND MODE</label>
              <select className="w-full mt-1 bg-input border border-border rounded px-2 py-1 text-sm">
                <option>Normal</option>
                <option>Multiply</option>
                <option>Screen</option>
                <option>Overlay</option>
                <option>Soft Light</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};