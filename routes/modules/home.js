const express = require("express");
const router = express.Router();

// 引入Record medel
const Record = require("../../models/record");

// 定義首頁路由res.render("index");
router.get("/", (req, res) => {
  const userId = req.user._id;
  const categoryId = req.query.categoryId
  const filter = (!categoryId || categoryId === '0' || categoryId === '6') ? { userId } : { userId, categoryId }

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
      res.render("index", { records, totalAmount });
    })
    .catch((err) => console.log(err));
});

module.exports = router;


{/* <option value="6">全部類別</option>
<option value="1">家居物業</option>
<option value="2">交通出行</option>
<option value="3">休閒娛樂</option>
<option value="4">餐飲食品</option>
<option value="5">其他</option> */}