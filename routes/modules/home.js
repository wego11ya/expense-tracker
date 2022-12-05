const express = require("express");
const router = express.Router();

// 引入Record medel
const Record = require("../../models/record");

// 定義首頁路由res.render("index");
router.get("/", (req, res) => {
  const userId = req.user._id;
  Record.find({ userId })
    .lean()
    .sort({ date: "desc" })
    .then((records) => {
      let totalAmount = 0;
      records.forEach((record) => (totalAmount += record.amount));
      res.render("index", { records, totalAmount });
    })
    .catch((err) => console.log(err));
});

module.exports = router;

// router.get("/", (req, res) => {
//   const userId = req.user._id;
//   Record.find({ userId })
//     .lean()
//     .then((records) => res.render("index", { records }))
//     .catch((err) => console.log(err));
// });
