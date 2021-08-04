let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let book = new Schema(
  {
    title: { type: String },
    discription: String,
    author: { type: String },
    commentId:[{type:Schema.Types.ObjectId , ref:"Comment"}]
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Book", book);