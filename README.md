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

```
[appname]$ mold startserver
```

Your server is running. Point your browser to http://localhost:8000.
