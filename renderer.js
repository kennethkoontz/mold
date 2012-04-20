// TODO Use this module by requestHandler so that we can separate some code.
var fs = require('fs');

function Render(request, response) {
    this.request = request;
    this.response = response;
}

Render.prototype.json = function () {
    var req = this.request,
        res = this.response;
}

Render.prototype.view = function (filePath) {
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
                    var ext = filePath.match('.html|.js|.css')[0];
                    console.log(ext);
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
            console.log("File doesn't exist: " + filePath);
            res.writeHead(404);
            res.write('404', 'utf-8');
            res.end();
        }
    });
}

exports.Render = Render;
