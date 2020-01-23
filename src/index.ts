import {
  LatLngExpression,
  Marker as MarkerType,
  MarkerOptions,
  TileLayer as TileLayerType,
  Rectangle as RectangleType,
  LayerGroup as LayerGroupType,
  Circle as CircleType,
  TileLayerOptions,
  LatLngBoundsExpression,
  PolylineOptions,
  CircleMarkerOptions,
  Layer,
  Tooltip as TooltipType,
  LayerOptions,
  ImageOverlay as ImageOverlayType,
  ImageOverlayOptions,
  TooltipOptions,
  PopupOptions,
  Popup as PopupType,
  GeoJSON as GeoJSONType,
  GeoJSONOptions,
} from 'leaflet'
import { memo } from 'react'
import { GeoJsonObject } from 'geojson'
import createLeafletComponent from './createLeafletComponent'

export { default as Map } from './Map'
export { default as useMapInstance } from './utils/useMapInstance'
export { createLeafletComponent }

export const Marker = memo(
  createLeafletComponent<MarkerType, [LatLngExpression], MarkerOptions>(
    'marker',
  ),
  () => false,
)

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
>('circle')

export const GeoJSON = createLeafletComponent<
  GeoJSONType,
  [GeoJsonObject],
  GeoJSONOptions
>('geoJSON')
