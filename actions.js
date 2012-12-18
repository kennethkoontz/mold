var path = require('path');
var qs = require('querystring');
var fs = require('fs');
var mime = require('mime');

function Action(request, response, postData) {
    this.request = request;
    this.response = response;
    this.postData = postData;
}

Action.prototype.redirect = function(url) {
    this.response.writeHead(302, {
          'Location': url
    });
    this.response.end();
}

Action.prototype.json = function (json) {
    if (typeof json === 'object') {
        json = JSON.stringify(json);
    }
    this.response.writeHead(200, {"Content-Type": "application/json"});
    this.response.write(json);
    this.response.end();
}

Action.prototype.statusCode = function (code) {
    this.response.writeHead(code);
    this.response.write(code.toString());
    this.response.end();
}

Action.prototype.render = function (filePath) {
    var req = this.request;
    var res = this.response;
    
    path.exists(filePath, function(exists) {
        if (exists) {

            fs.readFile(filePath, function(err, content) {
                var m = mime.lookup(filePath);
                
                if (!err) {
                    res.writeHead(200, { 'Content-Type': m });
                    res.write(content, mime.extension(m));
                    res.end();
                } else {
                    res.writeHead(500);
                    res.write('500', 'utf-8');
                    res.end();
                    throw err;
                }
            });
        } else {
            res.writeHead(404);
            res.write('404', 'utf-8');
            res.end();
        }
    });
}

exports.Action = Action;
