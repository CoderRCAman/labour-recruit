const { getLoggedInDetails } = require("../helper");
const { IncomingForm, errors } = require("formidable");
const Labour = require("../Models/labour");
const Category = require('../Models/category')
const path = require('path');
exports.getAddLab = async(req, res) => {
  const loggedDetails =  getLoggedInDetails(req); 
  const allCategory = await Category.find() ;
  res.render("AddLabour", { loggedIn: loggedDetails ? loggedDetails : false ,category:allCategory});
};

exports.getAddCat = (req, res) => {
  const loggedDetails = getLoggedInDetails(req);
  res.render("AddCategory", {
    loggedIn: loggedDetails ? loggedDetails : false,
  });
};

exports.get404 = (req, res) => {
  const loggedDetails = getLoggedInDetails(req);
  res.render("PageNotFound", {
    loggedIn: loggedDetails ? loggedDetails : false,
  });
};

exports.addLab = (req, res) => {
  try {
    const options = {
      uploadDir: path.join(__dirname , '..','public','profiles'),
      maxFileSize: 5 * 1024 * 1024,
      allowEmptyFiles: false,
      multiples: false,
    }; 
    const form = new IncomingForm(options);
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.log(err)
        if (err.code === 1009)
          return res.status(500).json({ msg: "Maximum supported file is 5mb" });
        else return res.status(500).json({ msg: "Somethings went wrong!" });
      }
      try { 
        console.log(files.profile_pic.newFilename)
        const newLabour = new Labour({
          name: fields.name,
          description: fields.description,
          address: fields.address,
          phone: fields.phone, 
          category:fields.category,
          profile_pic: {
            download_url: `http://localhost:5000/profiles/${files.profile_pic.newFilename}`,
            file_name: files.profile_pic.newFilename,
          },
        });
        await newLabour.save(); 
        return res.status(201).json({msg:'Created new!'})
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

exports.addCat = async(req,res) => {
    const {name} = req.body ; 
    if(!name) return res.status(404).json({msg:"MISSING CATEGORY NAME"}) ;
    try {
      const ifCatExist = await Category.findOne({name:name}) 
      if(ifCatExist)return res.status(400).json({msg:"CATEGORY ALREADY EXIST"}) ;
      const newCat = new Category({name:name}) 
      await newCat.save() ;
      return res.status(201).json({msg:"CREATED A NEW CATEGORY OK!"})
    } catch (error) {
      console.log(error) ;
      return res.status(500).json({msg:"undefined"}) ;
    }
}