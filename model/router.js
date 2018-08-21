var url = require('url');

var events = require('events');

var path = require('path');

var EventEmitter = new events.EventEmitter();

var fs = require('fs');

function getMime(extname) {

    fs.readFile('mime.json', (err, data) => {
        if (err) {
            console.log(err);
        }
        EventEmitter.emit('data', JSON.parse(data.toString())[extname] || 'text/html');
    })

}

exports.statics = function (req, res, staticPath) {

    var pathName = url.parse(req.url).pathname;

    // 首页处理
    if (pathName === '/') {
        pathName = '/index.html'
    }

    // 通过的，需要处理的请求
    if (pathName != '/favicon.ico') {

        fs.readFile(`./${staticPath}/${pathName}`, (err, data) => {

            if (err) {

                fs.readFile(`./${staticPath}/404.html`, (err, data) => {
                    res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });
                    res.write(data);
                    res.end();
                });

            } else {

                // 事件驱动的方式
                EventEmitter.on('data', (result) => {
                    res.writeHead(200, { "Content-Type": `${result};charset='utf-8'` });
                    res.end(data);
                })

                // 事件驱动的方式
                getMime(path.extname(pathName));
            }
        })
    }

}