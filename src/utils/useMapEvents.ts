import { LeafletEventHandlerFnMap, Map } from 'leaflet'
import useMapInstance from './useMapInstance'
import useEvents from './useEvents'

/**
 * Uses useEvents hook with mapInstance
 * @param events Leaflet event handlers, check https://leafletjs.com/reference-1.6.0.html#map-event
 */
export default (events?: LeafletEventHandlerFnMap) => {
  const mapInstance = useMapInstance()
  useEvents<Map>(mapInstance, events)
}
