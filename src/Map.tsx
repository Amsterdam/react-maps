import React, { useEffect, useRef } from 'react'
import L, {
  LeafletEventHandlerFnMap,
  MapOptions,
  Map as MapType,
} from 'leaflet'
import MapContext from './MapContext'
import useEvents from './utils/useEvents'

export interface MapProps {
  events?: LeafletEventHandlerFnMap
  options?: MapOptions
}

const Map: React.FC<React.HTMLProps<HTMLDivElement> & MapProps> = ({
  children,
  events,
  options,
  ...otherProps
}) => {
  const [mapInstance, setMapInstance] = React.useState<L.Map | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  // Set events
  useEvents<MapType>(mapInstance, events)

  useEffect(() => {
    if (mapRef.current !== null) {
      setMapInstance(new L.Map(mapRef.current, options))
    }
  }, [])

  return (
    <MapContext.Provider
      value={{
        mapInstance,
      }}
    >
      <div ref={mapRef} {...otherProps} />
      {children}
    </MapContext.Provider>
  )
}

export default Map
