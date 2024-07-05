function zoomToLocation(location){
    const bounds = location.getBounds()
    map.fitBounds(bounds, {padding: [200,200]});
}
    
