import TileLayer from 'ol/layer/Tile'
import { OSM, BingMaps }  from 'ol/source'

backgroundLayerOSM = new TileLayer({
  source: new OSM(),
  zIndex: -1,
  visible: false
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

const backgroundOSMMap = document.getElementById('backgroundOSMMap')
const backgroundBingMap = document.getElementById('backgroundBingMap')

const setOffAllBackgroundMap = () => {
  backgroundLayerOSM.setVisible(false)
  backgroundLayerBingAerial.setVisible(false)
}

const setVisibleOSMMap = () => {
  backgroundLayerOSM.setVisible(true)
}

const setVisibleBingMap = () => {
  backgroundLayerBingAerial.setVisible(true)
}

backgroundOSMMap.onclick = () => {
  setOffAllBackgroundMap()
  setVisibleOSMMap()
}

backgroundBingMap.onclick = () => {
  setOffAllBackgroundMap()
  setVisibleBingMap()
}

const backgroundMenu = document.getElementById('backgroundMapMenu')

backgroundMenu.onclick = () => {
  const style = document.getElementById('backgroundMapContainer').style.display
  if (style === 'flex')
    document.getElementById('backgroundMapContainer').style.display = 'none'
  else
    document.getElementById('backgroundMapContainer').style.display = 'flex'
}
