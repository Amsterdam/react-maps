import { LeafletEventHandlerFnMap, Map } from 'leaflet'
import { useEffect, useMemo } from 'react'
import { AllLeafletInstances } from '../types'
import useMapInstance from './useMapInstance'

/**
 * @example
 * useEvents(markerInstance, {
 *   click: (e) => {
 *    console.log('Clicked!', e.latlng)
 *   }
 * })
 *
 * @param instance The leaflet instance
 * @param events Leaflet event handlers, check https://leafletjs.com/reference-1.6.0.html#map-event
 */
const useEvents = <T extends AllLeafletInstances | Map>(
  instance: T,
  events?: LeafletEventHandlerFnMap,
): void => {
  let mapInstance = useMapInstance()

  if (instance instanceof Map) {
    mapInstance = instance
  }

  // The eventsArray should only be set once
  const eventsArray = useMemo(() => Object.entries(events || {}), [])

  useEffect(() => {
    eventsArray.forEach(([eventName, method]) => {
      if (instance) {
        try {
          instance.on(eventName, method)
        } catch {
          // eslint-disable-next-line no-console
          console.warn(
            `Unable to use event, perhaps the '${eventName}' event doesn't exist`,
          )
        }
      }
    })

    return () => {
      eventsArray.forEach(([eventName, method]) => {
        if (instance) {
          instance.off(eventName, method)
        }
      })
    }
  }, [mapInstance, eventsArray]) // `instance` cannot be included in the dependency array as React cannot compare classes for updates
}

export default useEvents
