import { useContext } from 'react'
import MapContext from '../MapContext'

const useMapInstance = () => {
  const { mapInstance } = useContext(MapContext)

  if (!mapInstance) {
    throw new Error(
      'Unable to retrieve map instance, no provider could be found for the MapContext.',
    )
  }

  return mapInstance
}

export default useMapInstance
