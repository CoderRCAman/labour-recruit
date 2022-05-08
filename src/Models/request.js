const mongoose = require("mongoose");
const requestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  phone : {
    type:String ,
    required:true
  }
});

module.exports = mongoose.model("request", requestSchema);
