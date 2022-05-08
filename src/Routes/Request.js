const express = require('express') ;
const { getAdminRequest, getRequest, uploadRequest } = require('../Controllers/Request');
const { isAuthenticated, isAdmin } = require('../middlewares');
const router = express.Router() ;

router.route('/admin/request').get(isAuthenticated,isAdmin,getAdminRequest)
router.route('/request').get(isAuthenticated,getRequest).post(isAuthenticated,uploadRequest) ;
module.exports = router ;