// import "./playgroundfinder";
const LOGINURL = "http://localhost:3000/api/login";


const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const errorContainer = document.querySelector("#errorContainer");

const handleSubmit = async () => {
    //Prevent page reload

    const uname = usernameInput.value;
    const pass = passwordInput.value;

    if(!uname || !pass) {
        errorContainer.innerText = "You must fill the username and password fields";
        return 0;
    }

    const userData = {
        username: uname,
        password: pass
    }

    const restest = await fetch(LOGINURL, {
        method: "POST",
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
    localStorage.setItem("loggedIn", true);
    localStorage.setItem("sessionId", restest.sessionId);
    localStorage.setItem("user", restest.user);
    window.location.href = "/";
};

const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("user");
    window.location.href = "/";
}
