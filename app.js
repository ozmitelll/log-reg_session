const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session =require('express-session');
const bcrypt = require('bcrypt');
const e = require("express");
const {hash} = require("bcrypt");

const app = express();
const port = 8555;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(session({
   secret: 'secret-key',
   resave: false,
    saveUninitialized:true
}));

app.set('view engine', 'ejs')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'h6ejtsPO',
    database: 'library'
})

connection.connect((err)=>{
    if(err){
        console.error('Error connect to database: ' + err.stack);
        return;
    }
    console.log('Successful connect to database!')
});




app.get('/', (req, res)=>{
    console.log(req.url);
    res.render('welcome');
})

app.route('/register')
    .get((req, res) => {
        res.render('registration');
    })
    .post((req,res)=>{
        const {username, password} = req.body;

        if(!username || !password){
            res.status(400).send('Enter name user and password');
            return;
        }
        const saltRounds = 10;
        bcrypt.hash(password,saltRounds,(err,hash)=>{
            if(err){
                console.error('Error hashing password: '+err);
                res.status(500).send('Error server!');
                return;
            }
            console.log(hash);
         const sql = 'INSERT INTO users(username,password) VALUES (?,?)';
         const values = [username,hash];
         connection.query(sql, values,(err, result) => {
            if(err){
                console.error('Error paste in BD'+ err);
                res.status(500).send('Error server!');
                return;
            }
            console.log('User '+ username + ' registrated!');
            res.status(200).send()
          })
        })
    });

app.route('/login')
    .get((req, res) => {
        res.render('login')
    })
    .post((req, res) => {
        const {username, password} = req.body;
        if(!username || !password){
            res.status(400).send('Enter name user and password');
            return;
        }
        const sql = 'SELECT * FROM users WHERE username = ?';
        connection.query(sql,[username],(err,results)=>{
            if(err){
                console.error('Error find user in BD! '+ err);
                res.status(500).send('Error server');
                return;
            }
            if(results.length===0){
                res.status(401).send('Do not correct name or password');
                return;
            }
            const user = results[0];
            bcrypt.compare(password,user.password,(err,result)=>{
                if(err){
                    console.error('Error comparing password: '+ err);
                    res.status(500).send('Error server');
                    return;
                }
                if(!result){
                    res.status(401).send('Do not correct name or password');
                    return;
                }
                req.session.user=user;
                console.log('User '+ username+ ' loginned!');
                res.redirect('/profile')
                // res.status(200).send('You successful loggined!');
            });
        });

    });
app.get('/profile',(req,res)=>{
    if(!req.session.user){
        res.status(401).send('You do not logined!');
        return;
    }
    const user = req.session.user;
    res.status(200).send('Welcome, '+ user.username);
});1


app.listen(port, ()=>{
    console.log(`Server started on port ${port}...`)
})
