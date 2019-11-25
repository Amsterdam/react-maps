import React, { RefObject, useEffect, useRef } from 'react'
import L, {
  Map as MapType,
  LayerGroup,
  LeafletEventHandlerFn,
  MapOptions,
} from 'leaflet'
import MapContext from './MapContext'
import useLeafletEvents from './useLeafletEvents'

type Props = {
  events?: { [key: string]: LeafletEventHandlerFn }
  options?: MapOptions
}

const Map = React.forwardRef<
  RefObject<HTMLDivElement>,
  React.HTMLProps<HTMLElement> & Props
>(({ children, events, options }, ref) => {
  const [mapInstance, setMapInstance] = React.useState<
    MapType | LayerGroup | null
  >(null)

  const mapRef = ref || useRef<HTMLDivElement>(null)

  // Set events
  useLeafletEvents(mapInstance, events)

  // Initialize
  useEffect(() => {
    // @ts-ignore
    if (mapRef && mapRef.current) {
      setMapInstance(
        // @ts-ignore
        L.map(mapRef.current, options || {}),
      )
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
          height: '300px',
        }}
      />
      {children}
    </MapContext.Provider>
  )
})

export default Map
