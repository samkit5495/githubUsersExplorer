const express = require('express');
const router = express.Router();

const TechnicalDisclosure = require("../models/technicalDisclosure");

router.post('/add', function (req, res, next) {
  TechnicalDisclosure.insertTechnicalDisclosure(req.body.title, req.body.inventor, req.body.otherAuthors, req.body.dateOfPublication, req.body.classification, req.body.abstract, req.body.background, req.body.problem, req.body.description, req.body.example, req.body.claims)
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
  TechnicalDisclosure.getTechnicalDisclosure(id)
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
  TechnicalDisclosure.deleteTechnicalDisclosure(id)
    .then(function (result) {
      res.json(result);
    })
    .catch(function (err) {
      console.error(err);
      res.json(err);
    });
});

router.post('/update/:id', function (req, res, next) {
  TechnicalDisclosure.getTechnicalDisclosure(req.params.id)
    .then(function (technicalDisclosure) {
      return TechnicalDisclosure.updateTechnicalDisclosure(technicalDisclosure, req.body.title, req.body.inventor, req.body.otherAuthors, req.body.dateOfPublication, req.body.classification, req.body.abstract, req.body.background, req.body.problem, req.body.description, req.body.example, req.body.claims);
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
  TechnicalDisclosure.getAllTechnicalDisclosures()
    .then(function (result) {
      res.json(result);
    })
    .catch(function (err) {
      console.error(err);
      res.json(err);
    });
});

module.exports = router;
