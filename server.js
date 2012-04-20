var http = require('http'),
    url = require('url'),
    router = require('./router'),
    requestHandler = require('./requestHandler'),
    handle = {
        "/": requestHandler.index,
        "/client": requestHandler.client,
        "/static": requestHandler.staticResource,
        "/testcase/add": requestHandler.testcaseAdd,
        "noroute": requestHandler.noRoute
    };


function start(port) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname
        console.log('Request made for: ' + pathname);
        router.route(handle, pathname, response, request);
    }

    http.createServer(onRequest).listen(port);
    console.log("Server has started on port:" + port);
}

exports.start = start;
