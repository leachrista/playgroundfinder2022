const PG_ALL_URL ="http://localhost:3000/api/pg-data";
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/3.0/onecall"
// TODO: move key to non-staged file
const WEATHER_API_KEY = "d1fd8e5063ff44d3f4e498c992c89705";

document.addEventListener("DOMContentLoaded", function (event) {
    getPgDataFromServer();
});

async function getWeatherData (lat, long) {
    const url = WEATHER_BASE_URL + "?lat=" + lat + "&long=" + long + "&appid=" + WEATHER_API_KEY;
        //?lat={lat}&lon={lon}&exclude={part}&appid={API key}
}

async function getPgDataFromServer() {

        fetch (PG_ALL_URL)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                displayPlaygrounds(data);

        })
}


function displayPlaygrounds(pgData) {
    console.log("... displaying response");
    let top3Div = document.querySelector("#top3 div");
    for (let i = 0; i < 3; i++) {
        let pgArt = document.createElement("article");
        let pgImg = document.createElement("img");
        pgImg.src = "Images/Playground1.jpg";
        pgArt.append(pgImg, pgData[i].name, ", ", pgData[i].district, ". Bezirk")
        top3Div.append(pgArt);
    }

}