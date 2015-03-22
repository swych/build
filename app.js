var restify = require('restify');
var controller = require('./controllers');
var PATH = require('path');
var ecstatic = require('ecstatic');

function respond(req, res, next) {
    res.send({hello: 'build'});
    next();
}



var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.get('/', respond);

server.get(/\/archive\/?.*/, restify.serveStatic({
    directory: './static'
}));

server.get('/hook/:target', controller.hook);
server.post('/hook/:target', controller.hook);

server.listen(8000, function() {
    console.log('%s listening at %s', server.name, server.url);
});