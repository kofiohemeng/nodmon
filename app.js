// app.js

const http = require('http');
const url = require('url');
const fs = require('fs');

const router = require('./routes/router');
const routes = require('./routes/user');

process.on('uncaughtException', function(err) {
    // handle the error safely
    console.log('uncaughtException');
    console.error(err.stack);
    console.log(err);
});

const server = http.createServer(async (req, res) => {

    if (req.url.includes('api')) {
        await router(req, res, routes);
    }
    else if (req.url.includes('css')) {
        let page_name = url.parse(req.url).pathname;
        fs.readFile("./" + page_name.substr(1), function (err, html) {
            res.writeHead(200, {"Content-Type": "text/css"});
            res.write(html);
            res.end();
        });
    }
    else {
        let page_name = url.parse(req.url).pathname;

        if (page_name == "/") { // home page
            page_name = "/home";
        }

        fs.readFile("./view/" + page_name.substr(1) + ".html", function (err, html) {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });   
    }        
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});