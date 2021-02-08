
// init();
var swiper_youtube;
var ytplayer1




function init() {

    // if (!window.YT['get']) {
    //     //console.log('no ready')
    //     setTimeout(function () { init() }, 1000)
    // } else {
    //     // console.log('ready')
    //     // swiper_youtube = new Swiper('.swiper-youtube-container', {
    //     //     loop: true,  // 循環
    //     //     navigation: {
    //     //         nextEl: '.swiper-button-next',
    //     //         prevEl: '.swiper-button-prev',
    //     //     },
    //     //     pagination: {
    //     //         el: '.swiper-pagination',
    //     //         type: 'bullets',
    //     //         clickable: true,
    //     //     },
    //     // })
    //     // var container = document.querySelectorAll('.video-container');
    //     // //console.log(container)
    //     // for (var i = 0; i < container.length; i++) {
    //     //     initPlayer(container[i])
    //     // }
    // }


    document.querySelector(".goodsInfo").addEventListener('click', function (e) {
        let DOM = e.target.nodeName;
        if (DOM !== "SPAN") { return; }
        let gaLabel  = e.target.closest('.btn2').dataset.label 
        let gaValue = e.target.closest('.btn2').dataset.value 
        let openIndex = e.target.closest('.btn2').dataset.index
        let links = [
            {
                link1: 'https://online.carrefour.com.tw/tw/search?key=brita+%E6%AD%A6%E5%BE%B7%E5%AE%AE&categoryId=',
                link2: 'https://www.fe-amart.com.tw/index.php/store',
                link3: 'https://news.rt-mart.com.tw/main/%E5%88%86%E5%BA%97%E8%B3%87%E8%A8%8A-61',
                link4: 'https://www.trplus.com.tw/pages/store?brand=tlw',
                link5: 'https://tw.buy.yahoo.com/gdsale/gdsale.asp?gdid=9307821',
                link6: 'https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=8338016',
                link7: 'https://24h.pchome.com.tw/prod/preview/DEAY01-A900B220L?q=/S/DEAY01',
                link8: 'https://crm.brita.tw/2021CNY/js/brita_store.pdf',
            },
            {
                link1: 'https://www.carrefour.com.tw/stores/',
                link2: 'https://www.fe-amart.com.tw/index.php/store',
                link3: 'https://news.rt-mart.com.tw/main/%E5%88%86%E5%BA%97%E8%B3%87%E8%A8%8A-61',
                link4: 'https://www.trplus.com.tw/pages/store?brand=tlw',
                link5: 'https://tw.buy.yahoo.com/gdsale/gdsale.asp?gdid=8395820',
                link6: 'https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=7891886',
                link7: 'https://24h.pchome.com.tw/prod/DEAY33-A9008TSHH?fq=/S/DEAY07',
                link8: 'https://crm.brita.tw/2021CNY/js/brita_store.pdf',
            },
            {
                link1: 'https://www.carrefour.com.tw/stores/',
                link2: 'https://www.fe-amart.com.tw/index.php/store',
                link3: 'https://news.rt-mart.com.tw/main/%E5%88%86%E5%BA%97%E8%B3%87%E8%A8%8A-61',
                link4: 'https://www.trplus.com.tw/pages/store?brand=tlw',
                link5: 'https://tw.buy.yahoo.com/gdsale/gdsale.asp?gdid=9055099',
                link6: 'https://reurl.cc/n0kRnn',
                link7: 'https://24h.pchome.com.tw/prod/DEAY0N-1900B2C1M?fq=/S/DEAY07',
                link8: 'https://crm.brita.tw/2021CNY/js/brita_store.pdf',
            }
        ];
       let items = document.querySelectorAll('.popup .btn');
    //    ga('send', 'event', 'https://crm.brita.tw/2021CNY/', gaLabel, gaValue);
       items.forEach((item,index)=>{
           let linkItem = 'link'+(index+1)
           item.setAttribute('href',links[openIndex][linkItem])

       })
       document.querySelector('#popup').classList.remove('hidden')
       document.querySelector('#popup').classList.add('open')
       document.querySelector('#popup .popup').classList.add('animation')

    }, false)

    document.querySelector(".close").addEventListener('click', close)
    document.querySelector(".close2").addEventListener('click',close)
    function close(){
        document.querySelector('#popup').classList.add('hidden')
        document.querySelector('#popup').classList.remove('open')
        document.querySelector('#popup .popup').classList.remove('animation')
    }

}
function initPlayer(element) {
    //console.log('youtube載入中')
    // var player = element.querySelector('.video-iframe');
    // var ytplayer = new YT.Player(player, {
    //     playerVars: {
    //         'mute': 0,
    //         'autoplay': 0,
    //         'modestbranding': 1,
    //         'controls': 1,
    //         'rel': 0,
    //         'wmode': 'opaque',
    //         // 'origin': 'https://127.0.0.1'
    //     },
    //     videoId: element.dataset.id,
    //     events: {
    //         'onReady': onPlayerReady
    //     }
    // });
};

function onPlayerReady(even2) {
    //console.log('youtube2載入完成')
    // swiper_youtube.on('slideChange', function () {
    //     var isVideo = swiper_youtube.slides[swiper_youtube.previousIndex].querySelector('.video-container');
    //     if (isVideo) {
    //         YT.get(isVideo.querySelector('iframe').id).stopVideo();
    //         //console.log(isVideo.querySelector('iframe').id);
    //     }
    // });
}






