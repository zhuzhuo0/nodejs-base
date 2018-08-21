var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://127.0.0.1:27017/itying'; // 连接数据库的地址，itying表示数据库的名称

var http = require('http');

var app = require('./model/express-route');

var ejs = require('ejs');

http.createServer(app).listen(8001);

app.get('/login', (req, res) => {

    ejs.renderFile('./view/login.ejs', {}, (err, data) => {
        res.send(data);
    });

});

app.get('/', (req, res) => {

    ejs.renderFile('./view/index.ejs', {
        msg: 'hello welcome nodejs',
        list: [1, 2, 3, 4, 5],
        html: '<p>hello nodejs</p>'
    }, (err, data) => {
        res.send(data);
    })

});

app.post('/doLogin', (req, res) => {
    console.log(res.body);
    res.send(`<script>alert('login success')</script>`)
});

app.get('/register', (req, res) => {
    res.send('register');
});

app.get('/add', (req, res) => {
    // 增加数据
    MongoClient.connect(url, (err, client) => {

        if (err) {
            console.log(err);
            console.log('connect fail');
            return;
        }

        // 2.x 老版本写法
        // db.collection('user').insertOne({
        //     "name": "nodejs",
        //     "age": 10
        // }, (error, result) => {
        //     if (error) {
        //         console.log('add fail');
        //         return;
        //     }
        //     res.send('增加数据成功');

        //     db.close(); // 关闭数据库

        // })

        // 3.x 版本写法
        client.db("itying").collection('user').insertOne({
            "name": "nodejs",
            "age": 10
        }, (error, result) => {
            if (error) {
                console.log('add fail');
                return;
            }
            res.send('增加数据成功');

            client.close(); // 关闭数据库

        })

    })
})

app.get('/update', (req, res) => {
    MongoClient.connect(url, (err, client) => {
        if (err) {
            console.log(err);
            console.log('连接数据库失败');
            return;
        }
        client.db('itying').collection('user').updateOne(
            { "name": "nodejs" },
            { $set: { "age": 40 } },
            (error, result) => {
                if (error) {
                    console.log('update fail');
                    return;
                }
                res.send('修改数据成功');

                console.log(result);

                client.close(); // 关闭数据库
            }
        )
    })
})

app.get('/find', (req, res) => {
    MongoClient.connect(url, (err, client) => {
        if (err) {
            console.log(err);
            console.log('连接数据库失败');
            return;
        }
        client.db('itying').collection('user').findOne(
            { "name": "nodejs" },
            (error, result) => {
                if (error) {
                    console.log("find fail");
                    return;
                }
                res.send("查询数据失败");
                console.log(result);
                client.close();
            }
        )
    })
})

app.get('/delete', (req, res) => {
    MongoClient.connect(url, (err, client) => {
        if (err) {
            console.log(err);
            console.log('连接数据库失败');
            return;
        }
        client.db('itying').collection('user').deleteOne(
            { "name": "nodejs" },
            (error, result) => {
                if (error) {
                    console.log('delete fail');
                    return;
                }
                res.send('删除数据成功');
                console.log(result);
                client.close();
            }
        )
    })
})