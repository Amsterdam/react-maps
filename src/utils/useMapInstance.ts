import React from 'react'
import MapContext from '../MapContext'

const useMapInstance = () => {
  const { mapInstance } = React.useContext(MapContext)

  return mapInstance
}

export default useMapInstance
