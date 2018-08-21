
var http = require('http');

var app = require('./model/express-route');

var ejs = require('ejs');

http.createServer(app).listen(8001);

app.get('/login', (req, res) => {

    ejs.renderFile('./view/login.ejs',{},(err,data)=>{
        res.send(data);
    });

});

app.get('/',(req,res)=>{

    ejs.renderFile('./view/index.ejs',{
        msg:'hello welcome nodejs',
        list:[1,2,3,4,5],
        html:'<p>hello nodejs</p>'
    },(err,data)=>{
        res.send(data);
    })

});

app.post('/doLogin',(req,res)=>{
    console.log(res.body);
    res.send(`<script>alert('login success')</script>`)
});

app.get('/register', (req, res) => {
    res.send('register');
});

