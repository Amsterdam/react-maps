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
  setInstance?: (instance: L.Map) => void
}

const Map: React.FC<React.HTMLProps<HTMLDivElement> & MapProps> = ({
  children,
  events,
  options,
  setInstance,
  ...otherProps
}) => {
  const [mapInstance, setMapInstance] = React.useState<L.Map | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  // Set events
  useEvents<MapType>(mapInstance, events)

  useEffect(() => {
    if (mapRef.current !== null) {
      const map = new L.Map(mapRef.current, options)
      setMapInstance(map)

      if (setInstance) {
        setInstance(map)
      }
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
