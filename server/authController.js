const bcrypt = require('bcryptjs');
////authentication/////
module.exports = {
    login: async(req, res) => {
        const {email, password} = req.body;
        const {session} = req;
        const db = req.app.get('db');
        ///needs to be async////
        let user = await db.check_user(email);
        user = user[0];
        //IF USER DOES NOT EXIST//
        if(!user){
            return res.status(400).send('Email not found')
        }
        const authenticated = bcrypt.compareSync(password, user.user_password);
        if(authenticated){
            delete user.user_password;
            session.user = user;
            res.status(202).send(session.user);
        } else {
            res.status(401).send('incorrect password bro')
        }
    },
    register: async(req, res) => {
        const {email, password} = req.body;
        const {session} = req;
        const db = req.app.get('db');

        let user = await db.check_user(email);
        ///makes the user object not nested in an array//
        user = user[0];
        //if there is a user stop the method, exit the function//
        if(user){
            return res.status(400).send('User already exists')
        }
        //if they don't exist salt their pw and hash that shit//
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        ///email + hash references register_user.sql////
        let newUser = await db.register_user({email, hash});
        newUser = newUser[0];
        session.user = newUser;
        res.status(201).send(session.user);
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getUser: (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user);
        } else {
            res.status(200).send('');
        }
    }
};