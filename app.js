var restify = require('restify');
var controller = require('./controllers');

function respond(req, res, next) {
    res.send({hello: 'world'});
    next();
}

var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.get('/', respond);
server.get('/hook/:target', controller.hook);
server.post('/hook/:target', controller.hook);

server.listen(8000, function() {
    console.log('%s listening at %s', server.name, server.url);
});