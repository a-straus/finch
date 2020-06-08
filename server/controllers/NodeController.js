const kubernetes = require('../../k8s-client/config');

module.exports = {
  getNodes: async (req, res, next) => {
    try {
      const { name } = req.query;
      let response;
      if (name) {
        response = await kubernetes.api.v1.nodes(name).status.get();
        res.locals.nodes = response.body;
      } else {
        response = await kubernetes.api.v1.nodes.get();
        res.locals.nodes = response.body.items;
      }
      console.log('Res.locals.nodes', res.locals.nodes);
      next();
      // const response = await kubernetes.api.v1.nodes.get();
      /* pods is an array of pod objects containing
    metadata:(name, namespace, creationTimeStamp
    spec: (volumes, containers, nodeName!, )
    status: (phase [like running etc], conditions, hostIp, podIP, podIPs, startTime, containerStatuses)
     */
    } catch (err) {
      next({
        log: `Encountered an error in NodeController.getNodes: ${err}`,
        status: 400,
        message: 'An error occured fetching nodes',
      });
    }
  },
};
