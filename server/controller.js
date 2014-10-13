

/**

 * Simple Controller to check requests parameters and call services.

 */


var service = require('./services/services.js');



exports.initialize = function(server){






    server.get('/allKids', function(req, res, next ){

        res.send(service.getKids());

    });

};

