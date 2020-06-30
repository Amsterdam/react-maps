import {
  Circle,
  CircleMarker,
  GeoJSON,
  ImageOverlay,
  LayerGroup,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
  Tooltip,
} from 'leaflet'

export type AllLeafletInstances =
  | LayerGroup
  | Marker
  | ImageOverlay
  | Circle
  | CircleMarker
  | Rectangle
  | TileLayer
  | Tooltip
  | Popup
  | GeoJSON
