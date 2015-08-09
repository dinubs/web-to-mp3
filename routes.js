var base_controller = require('./controllers/base');

module.exports = function(server) {
  server.route({method: 'GET', path: '/', handler: base_controller.index});
  server.route({method: 'GET', path: '/get', handler: base_controller.get});
  server.route({method: 'GET', path: '/get/audio', handler: base_controller.getAudio});
  server.route({method: 'GET', path: '/list', handler: base_controller.list});
}