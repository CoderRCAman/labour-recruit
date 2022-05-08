const getRedirectRoutes = (request) => {
    const redirectUrl = request.session.redirectUrl ? request.session.redirectUrl : '/' ;
    request.session.redirectUrl = undefined ;
    return redirectUrl ;
}   
const getLoggedInDetails = (req) => { 
    if( req.cookies .isLoggedIn ) return {status:true , user_id : req.cookies.user_id,role : req.cookies.role} 
    return false ; 
}
module.exports = {getRedirectRoutes,getLoggedInDetails} ;