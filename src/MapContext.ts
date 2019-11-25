import React from 'react'

const value: any = {
  layers: [],
  mapRef: null,
}
const MapContext = React.createContext(value)
export default MapContext
