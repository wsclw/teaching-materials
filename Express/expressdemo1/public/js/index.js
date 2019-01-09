$(function(){

    // 获取所有学生
    $('#get_btn').click(function(){

        $.getJSON('/student', function(data){
            console.log(data)
        })
    });

    // 获取到添加按钮，并注册点击事件
    $('#add_btn').click(function(){

        var newStudent = {
            name: '闫飞雨',
            age: 19,
            gender: '女',
            tel: '13893345567',
            address: '信阳'
        };

        $.post('/student/create', newStudent, function(data){
            console.log(data)
        }, 'json')
    });

    // 获取删除按钮，并注册点击事件
    $('#del_btn').click(function(){

        var idToRemove = 1546930554999;

        $.ajax({
            url: '/student/delete',
            method: 'DELETE',
            data: {id: idToRemove},
            success: function(data){
                console.log(data)
            },
            dataType: 'json'
        })
    });

    // 修改学生信息
    $('#update_btn').click(function(){
        var editedStudent = {
            id: 1546930388329,
            name: '申雪猛',
            age: 20,
            gender: '男',
            tel: '13687398856',
            address: '新乡'
        };

        $.ajax({
            url: '/student/update',
            method: 'PUT',
            data: editedStudent,
            success: function(data) {
                console.log(data)
            },
            dataType: 'json'
        })
    })
})