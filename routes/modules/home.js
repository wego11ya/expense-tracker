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
      records.forEach((record) => {
        totalAmount += record.amount;
        record.date = record.date.toLocaleDateString("ja-JP", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
      });
      res.render("index", { records, totalAmount });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
