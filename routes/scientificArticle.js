const express = require('express');
const router = express.Router();
const ScientificArticle = require("../models/scientificArticle");

router.post('/add', function (req, res, next) {
  ScientificArticle.insertScientificArticle(req.body.title, req.body.authors, req.body.otherAuthors, req.body.dateOfPublication, req.body.classification, req.body.abstract, req.body.body, req.body.references)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (err) {
      console.error(err);
      res.json(err);
    });
});

router.post('/get/:id', function (req, res, next) {
  let id = req.params.id;
  ScientificArticle.getScientificArticle(id)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (err) {
      console.error(err);
      res.json(err);
    });
});

router.post('/delete/:id', function (req, res, next) {
  let id = req.params.id;
  ScientificArticle.deleteScientificArticle(id)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (err) {
      console.error(err);
      res.json(err);
    });
});

router.post('/update/:id', function (req, res, next) {
  ScientificArticle.getScientificArticle(req.params.id)
    .then(function (scientificArticle) {
      return ScientificArticle.updateScientificArticle(scientificArticle, req.body.title, req.body.author, req.body.otherAuthors, req.body.dateOfPublication, req.body.classification, req.body.abstract, req.body.body, req.body.references);
    })
    .then(function (result) {
      res.json(result);
    })
    .catch(function (err) {
      console.error(err);
      res.json(err);
    });
});

router.post('/getAll', function (req, res, next) {
  ScientificArticle.getAllScientificArticles()
    .then(function (result) {
      res.json(result);
    })
    .catch(function (err) {
      console.error(err);
      res.json(err);
    });
});

module.exports = router;
