var http = require('http'),
    url = require('url'),
    qs = require('querystring'),
    colors = require('colors'),
    router = require('./router');

function start(port) {
    function onRequest(request, response) {
        var pathname = url.parse(request.url).pathname,
            postData = "";
        request.setEncoding("utf8");
        request.on('data', function(dataChunk) {
            postData += dataChunk;
        });
        request.on('end', function() {
            router.route(pathname, request, response, postData);
        });
    }
    http.createServer(onRequest).listen(port);
    console.log("[info] ".blue + "Server has started on port: %s", port);
}

exports.start = start;
