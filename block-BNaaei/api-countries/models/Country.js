let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const country = new Schema(
  {
    name: { type: String, required: true },
    state: [{ type: Schema.Types.ObjectId , ref: 'State'}],
    continent: { type: String },
    population: { type: Number, required: true },
    ethnicity: [{ type: String, required: true }],
    neighbouring_countires: [{ type: Schema.Types.ObjectId, ref: "Country" }],
    area: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Country", country);