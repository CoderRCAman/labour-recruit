const labour = require("../Models/labour");
const category = require("../Models/category");
const User = require('../Models/user') ;
const { getLoggedInDetails } = require("../helper/index");
const path = require("path");
const { unlink } = require("fs/promises");
const { IncomingForm } = require("formidable");
const _ = require("lodash");

exports.getEditLabour = async (req, res) => {
  const { id } = req.params;
  const loggedDetails = getLoggedInDetails(req);
  if (!id) {
    return res.redirect("/404");
  }
  try {
    const labourDetail = await labour.findById(id);
    const allCategory = await category.find();
    res.render("EditLabour", {
      loggedIn: loggedDetails ? loggedDetails : false,
      labour: labourDetail,
      category: allCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "IMPOSSIBLE" });
  }
};
exports.getLabourProfile =async(req,res) => {
  const {id} = req.params ; 
  const loggedDetails = getLoggedInDetails(req) ; 
  if(!id) return res.redirect('/404') ;  
  const labourDetail = await labour.findById(id) ;
  res.render('LabourProfile',{loggedIn:loggedDetails?loggedDetails:false , labour:labourDetail})
}
exports.getProfile = async (req,res) => {
  const loggedDetails = getLoggedInDetails(req) ;  
  try {
    const foundUser = await User.findById(loggedDetails.user_id) ;
    res.render('Profile',{loggedIn:loggedDetails?loggedDetails:false , user:foundUser})
  } catch (error) {
    return res.redirect('/404') ;
  }
}
exports.getDeleteLabour = async (req, res) => {
  const { id } = req.params;
  const loggedDetails = getLoggedInDetails(req);
  if (!id) {
    return res.redirect("/404");
  }
  try {
    const labourDetail = await labour.findById(id);
    res.render("DeleteLabour", {
      loggedIn: loggedDetails ? loggedDetails : false,
      labour: labourDetail,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "IMPOSSIBLE" });
  }
};

exports.editLab = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "..", "public", "profiles");
    const { id } = req.params;
    if (!id) {
      return res.redirect("/404");
    }
    const labourDetail = await labour.findById(id);
    //delete the exiting photo

    const options = {
      uploadDir: filePath,
      maxFileSize: 5 * 1024 * 1024,
      allowEmptyFiles: false,
      multiples: false,
    };
    const form = new IncomingForm(options);
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log(err);
        if (err.code === 1009)
          return res.status(500).json({ msg: "Maximum supported file is 5mb" });
        else return res.status(500).json({ msg: "Somethings went wrong!" });
      }
      try {
        if (!_.isEmpty(files)) {
          try {
            await unlink(
              path.join(filePath, labourDetail.profile_pic.file_name)
            );
          } catch (error) {}
        }
        await labour.findByIdAndUpdate(id, {
          name: fields.name,
          description: fields.description,
          address: fields.address,
          phone: fields.phone,
          category: fields.category,
          profile_pic: {
            download_url: _.isEmpty(files)
              ? fields.profile_pic
              : `http://localhost:5000/profiles/${files.profile_pic.newFilename}`,
            file_name: _.isEmpty(files)
              ? labourDetail.profile_pic.file_name
              : files.profile_pic.newFilename,
          },
        });
        return res.status(200).json({ msg: "Updated Labour ok!" });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "undefined" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "U  SUK" });
  }
};

exports.deleteeLabour = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.redirect("/404");
  }
  try {
    const labourDetail = await labour.findById(id);
    try {
      await unlink(
        path.join(
          __dirname,
          "..",
          "public",
          "profiles",
          labourDetail.profile_pic.file_name
        )
      );
    } catch (error) {}
    await labour.findByIdAndDelete(id);
    return res.status(200).json({msg:"DELETED OK!"}) ;
  } catch (error) {
    console.log(error) ;
    return res.status(500).json({msg:"IMPOSSIBLE"}) ;
  }
};
