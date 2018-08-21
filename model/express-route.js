var url = require('url');

function changeRes(res) {
    res.send = function (data) {

        res.writeHead(200, { "Content-Type": "text/html;charset='utf-8'" });

        res.end(data);
    }
}

var server = function () {

    var G = this;

    this._get = {};

    this._post = {};

    // 路由入口
    var app = function (req, res) {

        changeRes(res);

        var pathname = url.parse(req.url).pathname;

        var method = req.method.toLowerCase();

        if (pathname != '/favicon.ico') {
            if (!pathname.endsWith('/')) {
                pathname = `${pathname}/`;
            }

            console.log(pathname);

            if (G[`_${method}`][pathname]) {

                if (method === 'get') {
                    G._get[pathname](req, res);
                } else if (method === 'post') {
                    var postData = '';
                    req.on('data', (chunk) => {
                        postData += chunk;
                    });
                    req.on('end', () => {
                        try {
                            res.body = postData;
                            G._post[pathname](req, res);
                        } catch (error) {
                            console.error(error);
                        }
                    });
                }

            } else {
                res.send('not found 404');
            }
        }



    }

    // 注册路由

    // GET
    app.get = function (string, callback) {

        if (!string.endsWith('/')) {
            string = `${string}/`;
        }

        if (!string.startsWith('/')) {
            string = `/${string}`;
        }

        console.log(string);

        G._get[string] = callback;
    }

    // POST
    app.post = function (string, callback) {

        if (!string.endsWith('/')) {
            string = `${string}/`;
        }

        if (!string.startsWith('/')) {
            string = `/${string}`;
        }

        console.log(string);

        G._post[string] = callback;

    }

    return app;

}

module.exports = server();