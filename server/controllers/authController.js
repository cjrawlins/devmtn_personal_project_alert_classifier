const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        console.log("Register Called");
        const db = req.app.get('db');
        let { username, password, userlevel, enabled } = req.body;
        const existingUser = await db.check_for_user([username]);
        if (existingUser[0]) {
            console.log("Register Failed Duplicate");
            return res.status(409).send('Username Already Registered');
        }
        const salt = bcrypt.genSaltSync(10);
        const pass_hash = bcrypt.hashSync(password, salt);
        const newUser = await db.register_user( [username, pass_hash, userlevel, enabled] );
        req.session.user = {
            user_id: user[0].user_id,
            username: user[0].username,
            userlevel: user[0].userlevel,
            enabled: user[0].enabled
        }
        res.status(200).send(req.session.user);
    },
 
    login: async (req, res) => {
        console.log("Login Called");
        const db = req.app.get('db');
        let { username, password } = req.body;
        const user = await db.check_for_user([username]);
        if (!user[0]) {
            return res.status(404).send('Username does not exist');
        } else if (!user[0].enabled) {
            return res.status(403).send(`Username ${username} exists, but is disabled by admin.`);
        } else {
            const authenticated = bcrypt.compareSync( password, user[0].pass_hash )
            if (authenticated) {
                req.session.user = {
                    user_id: user[0].user_id,
                    username: user[0].username,
                    userlevel: user[0].userlevel,
                    enabled: user[0].enabled
                }
                console.log(`Login Successful User: ${username}, ${user[0].userlevel}`);
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

    updateUser: async (req, res) => {

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