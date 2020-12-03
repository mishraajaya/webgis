import TileWMS from 'ol/source/TileWMS'
import TileLayer from 'ol/layer/Tile'

const geoserverURL = 'http://localhost:8080/geoserver/OrchidGIS/wms'

nepalBoundaryLayer = new TileLayer({
  opacity: 0.3,
  source: new TileWMS({
    url: geoserverURL,
    params: {
      'layers': 'OrchidGIS:nepal_boundary'
    }
  }),
  visible: false
})

stateBoundaryLayer = new TileLayer({
  opacity: 1,
  source: new TileWMS({
    url: geoserverURL,
    params: {
      'layers': 'OrchidGIS:state_boundary'
    }
  }),
  visible: false
})


map.addLayer(stateBoundaryLayer)
map.addLayer(nepalBoundaryLayer)