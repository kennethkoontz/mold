var server = require('./server'),
    router = require('./router'),
    requestHandler = require('./requestHandler');

var handle = {
    "/": requestHandler.client,
    "/client": requestHandler.client,
    "/static": requestHandler.staticResource,
    "/testcase/add": requestHandler.testcaseAdd,
    "noroute": requestHandler.noRoute
};

server.start(router.route, handle, 3000);
