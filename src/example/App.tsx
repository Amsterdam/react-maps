import React from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Map from '../Map'
import TileLayer from '../TileLayer'
import Marker from '../Marker'
import Draw from '../Draw'

const App = () => {
  const [markerPosition, setMarkerPosition] = React.useState({
    lat: 52.3731081,
    lng: 4.8932945,
  })
  const { lat, lng } = markerPosition

  function moveMarker() {
    setMarkerPosition({
      lat: lat + 0.0001,
      lng: lng + 0.0001,
    })
  }

  return (
    <>
      <Map
        events={{
          zoomend: () => {
            console.log('zoomend')
          },
          click: () => {
            console.log('click')
          },
        }}
        options={{
          center: [52.3731081, 4.8932945],
          zoom: 16,
          maxBounds: [[52.25168, 4.64034], [52.50536, 5.10737]],
        }}
      >
        <Marker
          latlng={markerPosition}
          options={{
            icon: L.icon({
              iconUrl: require('leaflet/dist/images/marker-icon.png'),
              iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
              shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              tooltipAnchor: [16, -28],
              shadowSize: [41, 41],
            }),
          }}
        />
        <TileLayer
          urlTemplate="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          options={{
            attribution:
              '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          }}
          methods={{
            openTooltip: (e: any) => {
              console.log(e)
            },
          }}
        />
        <Draw />
      </Map>
      <div>{`Current markerPosition: lat: ${lat}, lng: ${lng}`}</div>
      <button type="button" onClick={moveMarker}>
        Move marker
      </button>
    </>
  )
}

export default App
