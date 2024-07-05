const map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



const hikeNames =["balkanPeaks","kerryWay"]

function formatName(name){
    name.split("").forEach((char) => {
        if (char === char.toUpperCase()){
            const indexUpper = name.indexOf(char)
            name = `${name[0].toUpperCase()}${name.slice(1,indexUpper)} ${name.slice(indexUpper)}`;     
        }
    })
    return name;
}


function addLocation(name){
    const location = omnivore.kml(`hikes\\${name}.kml`).addTo(map);
    return location
}



/*Inputs addButton:
    - name: string
    - htmlElement: string
    - location: leaflet location
*/
function addButton(name, htmlElement, location){
    const button = document.createElement("button");
    button.type = "button";
    button.id = "name";
    button.className = htmlElement;
    button.onclick = function() {zoomToLocation(location);};
    button.innerText = formatName(name);
    buttons.append(button);
    button.style.backgroundImage=`url("fotos/${name}.jpeg")`
}


hikeNames.forEach((hike) => {
    addButton(hike, "sidebar_button", addLocation(hike))
    
})


    


const height = window.screen.height
console.log(height)
