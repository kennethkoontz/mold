function leafPath(path) {
    /* Return a string representation that is the leaf of a path.
     *
     * @params
     * path - (string) uri path
     *
     * @returns
     * leafPath - (string) leaf of path
     */
    var s = path.split('/'); // array - split path
    return s[s-1];
}

function route(handle, pathname, response) {
    console.log("Routing a request for: " + pathname);
    // If incoming request is for a static file. Route to static.
    // Else if incoming request is for an action. Route to action.
    // Else log to console that there is no route.
    var resource = leafPath(pathname);
    console.log(pathname, pathname.match('.js|.css'));
    if (pathname.match('.js|.css')) {
        // pathname contains a js or css extension
        handle['/static'](response, resource);
    } else if (typeof handle[pathname] === 'function' && pathname !== '/static') {
        handle[pathname](response);
    } else {
        handle['noroute'](response);
    }
}

exports.route = route;
