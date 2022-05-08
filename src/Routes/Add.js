const { getAddLab, get404, getAddCat, addLab, addCat } = require('../Controllers/Add');
const { isAuthenticated, isAdmin } = require('../middlewares');
const express = require('express') ;
const router = express.Router() ;

router.route('/add/labour').get(isAuthenticated,isAdmin, getAddLab).post(isAuthenticated, isAdmin,addLab); 
router.route('/add/category').get(isAuthenticated,isAdmin, getAddCat).post(isAuthenticated,isAdmin,addCat); 
router.route('/404').get(get404) ;

module.exports = router ; 