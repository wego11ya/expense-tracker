if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const routes = require("./routes");
const session = require("express-session");
const usePassport = require("./config/passport");
const flash = require("connect-flash");
const handlebarsHelpers = require("./helpers/handlebars-helpers");
require("./config/mongoose");

// setting methodOverride before handling each requests from routs
app.use(methodOverride("_method"));

app.engine(
  "hbs",
  exphbs({ defaultLayout: "main", extname: ".hbs", helpers: handlebarsHelpers })
);
app.set("view engine", "hbs");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// setting body-parser
app.use(express.urlencoded({ extended: true }));

// 在路由前要使用Passport
usePassport(app);

app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  next();
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
