document.addEventListener("DOMContentLoaded", function (event) {
    const welcome = document.querySelector("#hello");
    welcome.textContent = "Hello " + localStorage.getItem("user") + "!";
});
function logoutFunktion(){
    logout
}

function logoutProfile() {
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("sessionId");
        localStorage.removeItem("user");
        window.location.href = "/";
}
