var wHeight = document.documentElement.clientHeight;
var animateDoms = [{
    el: $('.sc-content'),
    css: 'animate__fadeInUp animate__animated'
}, {
    el: $('.sc-yunpu'),
    css: 'animate__slideInRight animate__animated'
}, {
    el: $('.sc-public-service-chain'),
    css: 'animate__slideInLeft animate__animated'
}, {
    el: $('.sc-protect-service-chain '),
    css: 'animate__pulse animate__animated'
}, {
    el: $('.sc-city-station'),
    css: 'animate__zoomIn animate__animated'
}]

function animate(flag) {
    // 屏幕滚动到图片时过渡显示图片
    animateDoms.forEach(function (item) {
        var element = item.el[0]
        if (document.documentElement.scrollTop > element.offsetTop - (wHeight * (3 / 4))) {
            element.style.opacity = '1';
            item.el.addClass(item.css)
        } else {
            element.style.opacity = '0';
            item.el.removeClass(item.css)
        }
    })

    // 屏幕滚动超出图片后还原
    animateDoms.forEach(function (item) {
        var element = item.el[0]
        if (document.documentElement.scrollTop > element.offsetTop + (element.offsetHeight / 2)) {
            element.style.opacity = '0'
            item.el.removeClass(item.css)

        }
    })
    
    if(flag || (document.documentElement.scrollTop == 0)){
        var ele = animateDoms[0].el[0]
        ele.style.opacity = '1';
        animateDoms[0].el.addClass(animateDoms[0].css);
    }
}

animate(true);

window.onscroll = function () {
    animate();
}