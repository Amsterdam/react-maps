import React, { useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import Map from '../Map'
import { TileLayer, Marker, Rectangle, Circle, Popup } from '..'

const App = () => {
  const [markerInstance, setMarkerInstance] = React.useState()
  const [circleInstance, setCircleInstance] = React.useState()
  const [markerPosition, setMarkerPosition] = React.useState({
    lat: 52.3731081,
    lng: 4.8932945,
  })
  const [circleRadius, setCircleRadius] = React.useState(300)

  const { lat, lng } = markerPosition

  function moveMarker() {
    setMarkerPosition({
      lat: lat + 0.0001,
      lng: lng + 0.0001,
    })
  }

  useEffect(() => {
    if (markerInstance) {
      markerInstance.setLatLng(markerPosition)
    }
  }, [markerPosition])

  useEffect(() => {
    if (circleInstance) {
      circleInstance.setRadius(circleRadius)
    }
  }, [circleRadius])

  return (
    <>
      <Map
        events={{
          zoomend: () => {
            // eslint-disable-next-line no-console
            console.log('zoomend')
          },
          click: () => {
            // eslint-disable-next-line no-console
            console.log('click')
          },
        }}
        style={{
          width: '100%',
          height: '100vh',
        }}
        options={{
          center: [52.3731081, 4.8932945],
          zoom: 16,
          maxBounds: [
            [52.25168, 4.64034],
            [52.50536, 5.10737],
          ],
        }}
      >
        <Marker
          setInstance={setMarkerInstance}
          options={{
            icon: L.icon({
              iconUrl: require('leaflet/dist/images/marker-icon.png').default,
              iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png')
                .default,
              shadowUrl: require('leaflet/dist/images/marker-shadow.png')
                .default,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              tooltipAnchor: [16, -28],
              shadowSize: [41, 41],
            }),
          }}
          args={[markerPosition]}
        />
        <Popup
          customAdd={(popup, mapInstance) => {
            return popup
              .setLatLng([52.3731081, 4.8932945])
              .setContent('<p>Hello world!<br />This is a nice popup.</p>')
              .openOn(mapInstance)
          }}
        />
        <Rectangle
          args={[
            [
              [52.3731081, 4.8932945],
              [52.4731081, 4.9932945],
            ],
          ]}
          options={{ color: '#ff7800', weight: 1 }}
        />
        <Circle
          setInstance={setCircleInstance}
          options={{ color: '#ff7800', weight: 1, radius: circleRadius }}
          args={[[52.3721081, 4.8932945]]}
        />
        <TileLayer
          options={{
            attribution:
              '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
          }}
          args={['http://{s}.tile.osm.org/{z}/{x}/{y}.png']}
        />
      </Map>
      <div>{`Current markerPosition: lat: ${lat}, lng: ${lng}`}</div>
      <button type="button" onClick={moveMarker}>
        Move marker
      </button>

      <button
        type="button"
        onClick={() => {
          setCircleRadius(c => c + 10)
        }}
      >
        Increase circle radius
      </button>
    </>
  )
}

export default App
