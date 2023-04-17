const bcrypt = require("bcrypt");
const {User} = require("../models");
const postRegister = async (req,res)=>{
    const {username, password} = req.body;

    if(!username || !password){
        res.status(400).send('Enter name user and password');
        return;
    }
    try{
        const hashedPassword = await bcrypt.hash(password,10);
        console.log(hashedPassword);
        const user = await User.create({
            username,password
        });
        console.log('User '+ user.username + ' registrated!');
        res.status(200).send()
    }
    catch(err){
        console.error('Error hashing password: '+err);
        res.status(500).send('Error server!');
        return;
    }
};

const postLogin = async (req, res) => {
    const {username, password} = req.body;
    if(!username || !password){
        res.status(400).send('Enter name user and password');
        return;
    }
    try{
        const user = await User.findOne({where: {username}});

        if(!user){
            res.status(401).send('Do not correct name or password');
            return;
        }

        if(await bcrypt.compare(password,user.password)){
            req.session.user=user;
            console.log('User '+ username+ ' loginned!');
            res.redirect('/profile')
            // res.status(200).send('You successful loggined!');
        }else {
            res.status(401).send('Do not correct name or password');
            return;
        }
    }
    catch (err){
        console.error('Error find user in BD! '+ err);
        res.status(500).send('Error server');
        return;
    }
};

module.exports = {
    postRegister,
    postLogin,
}