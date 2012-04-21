var path = require('path'),
    fs = require('fs'),
    qs = require('querystring');


function client() {
    this.render('./views/client.html');
}

function index() {
    this.render('./views/index.html');
}

// TODO This request handler should probably be abstracted from the user. The
// user really only needs to only specify the directories that their static
// content is contained.
function staticResource(resource) {
    this.render('./static/' + resource);
}

function testcaseAdd() {
    if (this.request.method == 'POST') {
        var body = '';
        this.request.on('data', function(data) {
            body += data;
        });
        this.request.on('end', function() {
            this.response.writeHead(200, {"Access-Control-Allow-Origin": "*"});
            this.response.write(JSON.stringify(qs.parse(body)));
            this.response.end();
        });
    } else {
        this.response.writeHead(405);
        this.response.write('405', 'utf-8');
        this.response.end();
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
