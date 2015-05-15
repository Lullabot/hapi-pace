var Handlebars = require('handlebars');

var PATHS = {
  dist: __dirname + '/../ui/dist',
  lib: __dirname + '/../../../lib'
}

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

  ui.route({
    method: 'get',
    path: '/', // ends up being "/rguru"
    config: {
      description: 'Serve the rguru index.html',
      handler: function(request, reply) {
        var rguru = require(PATHS.lib + '/rguru');
        reply.view('index', {
          title: 'rguru UI',
          projects: rguru.getProjects(),
          someContent: 'This is templated content',
          appFile: (server.app.config.development) ? 'app.js' : 'app.min.js',
          api: api.info.uri
        });
      }
    }
  });

  ui.route({
    method: 'get',
    path: '/{p*}',
    config: {
      description: 'Path to serve the rguru assets',
      handler: {
        directory: {
          path: PATHS.dist
        }
      }
    }
  });
}
