const PG_ALL_URL ="http://localhost:3000/api/pg-data";
const WEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5/forecast"
// TODO: move key to non-versioned file
const WEATHER_API_KEY = "d1fd8e5063ff44d3f4e498c992c89705";

document.addEventListener("DOMContentLoaded", function (event) {
    getPgDataFromServer();
    getWeatherData(48.2082, 16.3738);
    const user = localStorage.getItem("user");

    const navBar = document.querySelector("nav ul");
    const item = document.createElement("li");
    const anchor = document.createElement("a");
    if (!user) {
        anchor.href = "login2.html";
        anchor.textContent = "LOGIN";
    } else {
        anchor.href = "profile.html";
        anchor.textContent = user;
        //anchor.onclick = logout()
    }
    item.append(anchor);
    navBar.append(item);
});

async function getWeatherData (lat, long) {
    const url = new URL(WEATHER_BASE_URL);
    url.searchParams.append("lat", lat);
    url.searchParams.append("lon",long);
    url.searchParams.append( "appid", WEATHER_API_KEY);

    const weatherRes = await fetch(url.toString());
    const weather = await weatherRes.json();
    //  http://openweathermap.org/img/wn/10d@2x.png
    console.log(weather.list[1]);
    const weatherIMG = document.querySelector("#weather img");
    weatherIMG.src =  "http://openweathermap.org/img/wn/" + weather.list[1].weather[0].icon + "@2x.png";
    const weatherP = document.createElement("p");
    weatherP.textContent = weather.list[1].dt_txt;
    const weatherDiv = document.querySelector("#weather")
    weatherDiv.append(weatherP);
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
        pgArt.id = pgData[i].pgId;
        let pgImg = document.createElement("img");
        pgImg.src = "Images/Playground1.jpg";
        let pgA = document.createElement("a");
        pgA.href = "pgDetails.html?pgId=" + pgData[i].pgId;
        pgA.textContent = pgData[i].name + ", " + pgData[i].district + ". Bezirk"
        pgArt.append(pgImg, pgA)
        top3Div.append(pgArt);
    }

}