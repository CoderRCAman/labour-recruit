const express = require('express') ;
const { getEditLabour, editLab, getDeleteLabour, deleteeLabour, getLabourProfile, getProfile } = require('../Controllers/Crud');
const { isAuthenticated, isAdmin } = require('../middlewares');
const router = express.Router() ;

router.route('/edit/labour/:id').get(isAuthenticated,isAdmin, getEditLabour).post(isAuthenticated,isAdmin,editLab); 
router.route('/delete/labour/:id').get(isAuthenticated,isAdmin,getDeleteLabour).delete(isAuthenticated,isAdmin,deleteeLabour);
router.route('/labour/profile/:id').get(isAuthenticated,getLabourProfile) ;
router.route('/profile').get(isAuthenticated,getProfile) ;
module.exports = router ; 