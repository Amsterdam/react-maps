import React, { RefObject, useEffect, useRef } from 'react'
import L, { LeafletEventHandlerFnMap, MapOptions } from 'leaflet'
import MapContext from './MapContext'
import useLeafletEvents from './utils/useLeafletEvents'
import { AllLeafletInstances } from './types'

type Props = {
  events?: LeafletEventHandlerFnMap
  options?: MapOptions
}

const Map = React.forwardRef<
  RefObject<HTMLDivElement>,
  React.HTMLProps<HTMLElement> & Props
>(({ children, events, options, ...otherProps }, ref) => {
  const [
    mapInstance,
    setMapInstance,
  ] = React.useState<AllLeafletInstances | null>(null)

  const mapRef = ref || useRef<HTMLDivElement>()

  // Set events
  useLeafletEvents(mapInstance, events)

  // Initialize
  useEffect(() => {
    // @ts-ignore
    if (mapRef && mapRef.current) {
      // @ts-ignore
      setMapInstance(L.map(mapRef.current, options || {}))
    }
  }, [])

  return (
    <MapContext.Provider
      value={{
        mapInstance,
      }}
    >
      <div
        // @ts-ignore
        ref={mapRef}
        style={{
          width: '100%',
          height: '800px',
        }}
        {...otherProps}
      />
      {children}
    </MapContext.Provider>
  )
})

export default Map
