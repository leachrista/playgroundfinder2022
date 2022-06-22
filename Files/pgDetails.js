const DETAILS_URL = "http://localhost:3000/api/playgrounds";
let editFlag = false;

document.addEventListener("DOMContentLoaded", function (event) {
    const pgId = new URLSearchParams(window.location.search).get("pgId");
    if(pgId) {
        getDetails(pgId);
    }
    document.querySelector("#revText").value = "";
});

async function getDetails (pgId) {
    const url = DETAILS_URL + "/" + pgId;
    console.log(url.toString());
    const detailsP = await fetch(url.toString());
    const detailsData = await detailsP.json();
    console.log(detailsData);

    document.querySelector("#name").textContent = detailsData[0].name;
    document.querySelector("#location").textContent = detailsData[0].district + ". Bezirk";
    document.querySelector("#image").src = "Images/Playground1.jpg";
    const reviewList = document.querySelector("#reviews");
    reviewList.innerHTML = "";
    if (!detailsData[1]) {
        const revLi = document.createElement("li");
        revLi.textContent ="There are no reviews yet - why not write one?";
        reviewList.append(revLi);
    } else {
        detailsData[1].reviews.forEach(rev => {
            appendReview(rev.user, rev.text, rev.revId); // take the data for 1 review, make a review from it, add it to the list
        });
    }
    console.log(detailsData);
}

function appendReview(user, text, revId) {
    const revLi = document.createElement("li");
    const revName = document.createElement("h3");
    revName.textContent = user;
    const revTxt = document.createElement("p");
    revTxt.textContent = text;
    revLi.append(revName, revTxt);
    revLi.id = revId;
    if(user === localStorage.getItem("user")) {
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => {
            onEditButtonClick(revId, text);
        };
        revLi.append(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => {
            onDeleteButtonClick(revId);
        };
        revLi.append(deleteButton);
    }
    document.querySelector("#reviews").append(revLi);
    console.log(revLi);
}

function onEditButtonClick(revId, revText) {
    console.log("Edit button clicked");
    editFlag = revId;
    document.querySelector("#revText").value = revText;
    document.querySelector("#postButton").textContent = "Edit";
    const container = document.querySelector("#writeReview p");
    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.id = "cancel"
    cancelButton.onclick = () =>{
        document.querySelector("#revText").value = "";
        document.querySelector("#postButton").textContent = "Post";
        editFlag = false;
        cancelButton.remove();
    }
    container.insertBefore(cancelButton, document.querySelector("#postButton"));
}

function onDeleteButtonClick(revId) {
    console.log("Delete button clicked");
    const pgId = new URLSearchParams(window.location.search).get("pgId");
    deleteReview(pgId, revId);
}

function onPostReviewButtonClick() {
    const revText = document.querySelector("#revText").value;
    const errorContainer = document.querySelector("#errorContainer")
    if (revText.length < 10) {
        errorContainer.textContent = "Please write a bit more!"
    } else {
        errorContainer.textContent = "";
        document.querySelector("#revText").value = "";
        const pgId = new URLSearchParams(window.location.search).get("pgId");

        if(editFlag) {
            console.log("calling editReview with " + revText + " for pg review " + editFlag);
            editReview(revText, pgId, editFlag);
        } else {
            console.log("calling submitReview with " + revText + " for pg " + pgId);
            submitReview(revText, pgId);
        }
    }
}

async function submitReview(revText, pgId) {
    const revData = {
        user: localStorage.getItem("user"),
        pgId: pgId,
        revText: revText
    }
    const resp = await fetch("http://localhost:3000/api/reviews/post", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(revData)
    })

    // reload reviews
    getDetails(pgId);
}

async function editReview(revText, pgId, revId) {
    const revData = {
        user: localStorage.getItem("user"),
        pgId: pgId,
        revText: revText,
        revId: revId
    }
    const resp = await fetch("http://localhost:3000/api/reviews/edit", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(revData)
    });

    // reload reviews
    getDetails(pgId);
}

async function deleteReview(pgId, revId) {
    const revData = {
        user: localStorage.getItem("user"),
        pgId: pgId,
        revId: revId
    }
    const resp = await fetch("http://localhost:3000/api/reviews/delete", { //fetch request wird abgeschickt
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(revData)//es macht aus Objekt ein json String
    });

    // reload reviews
    getDetails(pgId);
}