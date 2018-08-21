var http = require("http");

// var router = require("./model/router");

var url = require("url");

var ejs = require("ejs");

var fs = require("fs");

var app = require("./model/model");

http.createServer((req, res) => {

    // web服务器，静态文件托管
    // router.statics(req, res, 'static');

    var pathName = url.parse(req.url).pathname.replace('/', '');

    res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });

    if (pathName != 'favicon.ico') {
        try {
            app[pathName](req, res);
        } catch (error) {
            app['notFound'](req,res);
        }
    }



    // if (pathName != '/favicon.ico') {

    //     res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });

    //     if (pathName == '/login') {
    //         ejs.renderFile('view/login.ejs', {}, (err, str) => {
    //             res.end(str)
    //         });
    //     } else if (pathName == '/doLogin') {
    //         if (req.method.toLowerCase() === 'get') {
    //             // GET请求
    //             console.log(url.parse(req.url).query);
    //         } else if (req.method.toLowerCase() === 'post') {
    //             // POST请求
    //             var postDate = '';
    //             // 数据块接收中
    //             req.on('data', (chunk) => {
    //                 postDate += chunk;
    //             });
    //             // 数据接收完毕执行回调函数
    //             req.on('end', () => {
    //                 try {
    //                     console.log(`${postDate}\n`);
    //                     fs.appendFile('login.txt', `${postDate}\n`, (err) => {
    //                         if(err){
    //                             console.error(err)
    //                         }
    //                     })
    //                 } catch (err) {
    //                     console.err(err);
    //                 }
    //             });
    //         }
    //         res.end('doLogin');
    //     } else if (pathName == 'register') {
    //         res.end('register');
    //     } else {
    //         ejs.renderFile('view/index.ejs', {
    //             msg: '首页',
    //             list: [1, 2, 3, 4, 5, 6],
    //             html: '<p>nihao</p>'
    //         }, (err, str) => {
    //             res.end(str)
    //         });
    //     }
    // }

}).listen(8001);