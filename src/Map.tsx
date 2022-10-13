import L, { LeafletEventHandlerFnMap, MapOptions } from 'leaflet'
import React, {
  FunctionComponent,
  HTMLProps,
  ReactChildren,
  useEffect,
  useRef,
  useState,
} from 'react'
import MapContext from './MapContext'
import useEvents from './utils/useEvents'
import useMapInstance from './utils/useMapInstance'

interface MapContentProps {
  children?: ReactChildren
  events?: LeafletEventHandlerFnMap
}

const MapContent: FunctionComponent<MapContentProps> = ({
  children,
  events,
}) => {
  const mapInstance = useMapInstance()

  useEvents(mapInstance, events)

  return <>{children}</>
}

export interface MapProps {
  events?: LeafletEventHandlerFnMap
  options?: MapOptions
  setInstance?: (instance: L.Map) => void
}

const Map: FunctionComponent<HTMLProps<HTMLDivElement> & MapProps> = ({
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
        <MapContext.Provider value={{ mapInstance }}>
          <MapContent events={events}>{children}</MapContent>
        </MapContext.Provider>
      )}
    </>
  )
}

export default Map
