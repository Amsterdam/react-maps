import { useEffect, useMemo } from 'react'
import { LeafletEventHandlerFnMap, Map } from 'leaflet'
import { AllLeafletInstances } from '../types'

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
  instance: T | null,
  events?: LeafletEventHandlerFnMap,
) => {
  // The eventsArray should only be set once
  const eventsArray = useMemo(() => Object.entries(events || {}), [])

  useEffect(() => {
    if (!instance) {
      return undefined
    }
    eventsArray.forEach(([eventName, method]) => {
      try {
        // Todo: fix this without using setTimeout.
        // Apparently we need this, as instance.off seem to still be executed while calling instance.on
        setTimeout(() => {
          instance.on(eventName, method)
        })
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`${e}. Perhaps ${eventName} the event doesn't exist`)
      }
    })
    return () => {
      eventsArray.forEach(([eventName, method]) => {
        instance.off(eventName, method)
      })
    }
  }, [instance, eventsArray]) // `instance` cannot be included in the dependency array as React cannot compare classes for updates
}

export default useEvents
