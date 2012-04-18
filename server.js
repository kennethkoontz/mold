var http = require('http'),
    url = require('url');


function start(route, handle, port) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname
        console.log('Request made for: ' + pathname);
        route(handle, pathname, response);
    }

    http.createServer(onRequest).listen(port);
    console.log("Server has started on port:" + port);
}

exports.start = start;
