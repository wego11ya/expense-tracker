const express = require("express");
const router = express.Router();

// 引入models
const Record = require("../../models/record");
const Category = require("../../models/category")

// 定義首頁路由res.render("index");
router.get("/", (req, res) => {
  const categories = []
  const userId = req.user._id;  
  const categoryId = req.query.sortByCategory
  // 一開始categoryId是undefined，或是全部類別，就把所有資料撈出來; 否則就去撈前端傳回來的categoryId
  const filter = (!categoryId || categoryId === '0') ? { userId } : { userId, categoryId }
  
  // 先把所有的category找出來再放到categories陣列，最後再傳回前端
  Category.find()
    .lean()
    .then(category => categories.push(...category))
    .then(() => {
      Record.find(filter)
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
        res.render("index", { records, totalAmount, categories });        
      })
      .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err))
});
module.exports = router;