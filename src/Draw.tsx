import React from 'react'
import 'leaflet-draw'
import 'leaflet-draw/dist/leaflet.draw.css'
import useLeafletInstance from './useMapInstance'

const Draw = () => {
  const { mapInstance, L } = useLeafletInstance()

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
