$(function(){
    // 二级菜单收缩
    $(".nav-box li").hover(function(){
        $(this).find("ul.drop-down").stop().slideDown(300);
    },function(){
        $(this).find("ul.drop-down").stop().slideUp(300);
    })

    // 三级菜单收缩
    $("ul.drop-down li.drop-down-item").hover(function(){
        $(this).find(".level-box").removeClass('hide');
    },function(){
        $(this).find(".level-box").addClass('hide');
    })

    // 头部导航切换
    $(".nav-box li").on('click', function(){
        $(this).addClass('active').siblings('li').removeClass('active')
    })

    // 首页滑动切换
    $('.corp-arrow').on('click', function(){
        $(this).addClass('active').siblings('.corp-arrow').removeClass('active')
    })

    // 滑动轮播图
    var swiperWork = new Swiper('.corp-swiper', {
        loop: false,
        slidesPerView: 2,
        spaceBetween: 16,
        navigation: {  
            nextEl: '.corp-arrow-right',
            prevEl: '.corp-arrow-left'
        }
    });

    // banner轮播图
    var swiperBanner = new Swiper(".swiper-container", {
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

    // 新闻轮播图
    var swiperNews = new Swiper(".media-swiper", {
        autoplay: {
            delay: 3000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".pag-media",
            clickable: true,
        },
    });

    // 维权菜单栏收缩
    $('.js-ctrl-shrink').live('click', function(){
        $(this).siblings('.ul-check-box').stop().slideToggle(300);
        $(this).find('.icon-shrink').toggleClass('close');
    })

    // 知创福州tab切换内容
    $('.js-check-tab').live('click', function(){
        var name = $(this).attr('data-name'); 
        $(this).addClass('active')
                .siblings('li')
                .removeClass('active')
                .parents('.side-content')
                .siblings('.side-content')
                .find('.ul-check-box')
                .children('li.js-check-tab')
                .removeClass('active')
        
        $('.js-nest-case').each(function(i, o){
            if($(o).attr('data-name') == name) {
                $(o).removeClass('hide');
            } else {
                $(o).addClass('hide');
            }
        })
    })

    // 显示遮罩层
	$(".js-video-player").on('click', function(){
        var win_h = $(window).height();
		var h = $(".area-container").height();
		var t = (win_h - h) / 2;

        var vTitle = $(this).attr('data-videoTitle')
        var vSrc = $(this).attr('data-videoSrc')
        var vPoster = $(this).attr('data-videoPoster')

        $('.mask').find('.con-title h1').text(vTitle);
        var video = $('.mask').find(".con-play").find("video")[0];
        video.src = vSrc;
        video.poster = vPoster;
        video.play();
		
        $(".mask").fadeIn(500,function(){
            $(this).find('.area-container').animate({ "top": t },500).show();
		})
	})

    // 关闭遮罩层
	$(".js-video-close").on('click',function(){
		$(".mask").fadeOut(500);
        $(".mask .area-container").animate({ "top": "-556px" },500);
		$(this).siblings(".con-play").find("video")[0].pause();
		$(this).siblings(".con-play").find("video")[0].currentTime = 0;
	})

     // 列表展示咨询详情
    $('.js-replay-detail').on('click', function(){
        // 数据可以绑在本身自定义属性上
        $(".js-detail-box").removeClass('hide');
    })

    // 列表关闭咨询详情
    $('.js-close-detail').on('click', function(){
        $(".js-detail-box").addClass('hide');
    })
    
    
    // 列表展示咨询详情
    $('.js-replay-ldetail').on('click', function(){
        // 数据可以绑在本身自定义属性上
        $(".mask").fadeIn(300)
    })

    // 列表关闭咨询详情
    $('.js-close-ldetail').on('click', function(){
        $(".mask").fadeOut(300);
    })
}) 



