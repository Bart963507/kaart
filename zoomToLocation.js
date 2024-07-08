/*function zoomToLocation(location){
    console.log(location)
    const bounds = location.getBounds()
    console.log(bounds)
    map.fitBounds(bounds, {padding: [200,200]});
}*/

function zoomToLocation(locationPromise) {
    locationPromise.then(location => {
        const bounds = location.getBounds();
        map.fitBounds(bounds, { padding: [200, 200] });
    }).catch(error => {
        console.error('Error zooming to location:', error);
    });
}
    

