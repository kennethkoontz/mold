### Install mold (npm):
Mold needs to be installed globally.

```
$ sudo npm install -g mold
```

#### List mold's help:
```
$ mold -h
```

#### Create an empty mold:
```
$ mold create [appname]
```

This creates the following structure:
/[appname]/{static/, views/}
routes.js
actions.js

#### Start server:
Starting up the server for your app. Change directory into [appname] directory.

The following starts a server on [port]. The default port is 8000.
```
[appname]$ mold startserver [port]
```

Your server is running. Point your browser to http://localhost:[port].

#### Routing requests to actions using the routes table

Mold maps http requests to actions. A request is routed by adding a property to routes.js; with the corresponding action being a property in actions.js.


Mold's default routes table looks like the following:
```
var routes = module.exports = {
    '/': 'index',
};
```

This will route any request for '/', to the 'index' action function in actions.js.

To map a route to an action. Simply define the url and action function. The following maps requests from '/' and '/foobar/add' to the 'index' and 'foobarAdd' function, respectively.
```
var routes = modules.exports = {
    '/': 'index',
    '/foobar/add': 'foobarAdd'
};
```

### Routing static resources
Mold assumes your static resources reside under the static directory. All static resources such as, css, js, images, etc, should be put in this directory. 

#### Defining action logic
Once you have a request mapped to an action, you can define the logic in the actions.js file.
```
var actions = module.exports = {
    index: function () {
        this.render('./views/index.html');
    },
    foobarAdd: function () {
        var req = this.request,
            res = this.response;
        if (req === 'POST') {
	    // Do something POSTY; like create a record in the db.
	    // Then respond back to client.
	    res.writeHead(200);
	    res.end()
        } else {
	    this.statusCode(405)
        }
    }
};
```

Notice that in the 'foobarAdd' function. The request and response objects are made available through 'this'. This allows flexibility and provides each action access to node's request and response objects.

There are a few functions made available in each action that can assist with handling the logic:

* **this.postData** - Data from a post form.
* **this.json(obj)** - Takes an object and responds to the request with JSON.
* **this.statusCode(code)** - Takes a number, representing the status code, responds with a status code.
* **this.render(pathToFile)** - Take a string, that represents the relative path to a file, whose contents you want to respond with.
* **this.redirect(url)** - Redirect to url.
