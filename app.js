if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const exphbs = require("express-handlebars");
require("./config/mongoose");

app.get("/", (req, res) => {
  res.render("index");
});

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
