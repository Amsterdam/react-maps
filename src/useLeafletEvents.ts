import { useEffect } from 'react'
import { LayerGroup, LeafletEventHandlerFn, Map, Marker } from 'leaflet'

export default (
  instance: Map | LayerGroup | Marker | null,
  events?: { [key: string]: LeafletEventHandlerFn },
) => {
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
  }, [instance, events])
}
