import { useEffect } from 'react'
import { LeafletEventHandlerFnMap, Map } from 'leaflet'
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
  instance: T | null,
  events?: LeafletEventHandlerFnMap,
) => {
  const mapInstance = useMapInstance()
  const deps = instance instanceof Map ? instance : mapInstance
  useEffect(() => {
    const eventsArray = Object.entries(events || {})
    if (eventsArray.length) {
      eventsArray.forEach(([eventName, method]) => {
        if (instance) {
          try {
            instance.on(eventName, method)
          } catch (e) {
            // eslint-disable-next-line no-console
            console.warn(`${e}. Perhaps ${eventName} the event doesn't exist`)
          }
        }
      })
    }
    return () => {
      if (eventsArray.length) {
        eventsArray.forEach(([eventName, method]) => {
          if (instance) {
            instance.off(eventName, method)
          }
        })
      }
    }
  }, [deps])
}

export default useEvents
