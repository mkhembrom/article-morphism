const express = require("express");
const Article = require("../models/articles");
const router = express.Router();

router.get("/", (req, res) => {
  Article.find({}, (err, articles) => {
    if (err) {
      console.log(err);
    } else {
      res.json(articles);
    }
  });
});

router.post("/add", (req, res) => {
  const article = new Article();
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  article.save((err, article) => {
    if (err) {
      console.log(err);
      return;
    } else {
      return res.json(article);
    }
  });
});

router.get("/article/:id", (req, res) => {
  Article.findById(req.params.id, (err, articles) => {
    if (err) {
      console.log(err);
    } else {
      return res.json(articles);
    }
  });
});

router.get("/edit/:id", (req, res) => {
  const article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  const query = { _id: req.params.id };

  Article.update(query, article, (err, article) => {
    if (err) {
      console.log(err);
      return;
    } else {
      return res.json(article);
    }
  });
});

router.get("/remove/:id", (req, res) => {
  const query = { _id: req.params.id };
  Article.deleteOne(query, (err, article) => {
    if (err) {
      console.log(err);
    } else {
      return res.json(article);
    }
  });
});

module.exports = router;
