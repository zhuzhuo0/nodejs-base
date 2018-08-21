var ejs = require('ejs');

var fs = require('fs');

var app = {
    login: function (req, res) {
        ejs.renderFile('view/login.ejs', {}, (err, str) => {
            res.end(str)
        });
    },
    doLogin: function (req, res) {
        if (req.method.toLowerCase() === 'get') {
            // GET请求
            console.log(url.parse(req.url).query);
        } else if (req.method.toLowerCase() === 'post') {
            // POST请求
            var postDate = '';
            // 数据块接收中
            req.on('data', (chunk) => {
                postDate += chunk;
            });
            // 数据接收完毕执行回调函数
            req.on('end', () => {
                try {
                    console.log(`${postDate}\n`);
                    fs.appendFile('login.txt', `${postDate}\n`, (err) => {
                        if (err) {
                            console.error(err)
                        }
                    })
                } catch (err) {
                    console.err(err);
                }
            });
        }
        res.end('doLogin');
    },
    register: function (req, res) {
        res.end('register');
    },
    notFound: function (req, res) {
        res.end('404');
    }
}

module.exports = app;