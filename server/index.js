require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      session = require('express-session')
      authCtrl = require('./authController'),
      ctrl = require('./controller'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env
      app = express();

////TOP LVL MIDWARE///////
app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60},
    secret: SESSION_SECRET
}))

////CONNECTS TO DB//////
massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('DATABASE IS CONNECTED BROO')
})

//AUTH ENDPOINTS//
app.post('/api/login', authCtrl.login);
app.post('/api/register', authCtrl.register);
app.post('/api/logout', authCtrl.logout);
app.get('/api/user', authCtrl.getUser);

///MANIPULATING POSTS///
app.get('/api/posts/:id', ctrl.getPosts)
app.post('/api/post/:id', ctrl.addPost)
app.delete('/api/post/:postId/:userId', ctrl.deletePost)

const port = SERVER_PORT;
app.listen(port, () => console.log(`Server running on ${port}`));