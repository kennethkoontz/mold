var http = require('http'),
    url = require('url'),
    qs = require('querystring'),
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
        var pathname = url.parse(request.url).pathname,
            postData = "";
        console.log('Request made for: ' + pathname);
        request.setEncoding("utf8");
        request.on('data', function(dataChunk) {
            postData += dataChunk;
        });
        request.on('end', function() {
            router.route(handle, pathname, request, response, qs.parse(postData));
        });
    }
    http.createServer(onRequest).listen(port);
    console.log("Server has started on port:" + port);
}

exports.start = start;
