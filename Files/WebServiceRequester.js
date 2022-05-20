const BASE_URL = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPIELPLATZPUNKTOGD&srsName=EPSG:4326&outputFormat=json";

function requestPlaygroundData () {
    const jData = fetch(BASE_URL)
        .then(response => response.json())
        .then((data) => {
            return data;
        });

    const saveData = async () => {
        const data = await jData;
        return data;
    };
    return saveData();
}



/*

document.addEventListener("DOMContentLoaded", function (event) {
    requestPlaygroundData();
});*/
