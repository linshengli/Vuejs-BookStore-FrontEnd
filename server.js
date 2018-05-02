var fs = require("fs");
var http = require("http");
var url = require("url");
var path = require("path");
var sendRequest = require("request");

var root = path.resolve(".");
var allowExternalRequest = true;
var address = "127.0.0.1:8011";

var mime = {
    "html": "text/html",
    "htm": "text/html",
    "css": "text/css",
    "js": "text/javascript",
    "xml": "text/xml",
    "json": "application/json",

    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "png": "image/png",
    "gif": "image/gif",
    "bmp": "image/bmp",
    "svg": "image/svg+xml",
    "ico": "image/x-icon",

    "mp3": "audio/mpeg",
    "wav": "audio/x-wav",
    "mp4": "video/mp4",
    "swf": "application/x-shockwave-flash",

    "woff": "application/x-font-woff"

}

http.createServer(function (request, response) {
    if (!allowExternalRequest && request.headers["host"] != "127.0.0.1:8011" && request.headers["host"] != "localhost:8011") {
        response.writeHead(403);
        response.end("<h1>403 Forbidden</h1>")
        return;
    }

    console.log("-------------------------------------");
    console.log(request.method + ":" + url.parse(request.url).pathname);
    console.log(url.parse(request.url, true).query);
    console.log("user-agent:" + request.headers["user-agent"]);

    var post = '';
    request.on('data', function (chunk) {
        post += chunk;
    });

    console.log(request.headers.cookie);
    console.log("pathname:");
    console.log(url.parse(request.url).pathname)
    var fpath = path.join(root, url.parse(request.url).pathname);
    fs.stat(fpath, function (err, stat) {
        const {headers, method} = request;
        console.log(headers)
        // console.log(method)
        // console.log(url)
        console.log("fpath:");
        console.log(fpath)
        console.log("root:")
        console.log(root)
        if (fpath == root + "/") {
            response.writeHead(200, {"Content-type": "text/html; charset=utf-8"});
            console.log("here!")
            fs.createReadStream("./index.html").pipe(response);
        }
        else if (err || !stat.isFile()) {
            //console.log(url.parse(request.url));
            var target = "http://" + address + url.parse(request.url).path;
            console.log(request.method + " " + target);
            if (request.method == "GET" || request.method == "DELETE") {
                var options = {url: target, method: request.method, headers: {Cookie: request.headers.cookie}};
                sendRequest(options).pipe(response);
            }
            else {
                const {headers} = request;
                console.log("HHHHHHh")
                console.log(headers)
                var options = {}
                if (headers["Content-Type"] == "application/json" || headers["content-type"] == "application/json") {
                    options = {
                        url: target,
                        method: request.method,
                        headers: {"Content-Type":"application/json", Cookie: request.headers.cookie || null}
                    };
                } else {
                    options = {url: target, method: request.method, headers: {Cookie: request.headers.cookie || null}};
                }
                //console.log(options);
                console.log("PPPPPP");
                console.log(post);
                post = JSON.stringify(post)
                console.log(post);
                console.log(options);
                sendRequest(options/*, {form: post}*/).form(post).pipe(response);
            }
        }
        else {
            var extname = path.extname(fpath);
            extname = extname ? extname.slice(1) : 'unknown';
            var resContentType = mime[extname] || 'text/plain';

            response.writeHead(200, {'Content-type': resContentType});
            if (extname == "woff" || extname == "woff2") {
                fs.readFile(fpath, "binary", function (err, data) {
                    var rsp = data;
                    response.end(rsp, "binary");
                })
            } else {
                fs.readFile(fpath, "utf-8", function (err, data) {
                    var rsp = data;
                    response.end(rsp);
                })
            }
        }
    });
}).listen(8081, () => {
    console.log("listen on 8081");
});
