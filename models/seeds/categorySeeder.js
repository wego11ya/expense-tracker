const Category = require("../category");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const db = require("../../config/mongoose");

const categoryData = [
  { id: 1, name: "家居物業" },
  { id: 2, name: "交通出行" },
  { id: 3, name: "休閒娛樂" },
  { id: 4, name: "餐飲食品" },
  { id: 5, name: "其他" },
];

db.on("error", () => {
  console.log("mongodb error!");
});

db.once("open", () => {
  return Promise.all(
    categoryData.map((category) => {
      return Category.create(category);
    })
  )
    .then(() => {
      console.log("Category seeder is done!");
      process.exit();
    })
    .catch((error) => console.log(error));
});
