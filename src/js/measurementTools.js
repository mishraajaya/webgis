const measurementToolsMenu = document.getElementById('measurementToolsMenu')

const calculateArea = document.getElementById('calculateArea')
const calculateDistance = document.getElementById('calculateDistance')
const deleteAllMeasurements = document.getElementById('deleteAllMeasurements')
const measureNothing = document.getElementById('measureNothing')

measurementToolsMenu.onclick = () => {
  const measurementContainer = document.getElementById('measurementContainer')
  const style = measurementContainer.style

  if (style.display === 'flex')
    style.display = 'none'
  else
    style.display = 'flex'
}

calculateArea.onclick = () => {
  console.log("CalculateArea")
}

calculateDistance.onclick = () => {
  console.log("calculateDistance")
}

deleteAllMeasurements.onclick = () => {
  console.log("deleteAllMeasurements")
}

measureNothing.onclick = () => {
  console.log("measureNothing")
}