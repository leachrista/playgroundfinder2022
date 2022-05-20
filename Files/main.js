function displayPlaygrounds(pgData) {
    let pTest = document.querySelector("main p");
    pTest.textContent=pgData.toString();
    let pgList = document.querySelector("main ul");
    //const pgData = ;
    for (let i = 0; i < 10; i++) {
        let pgLi = document.createElement("li");
        pgLi.textContent = pgData.features[i].properties.ANL_NAME;
        pgList.append(pgLi);
    }
}