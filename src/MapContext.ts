import React from 'react'
import { Map } from 'leaflet'

const MapContext = React.createContext<{ mapInstance: Map | null }>({
  mapInstance: null,
})

export default MapContext
