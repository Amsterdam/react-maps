import React, { useEffect, useRef } from 'react'
import L, { LeafletEventHandlerFnMap, MapOptions } from 'leaflet'
import MapContext from './MapContext'
import useLeafletEvents from './utils/useLeafletEvents'

type Props = {
  events?: LeafletEventHandlerFnMap
  options?: MapOptions
}

const Map: React.FC<React.HTMLProps<HTMLDivElement> & Props> = ({
  children,
  events,
  options,
  ...otherProps
}) => {
  const [mapInstance, setMapInstance] = React.useState<L.Map | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  // Set events
  useLeafletEvents(mapInstance, events)

  // Initialize
  useEffect(() => {
    if (mapRef.current !== null) {
      setMapInstance(L.map(mapRef.current, options || {}))
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
