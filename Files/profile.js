document.addEventListener("DOMContentLoaded", function (event) {
    const welcome = document.querySelector("#hello");
    welcome.textContent = "Hello " + localStorage.getItem("user") + "!";
});

