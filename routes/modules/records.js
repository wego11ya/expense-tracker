const express = require("express");
const router = express.Router();
const Record = require("../../models/record");
const Category = require("../../models/category");

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
  const _id = req.params.id;
  const categories = [];
  Category.find()
    .lean()
    .sort({ id: "asc" })
    .then((category) => {
      categories.push(...category);
    })
    .then(() => {
      Record.findOne({ _id, userId })
        .lean()
        .then((record) => {
          record.date = record.date.toLocaleDateString("fr-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });
          res.render("edit", { record, categories });
        });
    })
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
