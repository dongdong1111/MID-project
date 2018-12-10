layui.use('carousel', function(){
    var carousel = layui.carousel;//建造实例
     carousel.render({
        elem: '#logo',
        width: '100%' ,//设置容器宽度
        arrow: 'none' ,
        autoplay:false
    });
    carousel.render({
        elem: '#logo1',
        width: '100%' ,//设置容器宽度
        arrow: 'none' ,
        autoplay:false
    });
    carousel.render({
        elem: '#logo2',
        width: '100%' ,//设置容器宽度
        arrow: 'none' 
    });

   option = {
        title: {
            text: '折线图堆叠'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'邮件营销',
                type:'line',
                stack: '总量',
                data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
                name:'联盟广告',
                type:'line',
                stack: '总量',
                data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
                name:'视频广告',
                type:'line',
                stack: '总量',
                data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
                name:'直接访问',
                type:'line',
                stack: '总量',
                data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
                name:'搜索引擎',
                type:'line',
                stack: '总量',
                data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
        ]
        };



        var myChart5 = echarts.init(document.getElementById('echart1'));

        // console.log("---------")
        // console.log(myChart5)
        // console.log(option)
        console.log(myChart5.setOption(option));


        layui.use('element',function(){
            var element = layui.element;
            element.on('tab(test)',function(){
                location.hash = 'test=' + this.getAttribute('lay-id');
        });
    });
});