const express = require('express');
const PodController = require('../controllers/PodController');
const NodeController = require('../controllers/NodeController');
const DeploymentController = require('../controllers/DeploymentController');
const ServiceController = require('../controllers/ServiceController');
const ClusterController = require('../controllers/ClusterController');
const nodeRouter = require('../routes/nodeRouter');

// api/local/nodes/ (get) returns all nodes
// api/local/nodes/name (get) returns node with name
// api/local/nodes/name (put) change the name of that node
// api/local/nodes/changeCpu (put) to change cpu of node
const localRouter = express.Router();

localRouter.get('/pods', PodController.getPods, (req, res, next) => {
  return res.status(200).json(res.locals.pods);
});

localRouter.get('/nodes', nodeRouter);

localRouter.get(
  '/deployments',
  DeploymentController.getDeployments,
  (req, res, next) => {
    return res.status(200).json(res.locals.deployments);
  }
);

localRouter.get(
  '/services',
  ServiceController.getServices,
  (req, res, next) => {
    return res.status(200).json(res.locals.services);
  }
);

localRouter.get(
  '/clusters',
  ClusterController.getClusters,
  (req, res, next) => {
    return res.status(200).json(res.locals.clusters);
  }
);

module.exports = localRouter;
