const { getLoggedInDetails } = require("../helper");

exports.getSignupPage = (req,res) =>{
  const loggedDetails = getLoggedInDetails(req) ; 
    res.render('Signup',{loggedIn : loggedDetails?loggedDetails:false }) ;
}