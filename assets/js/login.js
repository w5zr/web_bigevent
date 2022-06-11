$(function() {
    // 点击去注册帐号
    $("#toReg").on("click", function() {
            $(".login_box").hide();
            $(".reg_box").show();
        })
        //点击去登录
    $("#toLogin").on("click", function() {
        $(".reg_box").hide();
        $(".login_box").show();
    })

    //表单验证
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var repwd = $(".reg_box [name=password]").val();
            if (value !== repwd) {
                return '两次密码不一致';
            }
        }

    })

    //监听注册表单的提交事件
    var layer = layui.layer;
    $("#form-reg").on("submit", function(e) {
        e.preventDefault();
        $.post('/api/reguser', { username: $("#form-reg [name=username]").val(), password: $("#form-reg [name=password]").val() }, function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            $("#toLogin").click();
            $(this)[0].reset();
        });
    })

    //监听登录表单的提交事件

    $("#form-login").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('登录失败，用户名或密码错误!');
                }
                localStorage.setItem('token', res.token);
                location.href = "index.html";
            }
        })

    })
})