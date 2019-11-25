// import React from 'react'
// import L, { GeoJSONOptions } from 'leaflet'
// import { GeoJsonObject } from 'geojson'
// import useMapInstance from './useLeafletMap'
//
// const TileLayer: React.FC<{
//   geojson?: GeoJsonObject
//   options?: GeoJSONOptions<any>
// }> = ({ geojson, options }) => {
//   const { mapInstance } = useMapInstance()
//   const [geoJSONInstance, setGeoJSONInnstance] = React.useState(null)
//
//   React.useEffect(() => {
//     if (mapInstance) {
//       setGeoJSONInnstance(L.geoJSON().addTo(mapInstance))
//     }
//   }, [mapInstance, options])
//
//   React.useEffect(() => {
//     if (geojson && geoJSONInstance) {
//       geoJSONInstance.addData(geojson)
//     }
//   }, [geojson])
//
//   return null
// }
//
// export default TileLayer
