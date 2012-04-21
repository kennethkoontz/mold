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
    this.response.end();
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
