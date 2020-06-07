const express = require('express');
const serviceController = require('../controllers/serviceController');

const router = express.Router();

router.get('/', serviceController.getServices, (req, res, next) => {
  return res.status(200).json(res.locals.services);
});
module.exports = router;
