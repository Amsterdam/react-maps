import { useEffect } from 'react'
import { LayerGroup, LeafletEventHandlerFn, Map } from 'leaflet'

export default (
  mapInstance: Map | LayerGroup | null,
  events?: { [key: string]: LeafletEventHandlerFn },
) => {
  useEffect(() => {
    const eventsArray = Object.entries(events || {})
    if (eventsArray.length) {
      eventsArray.forEach(([eventName, method]) => {
        if (mapInstance) {
          try {
            mapInstance.on(eventName, method)
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
          if (mapInstance) {
            mapInstance.off(eventName, method)
          }
        })
      }
    }
  }, [mapInstance, events])
}
