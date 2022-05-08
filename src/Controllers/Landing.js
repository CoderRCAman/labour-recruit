const { getLoggedInDetails } = require("../helper");
const Labour = require('../Models/labour') ;
const Category = require("../Models/category") ;
exports.getLandingPage = async(req,res) =>{
    const loggedDetails = getLoggedInDetails(req) ;  
    if(loggedDetails.role === 'admin') { 
        // to do 
        //1. fetch all the categories 
        //2. fetch recent 10 labours send it  
        //3. implement pagination for fetching by categories and fetching in-general   
      try {
        const allLabours = await Labour.find() ; 
        const allCategory = await Category.find() ;
        return res.render('AdminLanding',{loggedIn : loggedDetails?loggedDetails:false ,category: allCategory , labours:allLabours}) ;
      } catch (error) {
          console.log(error) ;
          return res.status(500).json({msg:"Something went wrong"}) ;
      }
    }
    else 
    res.render('Landing',{loggedIn : loggedDetails?loggedDetails:false}) ;
}