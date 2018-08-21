var MongoClient = require('mongodb').MongoClient;

var dbUrl = 'mongodb://127.0.0.1:27017/itying';

var http = require('http');

var app = require('./model/express-route');

var ejs = require('ejs');

http.createServer(app).listen(8010);

app.get('/add', (req, res) => {
    MongoClient.connect(dbUrl, (err, client) => {
        if (err) {
            console.log('connect fail');
        }
        client.db('itying').collection('user').insertOne(
            { "name": "zhuzhu", "age": 23, "sex": "famale" },
            (error, result) => {
                if (error) {
                    console.log('insert fail');
                }
                console.log(result);
                res.send('添加成功');
            })
    })
});

app.get('/', (req, res) => {
    MongoClient.connect(dbUrl, (err, client) => {
        if (err) {
            console.log('connect fail');
            return;
        }
        let list = [];
        result = client.db('itying').collection('user').find({}, (error, result) => {
            if (error) {
                console.log('find fail');
                return;
            }
            return result;
        })
        result.each((err, doc) => {
            if (err) {
                console.log(err);
            } else {
                if (doc) {
                    list.push(doc);
                } else {
                    console.log('finish', list)
                    ejs.renderFile('./view/index.ejs',{list:list}, (err,data) => {
                        if(err){
                            console.log(err)
                            return;
                        }
                        res.send(data);
                    })
                }
            }
        })
    })
})