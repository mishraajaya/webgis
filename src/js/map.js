import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'

import { transform } from 'ol/proj'
import OSM from 'ol/source/OSM'
import { createStringXY } from 'ol/coordinate'
import { defaults, MousePosition } from 'ol/control'
import OverviewMap from 'ol/control/OverviewMap'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'

import { Stroke, Style, Fill, Circle as CircleStyle } from 'ol/style'


const centerCoordinate = transform([83.87, 28.23], 'EPSG:4326', 'EPSG:3857')

const mapBoundary = [78.05, 26.05, 89.00, 31.05]

const view = new View({
  zoom: 5,
  center: centerCoordinate,
  extent: mapBoundary,
  projection: 'EPSG:4326'
})

vectorSource = new VectorSource()
measurementVectorSource = new VectorSource()

const vectorDrawingLayer = new VectorLayer({
  source: vectorSource,
  zIndex: 1001
})

const vectorMeasurementLayer = new VectorLayer({
  source: measurementVectorSource,
  style: new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new Stroke({
      color: '#ff0000',
      width: 3
    }),
    image: new CircleStyle({
      radius: 4,
      fill: new Fill({
        color: "#ff0000"
      })
    })
  }),
  zIndex: 1001
})

const mousePositionControl = new MousePosition({
  projection: 'EPSG:4326',
  target: 'mouseLocation',
  coordinateFormat: createStringXY(2)
})

const overviewMapControl = new OverviewMap({
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ]
})

map = new Map({
  target: 'map', // id of a div in index.html
  view: view,
  layers: [vectorDrawingLayer, vectorMeasurementLayer],
  controls: defaults().extend([mousePositionControl, overviewMapControl])
})
