const express = require('express');
const app = express();
const studentRouter = require('./routes/student.js');
const clazzRouter = require('./routes/clazz.js');
// const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded());  // 解析application/x-www-form-urlencoded编码的数据
// app.use(bodyParser.json());        // 解析application/json编码的数据


app.use(express.urlencoded());  // 解析application/x-www-form-urlencoded编码的数据
app.use(express.json());        // 解析application/json编码的数据


// 托管 public 目录下的静态资源
app.use(express.static('public'));


app.use(function(req, res, next){

    res.header('Access-Control-Allow-Origin', '*')
    res.header('Content-Type', 'application/json')

    next();
});


app.use('/student', studentRouter);
/*
/student
/student/create
/student/update
/student/delete

*/

app.use('/clazz', clazzRouter);

/*
/clazz
/clazz/create
/clazz/update
/clazz/delete

*/

app.listen(8080, () => console.log('Server running at port 8080'));
