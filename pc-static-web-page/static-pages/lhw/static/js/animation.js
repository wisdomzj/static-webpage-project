$(function () {
    // banner轮播图
    var swiper = new Swiper(".swiper-container", {
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });
    $("#shuffing").mouseover(function () {
        swiper.autoplay.stop();
    });
    $("#shuffing").mouseout(function () {
        swiper.autoplay.start();
    });


    // 二级菜单收缩
    $(".nav-box li.nav-item").hover(function(){
        $(this).find("ul.drop-down").stop().slideDown(300);
    },function(){
        $(this).find("ul.drop-down").stop().slideUp(300);
    })

    // 滑动轮播图1
    var swiperWork1 = new Swiper('.corp-swiper1', {
        loop: false,
        slidesPerView: 4,
        spaceBetween: 16,
        navigation: {
            nextEl: '.corp-arrow-right1',
            prevEl: '.corp-arrow-left1'
        }
    });

    // 滑动轮播图2
    var swiperWork2 = new Swiper('.corp-swiper2', {
        loop: false,
        slidesPerView: 4,
        spaceBetween: 16,
        navigation: {
            nextEl: '.corp-arrow-right2',
            prevEl: '.corp-arrow-left2'
        }
    });

    // 滑动轮播图3
    var swiperWork3 = new Swiper('.corp-swiper3', {
        loop: false,
        slidesPerView: 3,
        spaceBetween: 16,
        navigation: {
            nextEl: '.corp-arrow-right3',
            prevEl: '.corp-arrow-left3'
        }
    });

    // 维权援助tab切换
    $('.js-assistance-item').on('click', function () {
        var index = $(this).index()
        $(this).addClass('active').siblings('.js-assistance-item').removeClass('active')
        $('.col-content .content-silde-box').eq(index).removeClass('hide').siblings('.content-silde-box').addClass('hide')
    })
})