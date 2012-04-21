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
    if (this.request.method === 'POST') {
        this.json(this.postData);
    } else {
        this.statusCode(405);
    }
}

exports.index = index;
exports.client = client;
exports.staticResource = staticResource;
exports.testcaseAdd = testcaseAdd;
