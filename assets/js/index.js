$(function() {
    //获取用户信息
    getUserinfo();

    function getUserinfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg("获取用户信息失败！");
                }
                renderAvatar(res.data);
            },
            complete: function(res) {
                console.log(res);

            }

        });
    }
    //渲染用户头像
    function renderAvatar(userinfo) {
        var name = userinfo.nickname || userinfo.username;
        $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
        if (userinfo.user_pic !== null) {
            $(".layui-nav-img").attr("src", userinfo.user_pic).show();
            $(".text-avatar").hide();
        } else {
            $(".layui-nav-img").hide();
            var first = name[0].toUpperCase();
            $(".text-avatar").html(first).show();
        }
    }

    //退出
    var layer = layui.layer;
    $('#logout').on('click', function() {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    })
})