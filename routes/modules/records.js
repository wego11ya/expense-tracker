const express = require("express");
const router = express.Router();
const Record = require("../../models/record");

router.get("/new", (req, res) => {
  res.render("new");
});

router.post("/", (req, res) => {
  Record.create({ ...req.body })
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.get("/:id/edit", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Record.findById(id)
    .lean()
    .then((record) => res.render("edit", { record }))
    .catch((err) => console.log(err));
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  Record.findOneAndUpdate({ id }, req.body)
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Record.findById(id)
    .then((record) => record.remove())
    .then(() => res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
