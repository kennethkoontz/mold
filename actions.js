var path = require('path'),
    qs = require('querystring'),
    fs = require('fs');

function Action(request, response, postData) {
    this.request = request;
    this.response = response;
    this.postData = postData;
}

Action.prototype.json = function (json) {
    this.response.writeHead(200, {"Content-Type": "application/json"});
    this.response.write(JSON.stringify(json));
    this.response.end();
}

Action.prototype.statusCode = function (code) {
    this.response.writeHead(code);
    this.response.write(code.toString());
    this.response.end();
}

Action.prototype.render = function (filePath) {
    var req = this.request,
        res = this.response,
        ext = filePath.match('.html|.js|.css')[0],
        fileTypes = {
            '.html': 'html',
            '.js': 'javascript',
            '.css': 'css'
        };
    
    path.exists(filePath, function(exists) {
        if (exists) {
            fs.readFile(filePath, function(err, content) {
                if (!err) {
                    var ext = filePath.match('\\.html|\\.js|\\.css')[0];
                    res.writeHead(200, {"Content-Type": "text/" + fileTypes[ext]});
                    res.write(content, 'utf-8');
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
