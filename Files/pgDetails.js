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
    console.log(url.toString());
    const detailsP = await fetch(url.toString());
    const detailsData = await detailsP.json();
    console.log(detailsData);

    document.querySelector("#name").textContent = detailsData[0].name;
    document.querySelector("#location").textContent = detailsData[0].district + ". Bezirk";
    document.querySelector("#image").src = "Images/Playground1.jpg";
    const reviewList = document.querySelector("#reviews");
    console.log(detailsData[1].reviews.length);
    console.log(detailsData[1].reviews);
    detailsData[1].reviews.forEach(rev => {
        const revLi = document.createElement("li");
        const revName = document.createElement("h3");
        revName.textContent = rev.user;
        const revTxt = document.createElement("p");
        revTxt.textContent = rev.text;
        revLi.append(revName, revTxt);
        reviewList.append(revLi);
        console.log(revLi);
    })
}