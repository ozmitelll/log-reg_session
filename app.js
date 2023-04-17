require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const session =require('express-session');
const appConfig = require('./config/app.config')

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
   secret: 'secret-key',
   resave: false,
    saveUninitialized:true
}));

app.set('view engine', 'ejs');

const routes = require('./routes');
app.use(routes);

const port = appConfig.port;
app.listen(port, ()=>{
    console.log(`Server started on port ${port}...`)
})
