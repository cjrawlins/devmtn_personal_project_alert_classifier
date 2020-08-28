const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        console.log("Register Called");
        const db = req.app.get('db');
        let { username, password } = req.body;
        const existingUser = await db.check_for_user([username]);
        if (existingUser[0]) {
            console.log("Register Failed Duplicate");
            return res.status(409).send('Username Already Registered');
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await db.register_user( [username, hash] );
        req.session.user = {
            id: newUser[0].id,
            username: newUser[0].username,
            userLevel: newUser[0].userLevel,
            loggedIn: true
        }
        console.log(`Register Successful User: ${username}, ${userLevel}`);
        res.status(200).send(req.session.user);
    },
 
    login: async (req, res) => {
        console.log("Login Called");
        const db = req.app.get('db');
        let { username, password } = req.body;
        const user = await db.check_for_user([username]);
        if (!user[0]) {
            return res.status(404).send('Username does not exist');
        } else {
            const authenticated = bcrypt.compareSync( password, user[0].password )
            if (authenticated) {
                req.session.user = {
                    id: user[0].id,
                    username: user[0].username,
                    userLevel: newUser[0].userLevel
                }
                console.log(`Login Successful User: ${username}, ${userLevel}`);
                res.status(200).send(req.session.user)
            } else {
                res.status(403).send('Username or Password Incorrect');
            }
        }
    },
 
    logout: (req, res) => {
        console.log("Logout Called");
        req.session.destroy();
        res.status(200).send("Logout Successful");
    },

    getUser: (req, res) => {
        console.log("Get User Called");
        if (req.session.user) {
            res.status(200).send(req.session.user)
        } else {
            res.status(404).send("No User Logged In")
        }
    }
}