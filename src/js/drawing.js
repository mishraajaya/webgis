import Draw from 'ol/interaction/Draw'

document.onreadystatechange = function () {
  if (document.readyState === 'complete') {
    const drawPloygon = document.getElementById('drawPolygon')
    const drawLine = document.getElementById('drawLine')
    const drawCircle = document.getElementById('drawCircle')
    const drawNothing = document.getElementById('drawNothing')
    const drawingTools = document.getElementById('drawingTools')

    drawingTools.onclick = () => {
      document.getElementById('drawingContainer').style.display = 'flex'
    }

    let shape = 'NONE'
    let draw = ''

    const addInteraction = () => {
      if (shape !== 'NONE') {
        draw = new Draw({
          source: vectorSource,
          type: shape,
          freehand: true
        })
        map.addInteraction(draw)
      }
    }

    const setInteraction = () => {
      map.removeInteraction(draw)
      addInteraction()
    }

    drawPloygon.onclick = () => {
      shape = 'Polygon'
      setInteraction()
    }

    drawLine.onclick = () => {
      shape = 'LineString'
      setInteraction()
    }

    drawCircle.onclick = () => {
      shape = 'Circle'
      setInteraction()
    }

    drawNothing.onclick = () => {
      shape = 'NONE'
      setInteraction()
      document.getElementById('drawingContainer').style.display = 'none'
    }
  }
}
