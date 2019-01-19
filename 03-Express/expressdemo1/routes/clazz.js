const express = require('express')
const router  = express.Router();
const fs = require('fs');
const path = require('path');

// 保存学生信息的文件路径
const CLAZZ_DATA_FILE = "./../data/clazz.json";

router.get('/', function(request, response) {
   
    response.status(200).send('Hell Clazz')

});

router.post('/create', function(request, response) {
   
    response.status(200).send('Hell Clazz')

});

router.put('/update', function(request, response) {
   
    response.status(200).send('Hell Clazz')

});

router.delete('/delete', function(request, response) {
   
    response.status(200).send('Hell Clazz')

});


exports = module.exports = router

