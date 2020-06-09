const express = require('express');
const PodController = require('../controllers/PodController');

const router = express.Router();

router.get('/', PodController.getPods, (req, res, next) => {
  return res.status(200).json(res.locals.pods);
});

router.get('/logs', PodController.getLogs, (req, res, next) => {
  return res.status(200).json(res.locals.podLogs);
});

module.exports = router;
