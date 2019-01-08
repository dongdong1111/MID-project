


;
//增加或者编辑页面添加到头部导航栏的方法
function addContent(that,flag) {

    //生成tab
    var dataHref = $(that).attr('data-href');
    var dataId = $(that).attr('data-title');
    var obj = $("#addTab li");   //需要接收内容的容器
    var addFlag = 0;    //定义一个容器初始值 接下来方便判断里边是否增加新的内容
    for (var i = 1; i < obj.length; i++) {
        // console.log(obj[i].attributes[1].textContent);
        var nowDataId = obj[i].attributes[1].textContent;
        if (dataId == nowDataId) {
            addFlag = 1;
            $('#content-area').attr('src', dataHref).attr('data-id', dataId);
            var nowTab = obj[i];
            $(obj[i]).addClass("active").siblings("li").removeClass("active");
        }
    }
    if (addFlag == 0) {  //证明容器里没有新增加的的内容  那么就新增加进去
        // 修改iframe的src和data-id

        eval(flag + "$('#content-area').attr('src', dataHref).attr('data-id', dataId)");
        eval(flag + "$('#addTab').append(\"<li class='nav-link ' data-id='\" + dataId + \"' data-href='\" + dataHref + \"'>\" + dataId + \"<i class='fa fa-remove tab-close'></i></li>\")");
        eval(flag + "$(\"#addTab li:last-child\").addClass(\"active\").siblings(\"li\").removeClass(\"active\")");
        /* parent.$('#content-area').attr('src', dataHref).attr('data-id', dataId);
           parent.$('#addTab').append("<li class='nav-link ' data-id='" + dataId + "' data-href='" + dataHref + "'>" + dataId + "<i class='fa fa-remove tab-close'></i></li>");
           parent.$("#addTab li:last-child").addClass("active").siblings("li").removeClass("active");*/
    }
}

//刷新方法
function refresh(refreshData){
    var dataHref = $(refreshData).attr('data-href');
    var dataId = $(refreshData).attr('data-id');
    $('#content-area').attr('src', dataHref).attr('data-id', dataId);
}


// 获取每个li的宽度总和,加上功能按钮ibox-tools宽度 开始
function totalWidth() {
    var $li = $('li[class*="nav-link"][data-id]');
    var buttonWidth = 0;// = $('.ibox-tools')[0].offsetWidth;// 80
    $li.each(function (index, li) {
        buttonWidth += li.offsetWidth;
    });
    return buttonWidth;
}


//刷新当前选项卡
$('.refresh').on('click', function () {
    var refreshData = $("#addTab li[class='nav-link active']");
    refresh(refreshData);
});


//关闭当前选项卡
$('.closeCurrent').on('click', function (e) {
    if ($("#addTab li").length != 1) {
        var ev1 = e || event;
        ev1.stopPropagation();
        var dParent = $(this).parent().parent().parent().find('#addTab li[class="nav-link active"]');
        dParent.remove();
    }
    var lastobj = $("#addTab li:last-of-type");
    lastobj.addClass('active');
    refresh(lastobj);
});


//关闭其他选项卡
$('.closeOther').on('click', function (e) {
    var ev2 = e || event;
    ev2.stopPropagation();
    var qParent = $(this).parent().parent().parent().find('#addTab li[class="nav-link active"]');
    //console.log(qParent);
    qParent.siblings().not(':first').remove();
    var lastobj3 = $("#addTab li:last-child");
    lastobj3.addClass('active');
    refresh(lastobj3);
});


//关闭全部选项卡
$('.closeAll').on('click', function () {
    var sParent = $(this).parent().parent().parent().find('#addTab li:first-child');
    sParent.siblings().remove();
    var lastobj2 = $("#addTab li:first-child");
    lastobj2.addClass('active');
    refresh(lastobj2);
});


//点击操作按钮时 下拉菜单显示
$('.ibox-tools ').on('click', function () {
    $('.ibox-content').toggle();
    $('.ibox-content').css('z-index', 1);
});