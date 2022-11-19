if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const routes = require("./routes");
require("./config/mongoose");

// setting body-parser
app.use(express.urlencoded({ extended: true }));

// setting methodOverride before handling each requests from routs
app.use(methodOverride("_method"));

app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", "hbs");

app.use(routes);

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
