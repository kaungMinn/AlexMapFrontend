import { LatLngExpression } from "leaflet";
import { useState } from "react";

export type MapAction = "installLocation" | "dragMarker" | "idle"; 

export type MapState = {
    action: MapAction,
    location: LatLngExpression[]
}

export type HandleMapState = <K extends keyof MapState>(
    key: K,
    value: MapState[K]
  ) => void;

export const DEFAULT_MAP_STATE:{action: MapAction, location: LatLngExpression[]} = {action: "idle", location: []}

type HookType = [
    MapState,
    HandleMapState,
]


export const Hook = ():HookType => {
    
    const [mapState, setMapState] = useState<MapState>(DEFAULT_MAP_STATE);

    const handleMapState = <K extends keyof MapState>(
        key: K,
        value: MapState[K]
      ) => {
        setMapState(prev => ({ ...prev, [key]: value }));
      };

    return[mapState, handleMapState]
}