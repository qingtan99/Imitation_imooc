/**
 * Created by Administrator on 2017/6/30.
 */

$(document).ready(function(){

    // 轮播
    $('.banner-slider').bxSlider({
        mode: 'fade',
        slideWidth: 1200,
        auto: true,
        speed: 300,
        pause: 3000
    });

    var timer, activeRow, activeMenu;
    var mouseInSub = false;
    var mouseTrack = [];
    $('.menu-content').mouseenter(function() {
        mouseInSub = true;
    }).mouseleave(function () {
        mouseInSub = false;
    });

    //获取鼠标位置
    var moveHandler = function(e){
        mouseTrack.push({
            x:e.pageX,
            y:e.pageY
        })

        if(mouseTrack.length > 3){
            mouseTrack.shift()
        }
    }

    $('.main-banner')
        .on('mouseenter',function () {
            $('.menu-content').removeClass('hide');
            $(document).bind('mousemove',moveHandler);
        })
        .on('mouseleave',function () {
            $('.menu-content').addClass('hide');
            if(activeRow){
                activeRow.removeClass('active')
                activeRow = null;
            }
            if(activeMenu){
                activeMenu.addClass('none')
                activeMenu = null;
            }

            //解绑
            $(document).unbind('mousemove',moveHandler);
        })
        .on('mouseenter','.item',function(e) {
            if(!activeRow){
                activeRow = $(e.currentTarget).addClass('menu-item-hover');
                var _index = activeRow.index();
                $('.menu-content .menu-content-item:eq('+ _index +')').removeClass('hide');
                return
            }

            //清除
            if(timer){
                clearTimeout(timer)
            }

            //鼠标当前坐标
            var currMousePos = mouseTrack[mouseTrack.length - 1];

            //上次的坐标
            var leftCorner = mouseTrack[mouseTrack.length-2];
            var delay = needDelay($('.menu-content'),leftCorner,currMousePos);
            if(delay){
                // 时间触发，设置一个缓冲期
                timer = setTimeout(function(){
                    //判断
                    if(mouseInSub){
                        return
                    }
                    activeRow.removeClass('menu-item-hover')
                    activeMenu.addClass('hide')

                    activeRow = $(e.target)
                    activeRow.addClass('active')
                    activeMenu = $('#'+ activeRow.data('id'))
                    activeMenu.removeClass('none')

                    timer = null
                }, 300)
            }else{
                var prevActiveRow = activeRow
                var prevActiveMenu = activeMenu

                activeRow = $(e.currentTarget);
                activeMenu = $('#' + activeRow.data('id'))

                prevActiveRow.removeClass('menu-item-hover');
                prevActiveMenu.addClass('hide');

                activeRow.addClass('menu-item-hover');
                activeMenu.removeClass('hide');
            }
        });

});