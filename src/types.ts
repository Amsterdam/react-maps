import {
  Circle,
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
  | Rectangle
  | TileLayer
  | Tooltip
  | Popup
  | GeoJSON
