const BASE_URL = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPIELPLATZPUNKTOGD&srsName=EPSG:4326&outputFormat=json";

function requestPlaygroundData () {
    const jData = fetch(BASE_URL)
        .then(response => response.json())
        .then((data) => {
            return data;
        });

    const printData = async () => {
        const data = await jData;
        displayPlaygrounds(data);
    };

    printData();
}

function displayPlaygrounds(pgData) {
    let pTest = document.querySelector("main p");
    pTest.textContent=pgData.toString();
    let pgList = document.querySelector("main ul");
    for (let i = 0; i < 10; i++) {
        let pgLi = document.createElement("li");
        pgLi.textContent = pgData.features[i].properties.ANL_NAME;
        pgList.append(pgLi);
    }
}

/*

document.addEventListener("DOMContentLoaded", function (event) {
    requestPlaygroundData();
});*/
