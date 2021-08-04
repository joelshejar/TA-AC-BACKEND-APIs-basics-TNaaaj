var express = require("express");
const { listen } = require("../app");

var router = express.Router();
const Country = require("../models/Country");
const State = require("../models/State");

/* GET users listing. */

router.get("/", async (req, res) => {
  try {
    const countrys = await Country.find({})
      .populate("state")
      .populate("neighbouring_countires");
    res.json({ countrys: countrys });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const create = await Country.create(req.body);
    res.json(create);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/sort/ascending", async (req, res) => {
  try {
    const countrys = Country.find({}).sort("name");
    const countrysPopuate = countrys
      .populate("neighbouring_countries")
      .populate("states");
    res.json({ countryAscen: countrysPopuate });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/sort/dscending", async (req, res) => {
  try {
    const countrys = Country.find({}).sort({ name: -1 });
    const countrysPopuate = countrys
      .populate("neighbouring_countries")
      .populate("states");
    res.json({ countryDecen: countrysPopuate });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/sort/population", async (req, res) => {
  try {
    const countrys = Country.find({}).sort({ population: 1 });
    res.json({ countrys });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/;id", async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    const populateCountry = await country
      .populate("state")
      .populate("neighbouring_countires");
    res.json({ country: populateCountry });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    const country = await Country.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(country)
    res.json({ updateCountry: country });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/:id/states", async (req, res) => {
  try {
    const states = await Country.findById(req.body.params.id).populate("state");
    res.json({ states });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const country = await findByIdAndDelete(req.params.id);
    res.json({ deleteCountry: country });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;