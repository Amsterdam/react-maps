import { useEffect, useState } from 'react'
import useMapInstance from './useMapInstance'
import { AllLeafletInstances } from '../types'

export default <T extends AllLeafletInstances>(
  instance: Partial<AllLeafletInstances>,
  setInstance: Function,
) => {
  const mapInstance = useMapInstance()
  const [myInstance, setMyInstance] = useState<T>()

  useEffect(() => {
    if (mapInstance && !myInstance && instance.addTo) {
      setMyInstance(instance.addTo(mapInstance) as T)
    }
  }, [instance, mapInstance, setInstance])

  useEffect(() => {
    if (setInstance && myInstance) {
      setInstance(myInstance)
    }
  }, [myInstance, setInstance])
}
