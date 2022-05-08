const mongoose = require("mongoose");
const labourSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Too short name"],
    maxLength: [40, "Too large name"],
    required: true,
  },
  description: {
    type: String,
    minLength: [10, "Too short description"],
    required: true,
  },  
  address : {
    type: String,
    minLength: [10, "Too short address"],
    required: true,
  },
  phone : {
    type: String,
    minLength: [10, "Too short phone"],
    maxLength: [13, "Too large phone"],
    required: true,
  },
  category : {
    type:String ,
    required:true
  },
  profile_pic : {   
     download_url : {
        type : String
     },
     file_name : {
        type : String 
    },
  }
});

module.exports = mongoose.model("labour", labourSchema);
