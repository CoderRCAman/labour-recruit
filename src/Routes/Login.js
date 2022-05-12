const { getLoginPage, loginUser, getUserRegistered, logout, getAboutUs } = require('../Controllers/Login');
const { getSignupPage } = require('../Controllers/Signup');
const express = require('express') ;
const { isAuthenticated } = require('../middlewares');
const router = express.Router() ;

router.route('/login').get(getLoginPage).post(loginUser) ;
router.route('/signup').get(getSignupPage).post(getUserRegistered) ;
router.route('/logout').get(isAuthenticated , logout); 
router.route('/about').get(getAboutUs) ;

module.exports = router ; 