const express = require(`express`);
const mongoose = require(`mongoose`);
const cookieSession = require(`cookie-session`);
const passport = require(`passport`);
const bodyParser = require(`body-parser`);
const keys = require("./config/keys");
require("./models/user");
require("./models/order");
require("./services/passport");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

require(`./Routes/products`)(app);
require(`./Routes/authRoutes`)(app);
require(`./Routes/orderRoute`)(app);

app.use(async (req, res, next) => {
  const error = new Error(`Not Found`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

const path = require("path");
if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static("client/build"));
  // Handle React routing, return all requests to React app
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`you betcha running on ${PORT}`);
});
