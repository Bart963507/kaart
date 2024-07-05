
function zoomToLocation(location){
    console.log("click")
    const bounds = location.getBounds()
    console.log(bounds)
    map.fitBounds(bounds, {padding: [200,200]});
}
    
