import React, { useCallback } from 'react'
import L, { LeafletEventHandlerFn } from 'leaflet'
import useAddToMapInstance from './utils/useAddToMapInstance'
import useEvents from './utils/useEvents'
import { AllLeafletInstances } from './types'

/**
 * Returns a React component wrapped around a Leaflet component / instance and adds it to the MapInstance
 * @param leafletComponentName The name of the Leaflet component (eg. to use L.imageOverlay, the leafletComponentName should be 'imageOverlay')
 */
function createLeafletComponent<
  T extends AllLeafletInstances,
  U extends Array<any>,
  V
>(leafletComponentName: string) {
  type Props = {
    args?: U
    options?: V
    setInstance?: (instance: T) => void
    events?: { [key: string]: LeafletEventHandlerFn }
    customAdd?: (instance: T, mapInstance: L.Map) => T
  }

  /**
   * @param events {Object} An object to bind leaflet events to own methods
   * @param args {Array} The first arguments to be given to the leaflet component
   * @param options The component options
   * @param setInstance Use this callback to set the state of the component instance, so you can call leaflet methods on it eg. MarkerInstance.bindPopup()...
   * @param customAdd If you want to call methods of the component before adding it to the map, or you need to use a different method to add a component to the map,
   * you can use this callback function
   * @constructor
   */
  const LeafletComponent: React.FC<Props> = ({
    events,
    args = [],
    options = [],
    setInstance,
    customAdd,
  }) => {
    const instance: T = L[leafletComponentName](...[...args, options])

    useAddToMapInstance<T>(
      instance,
      // useCallback to only set the instance once
      useCallback((i: T) => {
        if (setInstance) {
          setInstance(i)
        }
      }, []),
      customAdd,
    )

    useEvents<T>(instance, events)

    return null
  }

  return LeafletComponent as React.FC<Props>
}

export default createLeafletComponent
