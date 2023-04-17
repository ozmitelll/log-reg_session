const router = require('express').Router();
const {postRegister, postLogin} = require("../controllers/auntification");

router.route('/register')
    .get((req, res) => {
        res.render('registration');
    })
    .post(postRegister);

router.route('/login')
    .get((req, res) => {
        res.render('login')
    })
    .post(postLogin);

module.exports = router;