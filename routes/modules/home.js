const express = require("express");
const router = express.Router();

// 引入Record medel
const Record = require("../../models/record");

// 定義首頁路由
router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
