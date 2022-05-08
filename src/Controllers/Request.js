const { getLoggedInDetails } = require("../helper");
const Request = require("../Models/request");
exports.getAdminRequest = async (req, res) => {
  const loggedDetails = getLoggedInDetails(req);
  try {
    const allRequest = await Request.find();
    res.render("AdminRequest", {
      loggedIn: loggedDetails ? loggedDetails : false,
      requests: allRequest,
    });
  } catch (error) {
    res.redirect("/404");
  }
};

exports.getRequest = async (req, res) => {
  const loggedDetails = getLoggedInDetails(req);
  res.render("Request", {
    loggedIn: loggedDetails ? loggedDetails : false,
  });
};

exports.uploadRequest = async(req,res) => {
  try {
    const newRequest = new Request(req.body) ;
    await newRequest.save() ; 
    return res.status(201).json({msg:'ok!'})
  } catch (error) {
    console.log(error) ;
    return res.status(500).json({msg:'IMPOSSIBLE'})
  }
}