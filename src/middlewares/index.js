const isAuthenticated = (req, res, next) => {
    if (req.cookies.isLoggedIn) {
      return next();
    }
    req.session.redirectUrl = req.originalUrl;
    return res.redirect("/login");
  };
const isAdmin = (req,res,next) => { 
   if(req.cookies.role === 'admin') {
     return next() ;
   }
   return res.redirect('/404') ; 
}
  module.exports = { isAuthenticated ,isAdmin};
  