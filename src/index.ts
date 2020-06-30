import {
  Circle as CircleType,
  CircleMarker as CircleMarkerType,
  CircleMarkerOptions,
  GeoJSON as GeoJSONType,
  GeoJSONOptions,
  ImageOverlay as ImageOverlayType,
  ImageOverlayOptions,
  LatLngBoundsExpression,
  LatLngExpression,
  Layer,
  LayerGroup as LayerGroupType,
  LayerOptions,
  Marker as MarkerType,
  MarkerOptions,
  PolylineOptions,
  Popup as PopupType,
  PopupOptions,
  Rectangle as RectangleType,
  TileLayer as TileLayerType,
  TileLayerOptions,
  Tooltip as TooltipType,
  TooltipOptions,
} from 'leaflet'
import { GeoJsonObject } from 'geojson'
import createLeafletComponent from './createLeafletComponent'

export { default as Map } from './Map'
export { default as useMapInstance } from './utils/useMapInstance'
export { default as useMapEvents } from './utils/useMapEvents'
export { default as useEvents } from './utils/useEvents'

export { createLeafletComponent }

export const Marker = createLeafletComponent<
  MarkerType,
  [LatLngExpression],
  MarkerOptions
>('marker')

export const TileLayer = createLeafletComponent<
  TileLayerType,
  [string],
  TileLayerOptions
>('tileLayer')

export const LayerGroup = createLeafletComponent<
  LayerGroupType,
  [Layer[]],
  LayerOptions
>('layerGroup')

export const ImageOverlay = createLeafletComponent<
  ImageOverlayType,
  [string, LatLngBoundsExpression],
  ImageOverlayOptions
>('imageOverlay')

export const ToolTip = createLeafletComponent<
  TooltipType,
  [TooltipOptions],
  Layer
>('tooltip')

export const Popup = createLeafletComponent<PopupType, [], PopupOptions>(
  'popup',
)

export const Rectangle = createLeafletComponent<
  RectangleType,
  [LatLngBoundsExpression],
  PolylineOptions
>('rectangle')

export const Circle = createLeafletComponent<
  CircleType,
  [LatLngExpression],
  CircleMarkerOptions
>('circleMarker')

export const CircleMarker = createLeafletComponent<
  CircleMarkerType,
  [LatLngExpression],
  CircleMarkerOptions
>('circle')

export const GeoJSON = createLeafletComponent<
  GeoJSONType,
  [GeoJsonObject],
  GeoJSONOptions
>('geoJSON')
