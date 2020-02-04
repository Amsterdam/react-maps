import { Map } from 'leaflet'
import { useEffect, useState } from 'react'
import useMapInstance from './useMapInstance'
import { AllLeafletInstances } from '../types'

export default <T extends AllLeafletInstances>(
  instance: T,
  setInstance: Function,
  customAdd?: (instance: T, mapInstance: Map) => T,
) => {
  const mapInstance = useMapInstance()
  const [componentInstance, setComponentInstance] = useState<
    AllLeafletInstances
  >()

  // Cleanup
  useEffect(
    () => () => {
      if (
        mapInstance &&
        componentInstance &&
        mapInstance.hasLayer(componentInstance)
      ) {
        componentInstance.removeFrom(mapInstance)
      }
    },
    [componentInstance, mapInstance],
  )

  // Add to map instance
  useEffect(() => {
    if (mapInstance && !componentInstance) {
      setComponentInstance(
        customAdd
          ? customAdd(instance, mapInstance)
          : instance.addTo(mapInstance),
      )
    }
  }, [instance, mapInstance, setInstance])

  // Call setInstance when componentInstance is set
  useEffect(() => {
    if (setInstance && componentInstance) {
      setInstance(componentInstance)
    }
  }, [componentInstance, setInstance])
}
