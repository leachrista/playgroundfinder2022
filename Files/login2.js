// import "./playgroundfinder";
const LOGINURL = "http://localhost:3000/api/login";


const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const errorContainer = document.querySelector("#errorContainer");

const handleSubmit = async () => {
    //Prevent page reload

    const uname = usernameInput.value; //wir befüllen es mit einem Wert
    const pass = passwordInput.value;

    if(!uname || !pass) {
        errorContainer.innerText = "You must fill the username and password fields"; //errormeldung kann in jwt auch als 400 ausgegeben werden
        return 0;
    }

    const userData = {
        username: uname,
        password: pass
    }

    const restest = await fetch(LOGINURL, { /*await fetch('/LOGIN') starts an HTTP request to '/LOGIN' URL.
     Because the await keyword is present, the asynchronous function is paused 
    */
        method: "POST", /*
        Mit der POST-Methode können Sie große Datenmengen (wie Bilder oder HTML-Formular-Daten) 
        zur weiteren Verarbeitung zum Server senden. 
        Die Daten werden beim Absenden des Formulars mit einer POST-Anfrage an den Server geschickt.
        */

        /*Post method always results in a server state change. If the POST method was idempotent,
         everything sent and accepted to or from the web server would already have to exist on the server
          in some form to respond with the same codes and value response.
         For that reason, POST cannot be idempotent.
        */
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
        .then(response => response.json())

    if(restest.statusCde === 400) {
        errorContainer.innerText = restest.message;
        return 0;
    }

    // login success
    localStorage.setItem("loggedIn", true); //we use localstorage to set the user name and id
    localStorage.setItem("sessionId", restest.sessionId);
    localStorage.setItem("user", restest.user);
    window.location.href = "/";
};

const logout = () => {
    localStorage.removeItem("loggedIn");//wir entfernen den login button
    localStorage.removeItem("sessionId");//die session id
    localStorage.removeItem("user");//den User
    window.location.href = "/";
    
}
