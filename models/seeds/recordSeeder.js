if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const bcrypt = require("bcryptjs");
const db = require("../../config/mongoose");
const Record = require("../record");
const User = require("../user");

const seedUser = [
  {
    name: "user1",
    email: "user1@example.com",
    password: "12345678",
    recordIndex: [0, 2, 4],
  },
  {
    name: "user2",
    email: "user2@example.com",
    password: "12345678",
    recordIndex: [1, 3],
  },
];
const seedRecord = [
  {
    name: "早餐",
    date: "2022-12-10",
    categoryId: 4,
    amount: 60,
  },
  {
    name: "礁溪長榮buffet",
    date: "2022-12-11",
    categoryId: 4,
    amount: 900,
  },
  {
    name: "計程車",
    date: "2022-12-12",
    categoryId: 2,
    amount: 150,
  },
  {
    name: "KTV唱歌",
    date: "2022-12-13",
    categoryId: 3,
    amount: 800,
  },
  {
    name: "電動沙發",
    date: "2022-12-2",
    categoryId: 1,
    amount: 35000,
  },
];

db.once("open", () => {
  return Promise.all(
    seedUser.map((user) => {
      const { name, email, password, recordIndex } = user;
      return User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      }).then((user) => {
        const userId = user._id;
        const records = recordIndex.map((index) => {
          return { ...seedRecord[index], userId };
        });
        return Record.create(records);
      });
    })
  )
    .then(() => {
      console.log("Record seeder is done!");
      process.exit();
    })
    .catch((err) => console.log(err));
});
