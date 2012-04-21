var Actions = require('./actions'),
    requestHandler = require('./requestHandler'),
    handle = {
        "/": requestHandler.index,
        "/client": requestHandler.client,
        "/static": requestHandler.staticResource,
        "/testcase/add": requestHandler.testcaseAdd,
        "noroute": requestHandler.noRoute
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

/* If incoming request is for a static file. Route to static.
 * Else if incoming request is for an action. Route to action.
 * Else log to console that there is no route.
 */
function route(pathname, request, response, postData) {
    var resource = leafPath(pathname);
    if (pathname.match('.js|.css')) {
        // pathname contains a js or css extension
        handle['/static'].call(new Actions.Action(request, response), resource);
    } else if (typeof handle[pathname] === 'function' && pathname !== '/static') {
        handle[pathname].call(new Actions.Action(request, response, postData));
    } else {
        handle['noroute'](response);
    }
}

exports.route = route;
