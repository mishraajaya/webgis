import LineString from 'ol/geom/LineString'
import Draw from 'ol/interaction/Draw'
import {getLength} from 'ol/sphere'

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

      map.addInteraction(draw)

      let listener = ''

      draw.on('drawstart', function(e) {
        sketch = e.feature

        listener = sketch.getGeometry().on('change', function(e) {
          const geom = e.target
          let output = ''
          if (geom instanceof LineString) {
            output = calculateLength(geom)
            console.log("output=", output)
          }
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
