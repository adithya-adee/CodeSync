import { useStorage } from "@liveblocks/react/suspense";
import React, { memo } from "react";
import Ellipse from "./Ellipse";
import Path from "./Path";
import Rectangle from "./Rectangle";
import { CanvasMode, LayerType } from "@/src/types/whiteboard";
import { colorToCss } from "@/src/lib/whiteboard_utils";

type Props = {
  id: string;
  mode: CanvasMode;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
};

const LayerComponent = ({ onLayerPointerDown, id, selectionColor }: Props) => {
  const layer = useStorage((root) => root.layers.get(id));

  if (!layer) {
    return null;
  }

  switch (layer.type) {
    case LayerType.Ellipse:
      return (
        <Ellipse
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Path:
      return (
        <Path
          key={id}
          points={layer.points}
          onPointerDown={(e) => onLayerPointerDown(e, id)}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? colorToCss(layer.fill) : "#CCC"}
          stroke={selectionColor}
        />
      );
    case LayerType.Rectangle:
      return (
        <Rectangle
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    default:
      console.warn("Unknown layer type");
      return null;
  }
};

LayerComponent.displayName = "LayerComponent";

// Use memo with explicit display name
const MemoizedLayerComponent = memo(LayerComponent);
MemoizedLayerComponent.displayName = "MemoizedLayerComponent";

export default MemoizedLayerComponent;
