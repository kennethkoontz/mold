var path = require('path'),
    fs = require('fs');

function client(res) {
    console.log("Request handler 'client' was called.");
    var filePath = './views/index.html';
    path.exists(filePath, function(exists) {
        if (exists) {
            console.log('Opening file: ' + filePath);
            fs.readFile(filePath, function (err, content) {
                if (!err) {
                    res.writeHead(200, {"Content-Type": "text/html"});
                    res.write(content, 'utf-8');
                    res.end();
                } else {
                    res.writeHead(500);
                    res.write('500', 'utf-8');
                    res.end();
                    throw err;
                }
            });
        } else {
            console.log("File doesn't exist: " + filePath);
            res.writeHead(404);
            res.write('404', 'utf-8');
            res.end();
        }
    });
}

function staticResource(response, resource) {
    // If resource exists load resource, if resource doesn't exist return 404.
    console.log("Request handler for static file called: " + resource);
    response.writeHead(200, {"Content-Type": "application/javascript"});
    response.write('javascript');
    response.end();
}

function noRoute(response) {
    response.writeHead(404, {"Content-Type": "application/javascript"});
    response.write('404');
    response.end();
}

exports.noRoute = noRoute;
exports.client = client;
exports.staticResource = staticResource;
