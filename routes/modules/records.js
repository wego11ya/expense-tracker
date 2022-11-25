const express = require("express");
const router = express.Router();
const Record = require("../../models/record");

router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/", (req, res) => {
  const userId = req.user._id;
  Record.create({ ...req.body, userId })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.get("/:id/edit", (req, res) => {
  const userId = req.user._id;
  const id = req.params.id;
  Record.findOne({ id, userId })
    .lean()
    .then((record) => res.render("edit", { record }))
    .catch((err) => console.log(err));
});

router.put("/:id", (req, res) => {
  const userId = req.user._id;
  const id = req.params.id;
  Record.findOneAndUpdate({ id, userId }, req.body)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
  const userId = req.user._id;
  const id = req.params.id;
  Record.findOne({ id, userId })
    .then((record) => record.remove())
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
