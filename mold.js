#!/usr/bin/env node

var fs =  require('fs'),
    path = require('path'),
    util = require('util'),
    cli = require('commander'),
    installPrefix = (process.installPrefix === undefined) ? '/usr/local' : process.installPrefix;

/* Utility function to make a specified directory.
 *
 * @param moldName {string} path to directory.
 *
 */
function mkDir(path) {
    fs.mkdirSync(path);
    console.log('[Created]: %s', path);
}

/* Make the initial directories/files mold.
 *
 * [moldName]/actions.js
 * [moldName]/routes.js
 * [moldName]/app/models
 * [moldName]/app/views
 * [moldName]/app/controllers
 * [moldName]/routes.js
 *
 */
function makeMold(moldName) {
    var moldDir = path.join(process.cwd(), moldName),
        viewsDir = path.join(moldDir, 'views'),
        staticDir = path.join(moldDir, 'static'),
        indexFile = path.join(viewsDir, 'index.html'),
        routesFile = path.join(moldDir, 'routes.js'),
        actionsFile = path.join(moldDir, 'actions.js');

    // Create app root, static, and views directories.
    mkDir(moldDir);
    mkDir(staticDir);
    mkDir(viewsDir); 
    
    // Create the 'routes.js' file.
    fs.writeFileSync(routesFile);
    fs.stat(routesFile, function (err) {
        var tmplDir = '/lib/node_modules/mold/templates/' // node's global template directory.
        if (err) {
            throw err
        } else {
            is = fs.createReadStream(path.join(installPrefix, tmplDir, 'routes.js'));
            os = fs.createWriteStream(routesFile);
            util.pump(is, os);
            console.log('[Created]: %s', routesFile);
        }
    });

    // Create the 'actions.js' file.
    fs.writeFileSync(actionsFile);
    fs.stat(actionsFile, function (err) {
        var tmplDir = '/lib/node_modules/mold/templates/' // node's global template directory.
        if (err) {
            throw err
        } else {
            is = fs.createReadStream(path.join(installPrefix, tmplDir, 'actions.js'));
            os = fs.createWriteStream(actionsFile);
            util.pump(is, os);
            console.log('[Created]: %s', actionsFile);
        }
    });
   
    // Create the default view file: 'views/index.html'.
    fs.writeFileSync(indexFile);
    fs.stat(indexFile, function (err) {
        var tmplDir = '/lib/node_modules/mold/templates/' // node's global template directory.
        if (err) {
            throw err
        } else {
            is = fs.createReadStream(path.join(installPrefix, tmplDir, 'views/index.html'));
            os = fs.createWriteStream(indexFile);
            util.pump(is, os);
            console.log('[Created]: %s', indexFile);
        }
    });

}

/* Start the server with 'env' environment.
 *
 * @params: 
 * env - environment
 * port - port number to start server on.
 *
 */
function startServer(env, port) {
    var server = require('./server');
    server.start(port);
}

cli .version('0.0.1')

    // mold create [name]
cli .command('create [name]')
    .description('create directories/files for mold')
    .action( function(name) {
        var noNameMsg = 'Could not create Mold app, please specify an app name.';
        if (typeof name === "undefined") {
            console.log(noNameMsg);
            process.exit(1);
        } else {
            makeMold(name);
        }
    });

    // mold startserver [env]
cli .command('startserver [env]')
    .description('Start server with specified environment.')
    .action(function(env) {
        this.env = env;
        if (typeof this.env === "undefined") {
            // If no environment is specified we want to start the server with
            // the development settings.
            this.env = 'dev';
            startServer(this.env, 8000);
        } else {
            // Else start with specified environment.
            startServer(this.env, 8000);
        }
    });

cli.parse(process.argv);
