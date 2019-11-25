import React from 'react'
import { Layer, TileLayerOptions } from 'leaflet'
import useMapInstance from './useMapInstance'
import { useLeafletMethod } from './useLeafletMethod'

const TileLayer: React.FC<{
  urlTemplate: string
  options?: TileLayerOptions
  methods?: { [key in keyof Partial<Layer>]: Function }
}> = ({ methods, urlTemplate, options }) => {
  const { mapInstance, L } = useMapInstance()

  React.useEffect(() => {
    if (mapInstance) {
      const TLInstance = L.tileLayer(urlTemplate, options || {})

      const { bindMethod } = useLeafletMethod<keyof Layer>(TLInstance)

      if (methods) {
        Object.entries(methods).forEach(([method, callback]) => {
          // @ts-ignore
          bindMethod(method, callback)
        })
      }

      bindMethod('addTo', mapInstance)
    }
  }, [mapInstance])

  return null
}

export default TileLayer
