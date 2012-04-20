var path = require('path'),
    fs = require('fs'),
    qs = require('querystring');

function Render(request, response) {
    this.request = request;
    this.response = response;
}

Render.prototype.json = function () {
    var req = this.request,
        res = this.response;
}

Render.prototype.view = function (filePath) {
    var req = this.request,
        res = this.response,
        ext = filePath.match('.html|.js|.css')[0],
        fileTypes = {
            '.html': 'html',
            '.js': 'javascript',
            '.css': 'css'
        };
    
    path.exists(filePath, function(exists) {
        if (exists) {
            fs.readFile(filePath, function(err, content) {
                if (!err) {
                    var ext = filePath.match('.html|.js|.css')[0];
                    res.writeHead(200, {"Content-Type": "text/" + fileTypes[ext]});
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

function client(request, response) {
    var render = new Render(request, response);
    render.view('./views/client.html');
}

function index(request, response) {
    var render = new Render(request, response);
    render.view('./views/index.html');
}

// TODO This request handler should probably be abstracted from the user. The
// user really only needs to only specify the directories that their static
// content is contained.
function staticResource(request, response, resource) {
    var render = new Render(request, response);
    render.view('./static/' + resource);
}

function testcaseAdd(request, response) {
    if (request.method == 'POST') {
        console.log("Incoming POST data");
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
exports.index = index;
exports.client = client;
exports.staticResource = staticResource;
exports.testcaseAdd = testcaseAdd;
