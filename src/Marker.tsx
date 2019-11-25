import React, { useEffect } from 'react'
import L, {
  LatLngExpression,
  Marker as MarkerType,
  MarkerOptions,
} from 'leaflet'
import useMapInstance from './useMapInstance'

type Props = {
  latlng: LatLngExpression
  options?: MarkerOptions
}

const Marker: React.FC<Props> = ({ latlng, options }) => {
  const [markerInstance, setMarkerInstance] = React.useState<MarkerType | null>(
    null,
  )
  const { mapInstance } = useMapInstance()

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
