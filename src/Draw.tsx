import React from 'react'
import L from 'leaflet'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import useMapInstance from './utils/useMapInstance'

const Draw = () => {
  const mapInstance = useMapInstance()

  React.useEffect(() => {
    if (mapInstance) {
      const drawnItems = L.featureGroup().addTo(mapInstance)

      const drawControl = new L.Control.Draw({
        edit: {
          featureGroup: drawnItems,
        },
        draw: {
          polygon: false,
          polyline: false,
          marker: false,
          circlemarker: false,
        },
      })
      mapInstance.addControl(drawControl)

      mapInstance.on(L.Draw.Event.CREATED, ({ layer }: any) => {
        drawnItems.addLayer(layer)
      })
    }
  }, [mapInstance])

  return null
}

export default Draw
