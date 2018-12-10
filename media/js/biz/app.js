var oLAY_app = document.getElementById('LAY_app');
            var oLAY_app_flexible = document.getElementById('LAY_app_flexible');
    
            LAY_app_flexible.onclick = function(){
                if(LAY_app.className === 'layadmin-side-shrink'){
                    LAY_app.classList.remove("layadmin-side-shrink");
                }else{
                    LAY_app.classList.add("layadmin-side-shrink");
                }   
            }


    //添加tab页
    layui.use('element', function(){
        var $ = layui.jquery
            ,element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块

        //触发事件
        var active = {
            tabAdd: function(data){
                console.log(data);
                //新增一个Tab项
                element.tabAdd('layadmin-layout-tabs', {
                    title: data[0].innerText //用于演示
                    ,content: '内容'+ data[0].innerText
                    ,id:$(this).data('option').id //实际使用一般是规定好的id，这里以时间戳模拟下
                })
            }
            ,tabDelete: function(othis){
                //删除指定Tab项
                element.tabDelete('layadmin-layout-tabs', '44'); //删除：“商品管理”


                othis.addClass('layui-btn-disabled');
            }
            ,tabChange: function(){
                //切换到指定Tab项
                element.tabChange('layadmin-layout-tabs', '22'); //切换到：用户管理
            }
        };
        $('.site-demo-active').on('click', function(){
            var othis = $(this), type = othis.data('type');
            active[type] ? active[type].call(this, othis) : '';
        });
    });

    layui.use('layer',function(){
        var $ = layui.jquery,
        layer = layui.layer;
        var active1 = {
            offset: function(othis){
                var type = othis.data('type'),
                text = othis.text();
                layer.open({
                    type:1,
                    offset:type,
                    id:'layerDemo'+type,
                    content:'<div style="width:300px; height:182px;">便签中的内容会存储在本地，这样即便你关掉了浏览器，在下次打开时，依然会读取到上一次的记录。是个非常小巧实用的本地备忘录</div>',
                    shade:0,
                    yes:function(){
                        layer.closeAll();
                    }
                });
            }
        };
        $('#layerDemo .site-demo').on('click',function(){
            var othis = $(this),method = othis.data('method');
            active1[method] ? active1[method].call(this,othis) : '';
        });
    });