#!/usr/bin/env node

var fs =  require('fs');
var path = require('path');
var util = require('util');
var cli = require('commander');
var colors = require('colors');
var spawn = require('child_process').spawn;
var installPrefix = process.env._.split('/bin')[0];
var moldInstallPath = path.join(installPrefix, '/lib/node_modules/mold');
var mold = JSON.parse(fs.readFileSync(path.join(moldInstallPath, '/package.json'), 'utf8'));

/* Utility function to make a specified directory.
 *
 * @param moldName {string} path to directory.
 *
 */
function mkDir(path) {
    fs.mkdirSync(path);
    console.log('[Created] '.green + '%s', path);
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
            console.log('[Created] '.green + '%s', routesFile);
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
            console.log('[Created] '.green + '%s', actionsFile);
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
            console.log('[Created] '.green + '%s', indexFile);
        }
    });

}

function startServer(port) {
    var p = path.join(installPrefix, '/lib/node_modules/mold/start.js'), // path to start.js
        port = (port === undefined) ? 8000 : port;
    if (port < 1024 && process.getuid() !== 0) {
        console.log('[error] '.red + 'Can\'t bind to a privileged port. Do you have root permissions?');
        process.exit(1);
    }
    child = process['child'] = spawn('node', [p, port]);
    child.stdout.on('data', function(data) {
        process.stdout.write(data+'\r');
    });
    child.stderr.on('data', function(data) {
        process.stderr.write(data+'\r');
    });
    child.on('exit', function (code, signal) {
        console.log('[info] '.blue + 'restarting server...\r');
        setTimeout(startServer(port), 1000);
    });
};

function inArray(element, array) {
    for (i in array) {
        if (array[i] === element) return true;
    };
    return false;
};

function startMonitor() {
    var dirs = [],
        files = [],
        ignoredFiles = ['.swp'];
        ignoredDirs = ['.git'];
    
    var recursiveWatch = function(filePath) {
        fs.watch(filePath, function(event, filename) {
            if (event === 'change' && !filename.match('.swp')) {
                process['child'].kill();
            }
        });
        fs.readdir(filePath, function(err, files) {
            if (!err) {
                files.forEach(function(file) {
                    var pathname = path.join(filePath, file);
                    fs.lstat(pathname, function(err, stats) {
                        if (err) {
                            throw err;
                        } else {
                            if (stats.isDirectory()) {
                                recursiveWatch(pathname);
                            }
                        }
                    });
                });
            } else {
                throw err;
            }
        });
    }
    
    recursiveWatch(process.cwd());
};

cli .version(mold.version)
cli .option('-w, --watch', 'recursively watch file changes')

    // mold create [name]
cli .command('create [name]')
    .description('create directories/files for mold')
    .action( function(name) {
        var noNameMsg = 'Could not create Mold app, please specify an app name.';
        if (typeof name === "undefined") {
            console.error('[Error] '.red + '%s', noNameMsg);
            process.exit(1);
        } else {
            makeMold(name);
        }
    });

    // mold startserver [port]
cli .command('startserver [port]')
    .description('Start server with specified port. (default: 8000)')
    .action(function(port) {
        startServer(port);

        // Start monitor if flag.
        if (cli.watch) { startMonitor(); }
    });

cli.parse(process.argv);
