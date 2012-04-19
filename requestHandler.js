var path = require('path'),
    qs = require('querystring');
    fs = require('fs');

function postBody(request) {
}

function client(response, request) {
    console.log("Request handler 'client' was called.");
    var filePath = './views/index.html';
    path.exists(filePath, function(exists) {
        if (exists) {
            console.log('Opening file: ' + filePath);
            fs.readFile(filePath, function (err, content) {
                if (!err) {
                    response.writeHead(200, {"Content-Type": "text/html"});
                    response.write(content, 'utf-8');
                    response.end();
                } else {
                    response.writeHead(500);
                    response.write('500', 'utf-8');
                    response.end();
                    throw err;
                }
            });
        } else {
            console.log("File doesn't exist: " + filePath);
            response.writeHead(404);
            response.write('404', 'utf-8');
            response.end();
        }
    });
}

function staticResource(response, resource) {
    // If resource exists load resource, if resource doesn't exist return 404.
    console.log("Request handler for static file called: " + resource);
    var filePath = './static/' + resource;
    path.exists(filePath, function(exists) {
        if (exists) {
            console.log('Opening file: ' + filePath);
            fs.readFile(filePath, function (err, content) {
                if (!err) {
                    response.writeHead(200, {"Content-Type": "text/javascript"});
                    response.write(content, 'utf-8');
                    response.end();
                } else {
                    response.writeHead(500);
                    response.write('500', 'utf-8');
                    response.end();
                    throw err;
                }
            });
        } else {
            console.log("File doesn't exist: " + filePath);
            response.writeHead(404);
            response.write('404', 'utf-8');
            response.end();
        }
    });
}

function testcaseAdd(response, request) {
    console.log("Incoming POST data");
    if (request.method == 'POST') {
        var body = '';
        request.on('data', function(data) {
            body += data;
        });
        request.on('end', function() {
            response.writeHead(200, {"Access-Control-Allow-Origin": "*"});
            response.write(JSON.stringify(qs.parse(body)));
            response.end();
        });
    } else {
        response.writeHead(405);
        response.write('405', 'utf-8');
        response.end();
    }
}

function noRoute(response, request) {
    response.writeHead(404, {"Content-Type": "application/javascript"});
    response.write('404');
    response.end();
}

exports.noRoute = noRoute;
exports.client = client;
exports.staticResource = staticResource;
exports.testcaseAdd = testcaseAdd;
