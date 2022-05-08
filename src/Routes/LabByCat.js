const { getSignupPage } = require('../Controllers/Signup');
const { getLabByCat, getLabors } = require('../Controllers/LabByCat');
const {isAuthenticated} = require('../middlewares/index')
const express = require('express') ;
const router = express.Router() ;

router.route('/cat').get(isAuthenticated, getLabByCat) ;
router.route('/labour').get(isAuthenticated , getLabors) ;
module.exports = router ;