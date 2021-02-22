const express = require("express");
const layout = require("express-ejs-layouts");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authorRouter = require("./routes/authorRouter");
const userRouter = require("./routes/users");
const api = require("./api/articles.api");
const path = require("path");

const DATABASE_URL = "mongodb://localhost/nodekb";

mongoose.connect(DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to mongoDB");
});
db.on("error", (err) => {
  console.log(err);
});

const Article = require("./models/articles");

const app = express();

const PORT = process.env.PORT || 4000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.set("layout", "layout/main");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(layout);

app.use("/", authorRouter);
app.use("/users", userRouter);
app.use("/api/v1", api);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
