import LineString from 'ol/geom/LineString'
import Draw from 'ol/interaction/Draw'
import {getLength} from 'ol/sphere'
import Overlay from 'ol/Overlay'

const measurementToolsMenu = document.getElementById('measurementToolsMenu')

const calculateArea = document.getElementById('calculateArea')
const calculateDistance = document.getElementById('calculateDistance')
const deleteAllMeasurements = document.getElementById('deleteAllMeasurements')
const measureNothing = document.getElementById('measureNothing')

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    measurementToolsMenu.onclick = () => {
      const measurementContainer = document.getElementById('measurementContainer')
      const style = measurementContainer.style
    
      if (style.display === 'flex')
        style.display = 'none'
      else
        style.display = 'flex'
    }

    let shape = 'NONE'
    let draw = ''
    let sketch = ''

    let measurementTooltipElement = ''
    let measurementTooltip = ''

    let helpTooltipElement = ''
    let helpTooltip = ''
    let continueDrawLineMsg = 'Click to continue drawing Line'

    const pointerMoveHandler = e => {
      if (e.dragging) return

      let helpMessage = "Click to start Drawing"

      if (sketch) {
        helpMessage = continueDrawLineMsg
      }

      helpTooltipElement.innerHTML = helpMessage
      helpTooltip.setPosition(e.coordinate)
      helpTooltipElement.classList.remove('hidden')
    }

    const createHelpTooltip = () => {
      helpTooltipElement = document.createElement('div')
      helpTooltipElement.className = 'ol-tooltip hidden'
      helpTooltip = new Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
      })

      map.addOverlay(helpTooltip)
    }

    const createMeasurementTooltip = () => {
      if (measurementTooltipElement) {
        measurementTooltipElement.parentNode.removeChild(measurementTooltipElement)
      }
      measurementTooltipElement = document.createElement('div')
      measurementTooltipElement.className = 'ol-tooltip ol-tooltip-measure'

      measurementTooltip = new Overlay({
        element: measurementTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
      })
      map.addOverlay(measurementTooltip)
    }

    const calculateLength = line => {
      const length = getLength(line)
      let output
      if (length >100) {
        output = Math.round((length / 1000) * 100) / 100 + ' km'
       }
       else {
        output = Math.round(length * 100) / 100 + ' m'
       }
      return output
    }

    const addInteraction = () => {
      if (shape !== 'NONE') {
        //DRAW SHAPE
        draw = new Draw({
          source: measurementVectorSource,
          type: shape
        })
      } else return null

      map.on('pointermove', pointerMoveHandler)
      map.addInteraction(draw)
      createMeasurementTooltip()
      createHelpTooltip()

      let listener = ''

      draw.on('drawstart', function(e) {
        sketch = e.feature

        let tooltipCoordinate = e.coordinate

        listener = sketch.getGeometry().on('change', function(e) {
          const geom = e.target
          let output = ''
          if (geom instanceof LineString) {
            output = calculateLength(geom)
            // console.log("output=", output)
            tooltipCoordinate = geom.getLastCoordinate()
          }
          measurementTooltipElement.innerHTML = output
          measurementTooltip.setPosition(tooltipCoordinate)
        })
      })

      draw.on('drawend', function(e) {
        console.log("Finished")
      })
    }
    
    calculateArea.onclick = () => {
      shape = 'Polygon'
      console.log("CalculateArea:", shape)
    }
    
    calculateDistance.onclick = () => {
      shape = 'LineString'
      addInteraction()
    }
    
    deleteAllMeasurements.onclick = () => {
      shape = 'NONE'
      console.log("deleteAllMeasurements")
    }
    
    measureNothing.onclick = () => {
      shape = 'NONE'
      console.log("measureNothing")
    }
  }
}
