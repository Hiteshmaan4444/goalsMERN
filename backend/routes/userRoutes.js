const express = require('express');
const router = express.Router();
const {registerUser,loginUser,getMe} = require('../controller/userController');

router.route('/me').get(getMe);
router.route('/').post(registerUser);
router.route('/login').post(loginUser);


module.exports=router;