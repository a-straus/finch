const express = require('express');
const NodeController = require('../controllers/NodeController');

const router = express.Router();

router.get('/', NodeController.getNodes, (req, res, next) => {
  return res.status(200).json(res.locals.nodes);
});

module.exports = router;
