const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const state = new Schema(
  {
    name: { type: String, required: true },
    country: { type: Schema.Types.ObjectId, ref:"Country" },
    population: { type: Number, required: true },
    area: { type: Number },
    neighbouring_states: [{ type: Schema.Types.ObjectId, ref: "State" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("State", state);