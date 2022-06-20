const DETAILS_URL = "http://localhost:3000/api/playgrounds";

document.addEventListener("DOMContentLoaded", function (event) {
    const pgId = new URLSearchParams(window.location.search).get("pgId");
    if(pgId) {
        getDetails(pgId);
    }
});

async function getDetails (pgId) {
    //const url = new URL(DETAILS_URL);
    //url.searchParams.append("pgId", pgId);
    const url = DETAILS_URL + "/" + pgId;
    console.log(url);
    const detailsP = await fetch(url.toString());
    const detailsData = await detailsP.json();
    console.log(detailsData);

    document.querySelector("#name").textContent = detailsData[0].name;
    document.querySelector("#location").textContent = detailsData[0].district + ". Bezirk";
    document.querySelector("#image").src = "Images/Playground1.jpg";

}