import L, { LeafletEventHandlerFnMap, MapOptions } from 'leaflet'
import React, { HTMLProps, useEffect, useRef, useState } from 'react'
import MapContext from './MapContext'
import useEvents from './utils/useEvents'

interface MapProviderProps {
  mapInstance: L.Map
  events?: LeafletEventHandlerFnMap
}

const MapProvider: React.FC<MapProviderProps> = ({
  children,
  events,
  mapInstance,
}) => {
  useEvents(mapInstance, events)

  return (
    <MapContext.Provider value={{ mapInstance }}>
      {children}
    </MapContext.Provider>
  )
}

export interface MapProps {
  events?: LeafletEventHandlerFnMap
  options?: MapOptions
  setInstance?: (instance: L.Map) => void
}

const Map: React.FC<HTMLProps<HTMLDivElement> & MapProps> = ({
  children,
  events,
  options,
  setInstance,
  ...otherProps
}) => {
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (mapRef.current === null) {
      return
    }

    const map = new L.Map(mapRef.current, options)

    setMapInstance(map)

    if (setInstance) {
      setInstance(map)
    }
  }, [])

  return (
    <>
      <div ref={mapRef} {...otherProps} />
      {mapInstance && (
        <MapProvider mapInstance={mapInstance} events={events}>
          {children}
        </MapProvider>
      )}
    </>
  )
}

export default Map
