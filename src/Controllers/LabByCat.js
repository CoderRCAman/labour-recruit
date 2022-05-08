const { getLoggedInDetails } = require("../helper");
const category = require("../Models/category");
const labour = require("../Models/labour");

exports.getLabByCat= async(req,res) =>{ 
    const loggedDetails = getLoggedInDetails(req) ;  
    const allLabours = await labour.find() ; 
    const allCategory = await category.find() ;
    res.render('LaborsByCat',{loggedIn : loggedDetails?loggedDetails:false,category:allCategory,labours:allLabours})
} 

exports.getLabors =async(req,res) => {
    const {category} = req.query ; 
    try {
        let foundLabours = [] ;
        if(category==='all') {
            foundLabours = await labour.find() ;
        }
        else {
            foundLabours = await labour.find({category:category}) ; 
        }
        return res.status(200).json(foundLabours) ;
    } catch (error) {
        console.log(error) ;
        return res.status(500).json({msg:'SERVER ERROR'}) ;
    }
}