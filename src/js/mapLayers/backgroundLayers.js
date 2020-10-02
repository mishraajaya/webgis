import TileLayer from 'ol/layer/Tile'
import { OSM, BingMaps }  from 'ol/source'

backgroundLayerOSM = new TileLayer({
  source: new OSM(),
  zIndex: -1,
  visible: true
})

backgroundLayerBingAerial = new TileLayer({
  source: new BingMaps({
    key: 'Au6P3x_sQwFiweaibDG-oJgy4_0VlNLXITkLyM8jL0tkJw_IT7_mGUQky5wDcOJf',
    imagerySet: 'Aerial',
    maxZoom: 19
  }),
  zIndex: -2,
  visible: true
})

map.addLayer(backgroundLayerOSM)
map.addLayer(backgroundLayerBingAerial)
