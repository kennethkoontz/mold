var http = require('http'),
    url = require('url'),
    qs = require('querystring'),
    router = require('./router');

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
            router.route(pathname, request, response, qs.parse(postData));
        });
    }
    http.createServer(onRequest).listen(port);
    console.log("Server has started on port:" + port);
}

exports.start = start;
