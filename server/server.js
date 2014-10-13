

/**

 * WS stubs server on top of Node.js (http://nodejs.org) using Restify module (http://mcavage.me/node-restify/)

 * and convenient restify-validator (https://github.com/cjroebuck/restify-validator).

 *

 */


var restify = require('restify');

var restifyValidator = require('restify-validator');

var controller = require('./controller.js');


var server = restify.createServer({

    name: 'YANIS WS SERVER'

});


var port = 8282;


if(process.argv[2] && process.argv[2] !== ''){

    port = process.argv[2];

}


server.listen(port, function() {

    console.log('%s listening at %s', server.name, server.url);

});


server.use(restify.bodyParser());

server.use(restify.queryParser());

server.use(restifyValidator);


server.use(function(req, res, next) {

    res.setHeader('contentType','application/json');

    next();

});


controller.initialize(server);

