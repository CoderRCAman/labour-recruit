const { getLandingPage } = require('../Controllers/Landing');
const express = require('express') ;
const router = express.Router() ;

router.route('/').get(getLandingPage);


module.exports = router ; 