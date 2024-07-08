"use strict";
// Andere manier vinden om de promises te gebruiken



/* 
Define the map and the view of the map
*/

const map = L.map('map').setView([51.505, -0.09], 13);

/* 
Add the tilelayer of openstreetmap to the map
*/
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


/*
Define the name of the hikes
*/

const hikeNames =["balkanPeaks","kerryWay"]
let arrayLocation =[]


function createInitialExtent(arr){
    return Promise.all(hikeNames.map(hike => addLocation(hike, arrayLocation)))
    .then(arr => {
        if (arr.length === 0){
        console.log("createInitialExtent inputarray length is 0")
        }
        else if (arr.length === 1) {
            return(arr[0])
        }
        else if (arr.length > 1) {
            let locationString = arr[0].getBounds()
            arr.forEach((location, i) => {
                if (i > 0){
                    locationString = locationString.extend(arr[i].getBounds())
                }
                })
            return locationString
        }
        
    })
}


/*
Format the name of the hike to nice format
Example: balkanPeaks -> Balkan Peaks
*/

function formatName(name){
    name.split("").forEach((char) => {
        if (char === char.toUpperCase()){
            const indexUpper = name.indexOf(char)
            name = `${name[0].toUpperCase()}${name.slice(1,indexUpper)} ${name.slice(indexUpper)}`;     
        }
    })
    return name;
}

/*
Add kml file to the map
*/

function addLocation(name, array) {
    return new Promise((resolve, reject) => {
        const location = omnivore.kml(`hikes/${name}.kml`).addTo(map);
        location.on('ready', function() {
            const bounds = location.getBounds();
            array.push(bounds);
            resolve(location); // Resolve the promise with the location object
        });
    });
}


/*
Inputs addButton:
    - name: string
    - htmlElement: string
    - location: leaflet location
*/
function addButton(name, htmlElement, location){
    const button = document.createElement("button");
    button.type = "button";
    button.id = name;
    button.className = htmlElement;
    button.onclick = function() {zoomToLocation(location)};
    button.innerText = formatName(name);
    buttons.append(button);
    button.style.backgroundImage=`url("fotos/${name}.jpeg")`
}


/*
Loop throught the hikenames and add a button and location for each hike
Used in addButton function
*/
hikeNames.forEach((hike) => {
    const locationPromise = addLocation(hike, arrayLocation);
    addButton(hike, "sidebar_button", locationPromise)
})


Promise.all(hikeNames.map(hike => addLocation(hike, arrayLocation)))
    .then(locations => {
        // Perform map fitting once all locations are loaded
        createInitialExtent().then(value => {map.fitBounds(value)})
    })
    .catch(error => {
        console.error('Error loading locations:', error);
    });


    
/*
Get the height of the screen
NOT USED YET
*/



const height = window.screen.height
console.log(height)

