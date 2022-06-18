const BASE_URL ="http://localhost:3000/api/pg-data";

document.addEventListener("DOMContentLoaded", function (event) {
    getPgDataFromServer();
});

async function getPgDataFromServer() {

        fetch (BASE_URL)
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