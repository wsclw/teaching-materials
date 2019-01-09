const express = require('express')
const router  = express.Router();
const fs = require('fs');
const path = require('path');

// 保存学生信息的文件路径
const STUDENT_DATA_FILE = "./../data/students.json";

// 获取所有学生的信息
router.get('/', function(request, response) {
    fs.readFile(path.join(__dirname, STUDENT_DATA_FILE), 'utf8', function(err, data){

        if(err) {
            console.log(err);
            return response.send(err);
        }

        response.status(200).send(data)
    });
});

// 新建学生的信息
router.post('/create', function(request, response){

    // 新学生的信息
    let newStudent = {
        id:      Date.now(),
        name:    request.body.name,
        age:     request.body.age,
        gender:  request.body.gender,
        tel:     request.body.tel,
        address: request.body.address,
        create:  new Date(),
        update:  new Date()
    }

    // 读取json文件中已存在的学生
    fs.readFile(path.join(__dirname, STUDENT_DATA_FILE), 'utf8', function(err, data){

        if(err) {
            throw err;
        }
        
        try {
            data = JSON.parse(data);
        } catch (error) {
            return console.log(error)
        }

        // 添加新学生信息
        data.push(newStudent);

        // 将所有学生的信息重新写回到json文件中
        fs.writeFile(path.join(__dirname, STUDENT_DATA_FILE), JSON.stringify(data, null, 4), function(err){
            // 将添加之后的学生信息返回给浏览器
            response.status(200).send(data);
        });
    });
});

router.put('/update', function(request, response) {

    // 获取students.json文件中的所有学生
    fs.readFile(path.join(__dirname, STUDENT_DATA_FILE), 'utf8', function(err, students){
        if(err) {
            throw err;
        }

        try {
            students = JSON.parse(students)
        } catch (error) {
            return console.log(error)
        }

        // 从所有的学生中找到要修改的学生
        students.forEach(student => {
            // 修改学生信息
            if(student.id == request.body.id) {
                student.name   = request.body.name;
                student.age    = request.body.age;
                student.gender = request.body.gender;
                student.tel    = request.body.tel;
                student.address = request.body.address;
                student.update = new Date();
            }
        });

        // 将修改之后的结果重新写回students.json文件中
        fs.writeFile(path.join(__dirname, STUDENT_DATA_FILE), JSON.stringify(students, null, 4), function(err){

    
            // 将修改之后的结果返回给前台
            response.status(200).send(students)
        });
    })
});

// 删除学生信息
router.delete('/delete', function(request, response) {

    // 接收前台传递过来的id
    console.log(request.body.id)

    // 获取students.json文件中所有学生
    // E:\huohua13\10-NodeJS\day02\express\expressdemo1 + ./data/students.json
    fs.readFile(path.join(__dirname, STUDENT_DATA_FILE), 'utf8', function(err, students){
        if(err) {
            throw err;
        }

        try {
            students = JSON.parse(students)
        } catch (error) {
            return console.log(error)
        }

        // 保存被删除学生的索引
        let indexToRemove = -1;
        
        // 根据id查找要删除的学生
        students.forEach((student, index) => {
            if(student.id == request.body.id) {
                indexToRemove = index;
            }
        });

        // 删除学生
        if(indexToRemove >= 0) {
            students.splice(indexToRemove, 1);
        }

        // 将删除之后剩余的学生信息保存到students.json文件中
        fs.writeFile(path.join(__dirname, STUDENT_DATA_FILE), JSON.stringify(students, null, 4), function(err){

            // 将删除之后剩余的学生信息返回给前台
            response.status(200).send(students)
        });
    })
});

exports = module.exports = router

