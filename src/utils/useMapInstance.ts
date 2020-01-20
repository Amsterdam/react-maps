import React from 'react'
import L from 'leaflet'
import MapContext from '../MapContext'

const useLeafletInstance = () => {
  const { mapInstance } = React.useContext(MapContext)

  return {
    mapInstance,
    L,
  }
}

export default useLeafletInstance
