import { LeafletEventHandlerFnMap } from 'leaflet'
import useEvents from './useEvents'
import useMapInstance from './useMapInstance'

/**
 * Uses useEvents hook with mapInstance
 * @param events Leaflet event handlers, check https://leafletjs.com/reference-1.6.0.html#map-event
 */
const useMapEvents = (events?: LeafletEventHandlerFnMap): void => {
  const mapInstance = useMapInstance()
  useEvents(mapInstance, events)
}

export default useMapEvents
