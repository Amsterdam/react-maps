import React, { useEffect, useRef } from 'react'
import L, { LeafletEventHandlerFnMap, MapOptions } from 'leaflet'
import MapContext from './MapContext'
import useMapEvents from './utils/useMapEvents'

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
  useMapEvents(events)

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
