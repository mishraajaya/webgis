const mapLayersMenu = document.getElementById('mapLayersMenu')

mapLayersMenu.onclick = () => {
  const mapContainerId = document.getElementById('layerTreeContainer');
  const style = mapContainerId.style.display;

  if (style === 'flex')
   mapContainerId.style.display = 'none';
  else
   mapContainerId.style.display = 'flex';
}