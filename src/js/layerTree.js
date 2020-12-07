const mapLayersMenu = document.getElementById('mapLayersMenu')

mapLayersMenu.onclick = () => {
  const mapContainerId = document.getElementById('layerTreeContainer');
  const style = mapContainerId.style.display;

  if (style === 'flex')
   mapContainerId.style.display = 'none';
  else
   mapContainerId.style.display = 'flex';
}

const nepalBoundaryId = document.getElementById('nepalBoundary')
const stateBoundaryId = document.getElementById('stateBoundary')

nepalBoundaryId.onclick = () => {
  nepalBoundaryLayer.setVisible(!nepalBoundaryLayer.getVisible())
}

stateBoundaryId.onclick = () => {
  stateBoundaryLayer.setVisible(!stateBoundaryLayer.getVisible())
}
