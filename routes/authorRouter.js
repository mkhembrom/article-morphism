const express = require("express");
const Article = require("../models/articles");
const router = express.Router();

router.get("/", (req, res) => {
  Article.find({}, (err, articles) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { articles });
    }
  });
});

router.get("/add", (req, res) => {
  res.render("add", { title: "Articles" });
});

router.post("/add", (req, res) => {
  const article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save((err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/");
    }
  });
});

router.get("/article/:id", (req, res) => {
  Article.findById(req.params.id, (err, articles) => {
    if (err) {
      console.log(err);
    } else {
      res.render("article", { articles });
    }
  });
});

router.get("/edit/:id", (req, res) => {
  Article.findById(req.params.id, (err, articles) => {
    if (err) {
      console.log(err);
    } else {
      res.render("edit", { title: "Edit the Articles", articles });
    }
  });
});

router.post("/edit/:id", (req, res) => {
  const article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  const query = { _id: req.params.id };

  Article.update(query, article, (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/");
    }
  });
});

router.get("/remove/:id", (req, res) => {
  const query = { _id: req.params.id };
  Article.deleteOne(query, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
