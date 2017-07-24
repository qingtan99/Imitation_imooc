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

    $('body')
    .on('click', '.sh-search i', function() {
        $('.search-tags').hide();
        $('.search-input').focus();
    })
    .on('focus', '.search-input', function() {
        $('.search-tags').hide();
    })
    .on('blur', '.search-input', function() {
        $('.search-tags').show();
    });
});