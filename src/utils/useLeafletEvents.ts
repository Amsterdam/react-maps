import { useEffect } from 'react'
import { LeafletEventHandlerFnMap, Map } from 'leaflet'
import { AllLeafletInstances } from '../types'

export default <T extends AllLeafletInstances | Map>(
  instance: T | null,
  events?: LeafletEventHandlerFnMap,
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
