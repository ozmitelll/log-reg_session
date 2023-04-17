const router = require('express').Router();

router.get('/', (req, res)=>{
    console.log(req.url);
    res.render('welcome');
});

const AuthorizationRouter = require('./authorization');
router.use('/', AuthorizationRouter);

router.get('/profile',(req,res)=>{
    if(!req.session.user){
        res.status(401).send('You do not logined!');
        return;
    }
    const user = req.session.user;
    res.status(200).send('Welcome, '+ user.username);
});

module.exports = router;