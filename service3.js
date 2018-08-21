var G = {};

var http = require('http');

var url = require('url');

var app = function (req, res) {

    var pathname = url.parse(req.url).pathname;

    if(!pathname.endsWith('/')){
        pathname = `${pathname}/`;
    }

    if (G[pathname]) {
        G[pathname](req,res);
    }else{
        res.end('not found 404');
    }
}

// 注册路由
app.get = function (string, callback) {

    if(!string.endsWith('/')){
        string = `${string}/`;
    }

    if(!string.startsWith('/')){
        string = `/${string}`;
    }

    console.log(string);

    G[string] = callback;
}

http.createServer(app).listen(8001);

app.get('login',function(req,res){
    res.end('login');
});

app.get('register',function(req,res){
    res.end('register');
});
