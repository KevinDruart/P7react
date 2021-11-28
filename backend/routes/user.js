const express = require('express');
const router = express.Router();
const rateLimit = require("express-rate-limit");

//Controller USER
const userCtrl = require('../controllers/user');
//Control Mail
const verifyMail = require('../middleware/testMail');
//Control Password
const verifyPassword = require('../middleware/verify-password');

const auth = require('../middleware/auth');

//LIMIT REQUEST
const requestLimit = rateLimit({
    // 1 heure
    windowMs: 60 * 60 * 1000, 
    // Blocage aprés 3 requetes
    max: 3, 
    message:(JSON.stringify("Trop de tentative de connexion, compte bloquer pendant 1 heure"))
  });

//SIGNUP
router.post('/signup', verifyMail, verifyPassword, userCtrl.signup);

//LOGIN
router.post('/login', verifyMail, verifyPassword, requestLimit, userCtrl.login); 

//READ ONE
router.get('/:id', auth, userCtrl.getUser);

//READ ALL
router.get('/admin/users', auth, userCtrl.getAllUser);

//UPDATE
router.put('/:id', auth, userCtrl.modifyUser);

//DELETE
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;
