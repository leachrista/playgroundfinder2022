const BASE_URL ="http://localhost:63847";

function getPgDataFromServer() {
    console.log("preparing to fetch...")
    fetch (BASE_URL)
        .then(response => response.json())
        .then((data) => {
            return data;
        });

    const displayData = async () => {
        console.log("... awaiting response...")
        const data = await jData;
        return data;
    };

    displayPlaygrounds(displayData());
}


function displayPlaygrounds(pgData) {
    console.log("... displaying response")
    let pTest = document.querySelector("main p");
    pTest.textContent=pgData.toString();
    let pgList = document.querySelector("main ul");
    for (let i = 0; i < 10; i++) {
        let pgLi = document.createElement("li");
        pgLi.textContent = pgData.features[i].properties.ANL_NAME;
        pgList.append(pgLi);
    }
}