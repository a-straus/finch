const kubernetes = require('../../k8s-client/config');

module.exports = {
  getPods: async (req, res, next) => {
    const { name } = req.query;
    let response;
    try {
      if (name) {
        response = await kubernetes.api.v1
          .namespaces('default')
          .pods(name)
          .get();
        res.locals.pods = response.body;
      } else {
        response = await kubernetes.api.v1.namespaces('default').pods.get();
        res.locals.pods = response.body.items;
      }
      /* pods is an array of pod objects containing
      metadata:(name, namespace, creationTimeStamp
      spec: (volumes, containers, nodeName!, )
      status: (phase [like running etc], conditions, hostIp, podIP, podIPs, startTime, containerStatuses)
     */
      console.log(res.locals.pods);
      next();
    } catch (err) {
      next({
        log: `Encountered an error in PodController.getPods: ${err}`,
        status: 400,
        message: 'An error occured fetching pods',
      });
    }
  },
};
