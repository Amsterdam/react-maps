import L, { LeafletEventHandlerFn } from 'leaflet'
import { FunctionComponent, useCallback } from 'react'
import { AllLeafletInstances } from './types'
import useAddToMapInstance from './utils/useAddToMapInstance'
import useEvents from './utils/useEvents'

export interface LeafletComponentProps<T extends AllLeafletInstances, U, V> {
  args?: U
  options?: V
  setInstance?: (instance: T) => void
  events?: { [key: string]: LeafletEventHandlerFn }
  customAdd?: (instance: T, mapInstance: L.Map) => T
}

/**
 * Returns a React component wrapped around a Leaflet component / instance and adds it to the MapInstance
 * @param leafletComponentName The name of the Leaflet component (eg. to use L.imageOverlay, the leafletComponentName should be 'imageOverlay')
 */
function createLeafletComponent<
  T extends AllLeafletInstances,
  U extends Array<unknown>,
  V
>(
  leafletComponentName: string,
): FunctionComponent<LeafletComponentProps<T, U, V>> {
  /**
   * @param events {Object} An object to bind leaflet events to own methods
   * @param args {Array} The first arguments to be given to the leaflet component
   * @param options The component options
   * @param setInstance Use this callback to set the state of the component instance, so you can call leaflet methods on it eg. MarkerInstance.bindPopup()...
   * @param customAdd If you want to call methods of the component before adding it to the map, or you need to use a different method to add a component to the map,
   * you can use this callback function
   * @constructor
   */
  const LeafletComponent: FunctionComponent<LeafletComponentProps<T, U, V>> = ({
    events,
    args = [],
    options = [],
    setInstance,
    customAdd,
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    const instance: T = L[leafletComponentName](...[...args, options])
    // useCallback to only set the instance once
    const setInstanceCallback = useCallback((i: T) => {
      if (setInstance) {
        setInstance(i)
      }
    }, [])

    useAddToMapInstance<T>(
      instance,
      // useCallback to only set the instance once
      setInstanceCallback,
      customAdd,
    )

    useEvents<T>(instance, events)

    return null
  }

  return LeafletComponent
}

export default createLeafletComponent
