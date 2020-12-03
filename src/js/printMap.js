const dimensions = {
  a0: [1189, 841],
  a1: [841, 594],
  a2: [594, 420],
  a3: [420, 297],
  a4: [297, 210],
  a5: [210, 148]
}

const exportMap = document.getElementById('exportMap')

exportMap.onclick = () => {
  exportMap.disabled = true

  const pageFormat = document.getElementById('pageFormat').value
  const pageResolution = document.getElementById('pageResolution').value

  const pageDimension = dimensions[pageFormat]

  const width = Math.round((pageDimension[0] * pageResolution) / 25.4)
  const height = Math.round((pageDimension[1] * pageResolution) /25.4)

  // Test without /25.4
  // dividing to get the screen resolution
  // console.log('width=', width)
  // console.log('height=', height)
  //var mapSize = map.getSize()
  //var mapViewResoulution = map.getView().getResolution()

  const mapCanvas = document.createElement('canvas')
  mapCanvas.width = width
  mapCanvas.height = height
  const mapContext = mapCanvas.getContext('2d')

  Array.prototype.forEach.call(
    document.querySelectorAll('.ol-layer canvas'),
    function (mapCanvas) {
      if (mapCanvas.width > 0) {
        const opacity =         mapCanvas.parentNode.style.opacity
        mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity)
        if (opacity === '')
          mapContext.globalAlpha = 1
        else
          mapContext.globalAlpha = Number(opacity)

        const transform = mapCanvas.style.transform
        const matrix = transform.match(/^matrix\(([^\(]*)\)$/)[1].split(',').map(Number)
        CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix)
        mapContext.drawImage(mapCanvas, 0, 0)
      }
    }
  )

  // new jsPDF (PAGE_ORIENTATION, UNIT, FORMAT)
  const pdfMap = new jsPDF('landscape', undefined, pageFormat)
  pdfMap.addImage(
    mapCanvas.toDataURL('image/jpeg'),
    'JPEG',
    0,
    0,
    pageDimension[0],
    pageDimension[1]
  )

  pdfMap.save('map.pdf')

  //map.setSize(mapSize)
  exportMap.disabled = false
  //map.getView.setResolution(mapViewResoulution)
}