
;

//增加或者编辑页面添加到头部导航栏的方法
function addContent(that, flag) {

//生成tab
    var dataHref = $(that).attr('data-href');
    var dataId = $(that).attr('data-id');
    var dataTitle = $(that).attr('data-title');
    var obj = $("#addTab li");   //需要接收内容的容器
    var addFlag = 0;    //定义一个容器初始值 接下来方便判断里边是否增加新的内容
    for (var i = 1; i < obj.length; i++) {
        var nowDataId = obj[i].attributes[1].textContent;
        if (dataId == nowDataId) {
            addFlag = 1;
            //$('#content-area').attr('src', dataHref).attr('data-id', dataId);
            $("iframe.cc").removeClass("cc");
            //$('iframe[class="cc"]').removeClass("cc")
            $('iframe[data-id="'+ dataId +'"]').addClass("cc");
            var nowTab = obj[i];
            $(obj[i]).addClass("active").siblings("li").removeClass("active");
        }
    }
    if (addFlag == 0) {  //证明容器里没有新增加的的内容  那么就新增加进去
        // 修改iframe的src和data-id
        //eval(flag + "$('#content-area').attr('src', dataHref).attr('data-id', dataId)");
        //增加iframe的src和data-id
        var addIframe = eval(flag + "$('.add-tab-container')");
        addIframe.append('<iframe class="bb cc"  data-id="' + dataId + '" data-title="'+ dataTitle +'" src="'+ dataHref +'" frameborder="0" width="100%" height="800"></iframe>');
        // 修改iframe的src和data-id
        //eval(flag + "$('#content-area').attr('src', dataHref).attr('data-id', dataId)");
        //var addTabContent = eval(flag + "$('#addTab')");
        //addTabContent.append('<li class=""></li>');
        //eval(flag + "$('.add-tab-container').append(\"<iframe class='bb cc' data-id='\" + dataId + \"' src='\" + dataHref + \"'>\" + dataTitle + \"<i class='fa fa-remove tab-close'></i></iframe>\")");

        eval(flag + "$('#addTab').append(\"<li class='nav-link ' data-id='\" + dataId + \"' data-href='\" + dataHref + \"'>\" + dataTitle + \"<i class='fa fa-remove tab-close'></i></li>\")");
        eval(flag + "$(\"#addTab li:last-child\").addClass(\"active\").siblings(\"li\").removeClass(\"active\")");
        /* parent.$('#content-area').attr('src', dataHref).attr('data-id', dataId);
        parent.$('#addTab').append("<li class='nav-link ' data-id='" + dataId + "' data-href='" + dataHref + "'>" + dataId + "<i class='fa fa-remove tab-close'></i></li>");
        parent.$("#addTab li:last-child").addClass("active").siblings("li").removeClass("active");*/
    }
}



//刷新方法
function refresh(refreshData) {
    var dataHref = $(refreshData).attr('data-href');
    var dataId = $(refreshData).attr('data-id');
    //$('#content-area').attr('src', dataHref).attr('data-id', dataId);
    $("iframe.cc").removeClass("cc");
    $('iframe[data-id="'+ dataId +'"]').addClass("cc")
}


// 获取每个li的宽度总和,加上功能按钮iBox-tools宽度 开始
function totalWidth() {
    var $li = $('li[class*="nav-link"][data-id]');
    var buttonWidth = 0;// = $('.iBox-tools')[0].offsetWidth;// 80
    $li.each(function (index, li) {
        buttonWidth += li.offsetWidth;
    });
    return buttonWidth;
}


//先判断当前要关闭的tab选项卡有没有active类，再判断当前选项卡是否最后一个，如果是则给前一个选项卡以及内容添加active，否则给下一个添加active类 并且刷新页面
function toggleClass(){
    var lastobj = $("#addTab li:last-of-type");
    $('li[class*="active"][data-id]').removeClass('active');
    console.log($('li[class*="active"][data-id]'))
    lastobj.addClass('active');
    refresh(lastobj);
}


//刷新当前选项卡
$('.refresh').on('click', function () {
    var refreshData = $("#addTab li[class='nav-link active']");
    var dataHref = $(refreshData).attr('data-href');
    var dataId = $(refreshData).attr('data-id');
    $('#content-area').attr('src', dataHref).attr('data-id', dataId);
    //refresh(refreshData);
});


