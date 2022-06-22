const PG_ALL_URL ="http://localhost:3000/api/pg-data";
const WEATHER_BASE_URL = "http://api.openweathermap.org/data/2.5/forecast"
// TODO: move key to non-versioned file
const WEATHER_API_KEY = "d1fd8e5063ff44d3f4e498c992c89705";
/*
wir holen etwas von der URL MIT FETCH.
ob das von externer Ressource oder localhost ist, mach vorerst keinen Unterschied für das fetch.

wenn wir extern was nehmen, kriegen wir Daten von der Api.

Lokal kommen wir von Router->Model... Daten, welche wir über diesen Weg uns beim backend fürs frontend holen.

 */
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

async function getWeatherData (lat, long){
/*
   wir holen uns die weather api, openweathermap. wir brauchen nicht das backend, um das Wetter anzeigen zu lassen.
   Wir bauen das zugehörige Bild in die Website ein.

   fürs frontend machts keinen Unterschied wie das fetcch gelingt.
   entweder holt sich das Backend die Spielplatzdaten von der Wienwebsite holen.
   Die Spielplatzdetails werden lokal geladen.
    */
    const url = new URL(WEATHER_BASE_URL);
    url.searchParams.append("lat", lat);
    url.searchParams.append("lon",long);
    url.searchParams.append( "appid", WEATHER_API_KEY);

    const weatherRes = await fetch(url.toString());
    const weather = await weatherRes.json();
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
                //console.log(data);
                displayPlaygrounds(data);

        })
}

/*
hier werden die Spielplatzdaten die wir geholt haben dargestellt.
momentan nur als Top 3 Elemente.
 */
function displayPlaygrounds(pgData) {
    console.log("... displaying response");
    let top3Div = document.querySelector("#top3 div"); //wir holen das Element wo top 3 eingefügt werden sollen von index.html
    for (let i = 0; i < 3; i++) { //wir erstellen drei Mal Elemente für die Spielplatzdarstellung.
        let pgArt = document.createElement("article");//Container wird erstellt
        pgArt.id = pgData[i].pgId;//Container wo es reinsoll
        let pgImg = document.createElement("img");//Bilderstellung
        pgImg.src = "Images/Playground1.jpg"; //Bild befüllt
        let pgA = document.createElement("a");//Link erstellt
        pgA.href = "pgDetails.html?pgId=" + pgData[i].pgId;//Link befüllt
        pgA.textContent = pgData[i].name + ", " + pgData[i].district + ". Bezirk";
        pgArt.append(pgImg, pgA);//wir fügen alle in das Artikelelement
        top3Div.append(pgArt); //wir fügen das Artikelelement in die div mit ein
    }
 


}
function searchFunktion(){
    const comingSoon = document.createElement("h2");
    comingSoon.textContent=("coming.soon :-)");
    document.querySelector("#quicksearch").append(comingSoon);

    
}