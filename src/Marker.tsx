import React, { useEffect } from 'react'
import L, {
  LatLngExpression,
  LeafletEventHandlerFn,
  Marker as MarkerType,
  MarkerOptions,
} from 'leaflet'
import useMapInstance from './useMapInstance'
import useLeafletEvents from './useLeafletEvents'

type Props = {
  latlng: LatLngExpression
  options?: MarkerOptions
  events?: { [key: string]: LeafletEventHandlerFn }
}

const Marker: React.FC<Props> = ({ latlng, events, options }) => {
  const [markerInstance, setMarkerInstance] = React.useState<MarkerType | null>(
    null,
  )
  const { mapInstance } = useMapInstance()

  useEffect(() => {
    if (markerInstance) {
      useLeafletEvents(markerInstance, events)
    }
  }, [markerInstance])

  // add marker
  useEffect(() => {
    if (markerInstance) {
      markerInstance.setLatLng(latlng)
    } else if (mapInstance) {
      setMarkerInstance(L.marker(latlng, options).addTo(mapInstance))
    }
  }, [latlng, mapInstance, markerInstance])

  return null
}

export default Marker
