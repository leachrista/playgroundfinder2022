const userDatabase = [
    {
        username: "user1",
        password: "pass1",
        role: "user"
    },
    {
        username: "user2",
        password: "pass2",
        role: "admin"
    }
];

class LoginController {
    login(req, res) {
        const body = req.body;

        const sessionId = req.sessionID;
        const username = body.username;
        const password = body.password;

        if(!username || !password) {
            return res.json({
                statusCde: 400,
                message: "You must fill the username and password fields"
            })
        }

        const userData = userDatabase.find((user) => user.username === username);

        if(!userData) {
            return res.json({
                statusCde: 400,
                message: "Username or password incorrect"
            });
        }

        if(userData.password != password) {
            return res.json({
                statusCde: 400,
                message: "Username or password incorrect"
            });
        }

        return res.json({
            statusCde: 200,
            user: username,
            sessionId
        });
    }
}

module.exports = new LoginController();
