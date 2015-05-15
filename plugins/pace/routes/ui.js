var Handlebars = require('handlebars');

var PATHS = {
  dist: __dirname + '/../ui/dist',
  lib: __dirname + '/../../../lib'
};

module.exports = function(server, options) {
  var ui = server.select('ui'),
    api = server.select('api');

  ui.views({
    engines: {
      html: Handlebars
    },
    path: PATHS.dist,
    isCached: !server.app.config.development
  });

  var landingHandler = function(request, reply) {
    var freckle = require(PATHS.lib + '/freckle');

    reply.view('index', {
      title: 'Lullabot Pace | Project Listing',
      projects: freckle.getProjects(),
      appFile: (server.app.config.development) ? 'app.js' : 'app.min.js',
      api: api.info.uri
    });
  };

  ui.route({
    method: 'get',
    path: '/', // ends up being "/pace"
    config: {
      description: 'Serve the pace index.html',
      handler: landingHandler
    }
  });

  ui.route({
    method: 'get',
    path: '/assets/{p*}',
    config: {
      description: 'Path to serve the pace assets',
      handler: {
        directory: {
          path: PATHS.dist
        }
      }
    }
  });
}
