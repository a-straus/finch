const kubernetes = require('../../k8s-client/config');

module.exports = {
  getPods: async (req, res, next) => {
    const namespace = req.query.namespace || 'default';
    const { name } = req.query;
    let response;
    try {
      if (name) {
        response = await kubernetes.api.v1
          .namespaces(namespace)
          .pods(name)
          .get();
        res.locals.pods = response.body;
      } else {
        response = await kubernetes.api.v1.namespaces('default').pods.get();
        res.locals.pods = response.body.items;
      }
      next();
    } catch (err) {
      next({
        log: `Encountered an error in PodController.getPods: ${err}`,
        status: 400,
        message: 'An error occured fetching pods',
      });
    }
  },
  getLogs: async (req, res, next) => {
    const namespace = req.query.namespace || 'default';
    const { name } = req.query;
    try {
      response = await kubernetes.api.v1
        .namespaces(namespace)
        .pods(name)
        .log.get();
      res.locals.podLogs = response.body;
      next();
    } catch (err) {
      next({
        log: `Encountered an error in PodController.getLogs: ${err}`,
        status: 400,
        message: 'An error occured fetching podLogs',
      });
    }
  },
};
