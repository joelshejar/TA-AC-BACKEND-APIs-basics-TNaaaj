var express = require("express");
var router = express.Router();
const Country = require("../models/Country");
const State = require("../models/State");

router.get("/", async (req, res) => {
  try {
    const states = await State.find({});
    const statePopulate = await states
      .populate("country")
      .populate(" neighbouring_states");
    res.json({ states: statePopulate });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/:id", async (req, res) => {
  try {
    req.body.country = req.params.id;
    const state = await State.create(req.body);
    const country = await Country.findByIdAndUpdate(
      req.params.id,
      { $push: { state: state._id } },
      { new: true }
    );
    res.json({ state, country });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/sort/ascending", async (req, res) => {
  try {
    const states = await State.find({}).sort("name");
    const statesPopuate = await states
      .populate("country")
      .populate("neighbouring_states");
    res.json({ statesAscen: statesPopuate });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/sort/population", async (req, res) => {
  try {
    const states = await State.find({}).sort({ population: 1 });
    res.json({ states });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/sort/dscending", async (req, res) => {
  try {
    const countrys = await Country.find({}).sort({ name: -1 });
    const countrysPopuate = await countrys
      .populate("neighbouring_countries")
      .populate("states");
    res.json(countrysPopuate);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const state = await State.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ stateUpdate: state });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);
    const updateContry = await Country.findByIdAndUpdate(
      state.country,
      { $pull: { state: state.id } },
      { new: true }
    );
    res.json({ updateContry, state });
  } catch (e) {
    res.status(400).send(e);
  }
});


module.exports = router;