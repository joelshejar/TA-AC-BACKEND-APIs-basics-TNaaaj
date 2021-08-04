let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let comment = new Schema(
  {
    title: { type: String },
    author: { type: String },
    bookId: { type: Schema.Types.ObjectId, ref: "Book" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Comment", comment);