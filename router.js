var Actions = require('./actions'),
    requestHandler = require('./requestHandler'),
    handle = {
        "/": requestHandler.index,
        "/client": requestHandler.client,
        "/testcase/add": requestHandler.testcaseAdd,
    };

/* Return a string representation that is the leaf of a path.
 *
 * @params
 * path - (string) uri path
 *
 * @returns
 * leafPath - (string) leaf of path
 */
function leafPath(path) {
    var s = path.split('/'); // array - split path
    return s[s.length-1];
}

function noRoute(response, request) {
    response.writeHead(404, {"Content-Type": "application/javascript"});
    response.write('404');
    response.end();
}

function staticResource(resource) {
    this.render('./static/' + resource);
}

/* If incoming request is for a static file. Route to static.
 * Else if incoming request is for an action. Route to action.
 * Else log to console that there is no route.
 */
function route(pathname, request, response, postData) {
    var resource = leafPath(pathname);
    if (pathname.match('.js|.css')) {
        // pathname contains a js or css extension
        staticResource.call(new Actions.Action(request, response), resource);
    } else if (typeof handle[pathname] === 'function' && pathname !== '/static') {
        handle[pathname].call(new Actions.Action(request, response, postData));
    } else {
        noRoute(response, request);
    }
}

exports.route = route;
