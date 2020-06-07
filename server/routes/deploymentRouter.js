const express = require('express');
const DeploymentController = require('../controllers/DeploymentController');

const router = express.Router();

router.get('/', DeploymentController.getDeployments, (req, res, next) => {
  return res.status(200).json(res.locals.deployments);
});
module.exports = router;
