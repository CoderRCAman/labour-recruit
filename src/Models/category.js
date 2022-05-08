const mongoose = require("mongoose");
const catSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Too short name"],
    maxLength: [40, "Too large name"],
    required: true,
  },
  
});

module.exports = mongoose.model("category", catSchema);
