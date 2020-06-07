const express = require('express');
const PodController = require('../controllers/PodController');
const NodeController = require('../controllers/NodeController');
const DeploymentController = require('../controllers/DeploymentController');
const ServiceController = require('../controllers/ServiceController');
const ClusterController = require('../controllers/ClusterController');
const nodeRouter = require('../routes/nodeRouter');
const podRouter = require('../routes/podRouter');
const deploymentRouter = require('../routes/deploymentRouter');
const serviceRouter = require('../routes/serviceRouter');

// api/local/nodes/ (get) returns all nodes
// api/local/nodes/name (get) returns node with name
// api/local/nodes/name (put) change the name of that node
// api/local/nodes/changeCpu (put) to change cpu of node
const localRouter = express.Router();

localRouter.use('/pods', podRouter);
localRouter.use('/nodes', nodeRouter);
localRouter.use('/deployments', deploymentRouter);
localRouter.use('/services', serviceRouter);
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