//关闭当前选项卡
$('.closeCurrent').on('click', function (e) {
    if ($("#addTab li").length != 1) {
        var ev1 = e || event;
        ev1.stopPropagation();
        var dParent = $(this).parent().parent().parent().find('#addTab li[class="nav-link active"]');
        dParent.remove();
    }
    toggleClass();
// var lastobj = $("#addTab li:last-of-type");
// lastobj.addClass('active');
// refresh(lastobj);
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

//左侧导航栏 刷新 并且添加到对应容器

$('.nav-label-item').on('click', function () {//左侧每一列绑定一个点击事件
    addContent(this, '');
// 获取ul宽度
    var navOffsetWidth = $('ul[class="nav nav-tabs"]')[0].offsetWidth;
// 获取每个li的宽度总和,加上功能按钮ibox-tools宽度
    var sumWidth = totalWidth();
// 判断内容和大于ul宽度
    if (sumWidth > navOffsetWidth) {
// 显示展示按钮
        $('.click-hide').attr('class', 'click-show');
    }
});

$('.click-hide').on('click', function () {
    var $this = $(this);
    if ($this.attr("status") === '0') {
        $('#addTab').addClass('add-tab-container-more')
    } else {
        $('#addTab').removeClass('add-tab-container-more')
    }
// console.log($this.attr("status") === '0');
    $this.attr("status", $this.attr("status") === '0' ? '1' : '0');
});


//上栏选项卡 切换点击 刷新一次页面开始
$("#addTab").on("click", "li ", function () {      //只需要找到你点击的是哪个ul里面的就行
    var tabLi = $(this);
    var dataId = tabLi.attr('data-id');
    $("iframe.cc").removeClass("cc");
    $('iframe[data-id="'+ dataId +'"]').addClass("cc");
// 将当前对应菜单背景改为绿色
    $('a[data-id="' + dataId + '"]').addClass('item-this');  //后来被注掉了
    $(this).addClass("active").siblings("li").removeClass("active");
    refresh(tabLi); //后来被注掉了
});

// 左侧点击事件
$(".nav-second-level").on("click", "li", function () {
    $('li[class="nav-link active"]').attr('data-id');

    $('.item-this').removeClass('item-this');
    $(this).find('a').addClass('item-this');
//$('a[data-id]').addClass("active");
});

//s删除当前  把active类添加给前一个，并且刷新页面显示当前内容
$("ul#addTab").on("click", "li i", function (ev) {      //只需要找到你点击的是哪个ul里面的就行
    var ev = ev || event;
    ev.stopPropagation();
//先判断当前要关闭的tab选项卡有没有active类，再判断当前选项卡是否最后一个，如果是则给前一个选项卡以及内容添加active，否则给下一个添加active类
//var gParent = $(this).parent().parent();//ul
    var parent = $(this).parent();//li class=nav-link active 主控制台
    parent.remove();
    toggleClass();
    /* var lastobj = $("#addTab li:last-of-type");
    $('li[class*="active"][data-id]').removeClass('active');
    lastobj.addClass('active');*/


//当内容宽度小于总长度navOffsetWidth时 按钮隐藏
// 获取ul宽度
    var navOffsetWidth = $('ul[class*="nav nav-tabs"]')[0].offsetWidth;
// 获取每个li的宽度总和,加上功能按钮ibox-tools宽度
    var sumWidth = totalWidth();
// 判断内容和大于ul宽度
    if (sumWidth < navOffsetWidth) {
// 关闭展示按钮
        $('.click-show').attr('class', 'click-hide');
    }
});
//结束

function closeTab(dataId) {
    closeTitle(dataId);
    closeContent(dataId);
}


function closeTitle(dataId) {
//console.log($('li[data-id="' + dataId + '"]'));
    $('li[data-id="' + dataId + '"]').remove();
    toggleClass();
}


function closeContent(dataId) {
    $('iframe[data-id="' + dataId + '"]').remove();
}




//第二次
;

//增加或者编辑页面添加到头部导航栏的方法
function addContent(that, flag) {
    //生成tab
    var dataHref = $(that).attr('data-href');
    var dataId = $(that).attr('data-id');
    var dataTitle = $(that).attr('data-title');
    var obj = $("#addTab li");   //需要接收内容的容器
    //console.log(obj);
    var addFlag = 0;    //定义一个容器初始值 接下来方便判断里边是否增加新的内容
    for (var i = 1; i < obj.length; i++) {
        var nowDataId = obj[i].attributes[1].textContent;
        if (dataId == nowDataId) {
            addFlag = 1;
            //$('#content-area').attr('src', dataHref).attr('data-id', dataId);
            $(obj[i]).addClass("active").siblings("li").removeClass("active");

            $("iframe.cc").removeClass("cc");

            //$('iframe[class="cc"]').removeClass("cc")
            $('iframe[data-id="'+ dataId +'"]').addClass("cc")
        }
    }
    if (addFlag == 0) {
        //增加iframe的src和data-id
        var addIframe = eval(flag + "$('.add-tab-container')");
        addIframe.append('<iframe class="bb cc"  data-id="' + dataId + '" data-title="'+ dataTitle +'" src="'+ dataHref +'" frameborder="0" width="100%" height="800"></iframe>');
        // 修改iframe的src和data-id
        //eval(flag + "$('#content-area').attr('src', dataHref).attr('data-id', dataId)");
        //var addTabContent = eval(flag + "$('#addTab')");
        //addTabContent.append('<li class=""></li>');
        //eval(flag + "$('.add-tab-container').append(\"<iframe class='bb cc' data-id='\" + dataId + \"' src='\" + dataHref + \"'>\" + dataTitle + \"<i class='fa fa-remove tab-close'></i></iframe>\")");
        eval(flag + "$('#addTab').append(\"<li class='nav-link ' data-id='\" + dataId + \"' data-href='\" + dataHref + \"'>\" + dataTitle + \"<i class='fa fa-remove tab-close'></i></li>\")");
        eval(flag + "$(\"#addTab li:last-child\").addClass(\"active\").siblings(\"li\").removeClass(\"active\")");
    }
}


//刷新方法
function refresh(refreshData) {
    ///var dataHref = $(refreshData).attr('data-href');
    var dataId = $(refreshData).attr('data-id');
    $("iframe.cc").removeClass("cc");
    $('iframe[data-id="'+ dataId +'"]').addClass("cc");
    //$('#content-area').attr('src', dataHref).attr('data-id', dataId);
}


// 获取每个li的宽度总和,加上功能按钮iBox-tools宽度 开始
function totalWidth() {
    var $li = $('li[class*="nav-link"][data-id]');
    var buttonWidth = 0;// = $('.iBox-tools')[0].offsetWidth;// 80
    $li.each(function (index, li) {
        buttonWidth += li.offsetWidth;
    });
    return buttonWidth;
}


//先判断当前要关闭的tab选项卡有没有active类，再判断当前选项卡是否最后一个，如果是则给前一个选项卡以及内容添加active，否则给下一个添加active类 并且刷新页面
function toggleClass(){
    var lastobj = $("#addTab li:last-of-type");
    $('li[class*="active"][data-id]').removeClass('active');
    lastobj.addClass('active');
    refresh(lastobj);
}


// 导出按钮关闭选项卡
function closeTab(dataId) {
    closeTitle(dataId);
    closeContent(dataId);
}

//关闭标题
function closeTitle(dataId) {
    //console.log($('li[data-id="' + dataId + '"]'));
    $('li[data-id="' + dataId + '"]').remove();
    toggleClass();
}

//关闭内容
function closeContent(dataId) {
    $('iframe[data-id="' + dataId + '"]').remove();
}

//刷新当前选项卡
$('.refresh').on('click', function () {
    var refreshData = $("#addTab li[class='nav-link active']");
    //var dataHref = $(refreshData).attr('data-href');
    //var dataId = $(refreshData).attr('data-id');
    //$('#content-area').attr('src', dataHref).attr('data-id', dataId);
    refresh(refreshData);
});


//关闭当前选项卡
$('.closeCurrent').on('click', function (e) {
    if ($("#addTab li").length != 1) {
        var ev1 = e || event;
        ev1.stopPropagation();
        var dParent = $(this).parent().parent().parent().find('#addTab li[class="nav-link active"]');
        dParent.remove();
        var dataId = dParent.attr('data-id');
        closeContent(dataId);
    }
    toggleClass();

});


//关闭其他选项卡
$('.closeOther').on('click', function () {
    var qParent = $(this).parent().parent().parent().find('#addTab li[class="nav-link active"]');
    qParent.siblings().not(':first').remove();
    console.log(qParent)
    var lastobj3 = $("#addTab li:last-child");
    console.log(lastobj3);
    lastobj3.addClass('active');
    //refresh(lastobj3);
    var dataId = lastobj3.attr('data-id');
    console.log(dataId);
    $('iframe[data-id="' + dataId + '"]').siblings('iframe').not('#content-area').remove();
    //closeContent(dataId);
});


//关闭全部选项卡
// $('.closeAll').on('click', function () {
//     var sParent = $(this).parent().parent().parent().find('#addTab li:first-child');
//     sParent.siblings().remove();
//     toggleClass();
// });

$('.closeAll').on('click', function () {
    var sParent = $(this).parent().parent().parent().find('#addTab li:first-child');
    sParent.siblings().remove();
    var lastobj2 = $("#addTab li:first-child");
    console.log(lastobj2)
    lastobj2.addClass('active');
    //refresh(lastobj2);
    var dataId = lastobj2.attr('data-id');
    $('iframe[data-id="' + dataId + '"]').siblings('iframe').remove();

});


//点击操作按钮时 下拉菜单显示
$('.ibox-tools ').on('click', function () {
    $('.ibox-content').toggle();
    $('.ibox-content').css('z-index', 1);
});

//左侧导航栏 刷新 并且添加到对应容器

$('.nav-label-item').on('click', function () {//左侧每一列绑定一个点击事件
    addContent(this, '');
    // 获取ul宽度
    var navOffsetWidth = $('ul[class="nav nav-tabs"]')[0].offsetWidth;
    // 获取每个li的宽度总和,加上功能按钮ibox-tools宽度
    var sumWidth = totalWidth();
    // 判断内容和大于ul宽度
    if (sumWidth > navOffsetWidth) {
        // 显示展示按钮
        $('.click-hide').attr('class', 'click-show');
    }
});


$('.click-hide').on('click', function () {
    var $this = $(this);
    if ($this.attr("status") === '0') {
        $('#addTab').addClass('add-tab-container-more')
    } else {
        $('#addTab').removeClass('add-tab-container-more')
    }
    $this.attr("status", $this.attr("status") === '0' ? '1' : '0');
});


//上栏选项卡 切换点击
$("#addTab").on("click", "li ", function () {      //只需要找到你点击的是哪个ul里面的就行
    var tabLi = $(this);
    var dataId = tabLi.attr('data-id');
    //var dataHref = tabLi.attr('data-href');
    //var iframeId = tabLi.attr('data-id');
    $("iframe.cc").removeClass("cc");
    $('iframe[data-id="'+ dataId +'"]').addClass("cc");


    // 将当前对应菜单背景改为绿色
    //$('a[data-id="' + dataId + '"]').addClass('item-this');
    $(this).addClass("active").siblings("li").removeClass("active");
    // refresh(tabLi);
});


// 左侧点击事件
$(".nav-second-level").on("click", "li", function () {
    $('li[class="nav-link active"]').attr('data-id');

    $('.item-this').removeClass('item-this');
    $(this).find('a').addClass('item-this');
    //$('a[data-id]').addClass("active");
});


//s删除当前  把active类添加给前一个，并且刷新页面显示当前内容
$("ul#addTab").on("click", "li i", function (ev) {      //只需要找到你点击的是哪个ul里面的就行
    var ev = ev || event;
    ev.stopPropagation();
    //先判断当前要关闭的tab选项卡有没有active类，再判断当前选项卡是否最后一个，如果是则给前一个选项卡以及内容添加active，否则给下一个添加active类
    var parent = $(this).parent();//li class=nav-link active 主控制台
    parent.remove();
    toggleClass();

    //refresh(parent);

    //当内容宽度小于总长度navOffsetWidth时 按钮隐藏
    // 获取ul宽度
    var navOffsetWidth = $('ul[class*="nav nav-tabs"]')[0].offsetWidth;
    // 获取每个li的宽度总和,加上功能按钮ibox-tools宽度
    var sumWidth = totalWidth();
    // 判断内容和大于ul宽度
    if (sumWidth < navOffsetWidth) {
        // 关闭展示按钮
        $('.click-show').attr('class', 'click-hide');
    }
});

