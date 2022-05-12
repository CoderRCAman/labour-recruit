const { getRedirectRoutes, getLoggedInDetails } = require('../helper');
const User = require('../Models/user')
const getLoginPage = (req,res) => {
  const loggedDetails = getLoggedInDetails(req) ; 
    res.render('Login.ejs',{loggedIn : loggedDetails?loggedDetails:false}) ; 
}
function logout (req,res) {
    // ✅ Completed
     res.clearCookie("isLoggedIn") ;
     res.clearCookie("user_id") ;
     return res.redirect('/');
 }
 
 async function getUserRegistered(req, res) {
   try {
   // ✅ Completed
     const new_user = new User(req.body);
     const { email } = req.body;
     const ifEmailExist = await User.findOne({ email: email });
     if (ifEmailExist)
       return res.status(400).json({ msg: "This email already exist" });
     await new_user.save();
     return res.status(201).json({msg:"Successfully registered a new user"}) ;
   } catch (error) {
     res.status(500).json({ msg: "Some internal server error/or invalid forms please try again" });
   }
 } 
 
  
 
 async function loginUser(req, res) {
   // ✅ Completed
   const body = req.body;
   if (!body.email || !body.password)
     return res.status(400).json({ msg: "Missing email/password fields" });
   const verifyEmail = await User.findOne({ email: body.email });
   if (!verifyEmail) {
     return res.status(400).json({
       msg: `No such user exist with ${body.email} try again with a different email`,
     });
   }
   if (!(await verifyEmail.isValidatedPassword(body.password)))
     return res
       .status(400)
       .json({ msg: `Password didnot match for email ${body.email}` });
   //set details in cookies
   res.cookie("isLoggedIn", true, {
     maxAge: 24 * 24 * 60 * 1000,
     httpOnly: true,
   });
   res.cookie("user_id", verifyEmail._id, {
     maxAge: 24 * 24 * 60 * 1000,
     httpOnly: true,
   });
   res.cookie("role", verifyEmail.role, {
    maxAge: 24 * 24 * 60 * 1000,
    httpOnly: true,
  });
   return res.status(200).json({
     msg: "Successfully login",
     redirectUrl: getRedirectRoutes(req),
   });
 }

 const getAboutUs = async(req,res) => {
  const loggedDetails = getLoggedInDetails(req) ; 
  res.render('About',{loggedIn : loggedDetails?loggedDetails:false}) ; 
 } 

 module.exports = {
   getLoginPage,
   loginUser,
   getUserRegistered,
   logout,
   getAboutUs
 }; 


 