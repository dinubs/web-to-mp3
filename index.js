var fs = require('fs');
var Hapi = require('hapi');

var server = new Hapi.Server();

server.connection({
  host: 'localhost',
  port: 8000
});

server.views({
    engines: { jade: require('jade') },
    path: __dirname + '/views',
    compileOptions: {
        pretty: true
    }
});

server.route({
  method: 'GET',
  path: '/audios/{id}/done.mp3',
  handler: function (req, res) {
    var files = fs.readdirSync('./audios');
    var id = parseInt(req.params.id);
    console.log(files[id + 1]);
    res.file('./audios/' + files[id + 1] + '/done.mp3');
  }
});

var routes = require('./routes')(server);

server.route({
    method: 'GET',
    path: '/css/{file}.css',
    handler: function (request, reply) {
        reply.file("./public/css/"+request.params.file+".css");
    }
});
server.route({
    method: 'GET',
    path: '/js/{file}.js',
    handler: function (request, reply) {
        reply.file("./public/js/"+request.params.file+".js");
    }
});

server.start();