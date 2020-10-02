import TileWMS from 'ol/source/TileWMS'
import TileLayer from 'ol/layer/Tile'

const geoserverURL = 'http://localhost:8080/geoserver/OrchidGIS/wms'

nepalBoundaryLayer = new TileLayer({
  opacity: 0.1,
  source: new TileWMS({
    url: geoserverURL,
    params: {
      'layers': 'OrchidGIS:nepal_boundary'
    }
  })
})

map.addLayer(nepalBoundaryLayer)