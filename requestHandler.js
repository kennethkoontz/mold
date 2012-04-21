function client() {
    this.render('./views/client.html');
}

function index() {
    this.render('./views/index.html');
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
exports.testcaseAdd = testcaseAdd;
