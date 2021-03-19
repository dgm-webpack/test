
var ytplayer, isMute = true, timeID
window.onload = function () {

    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var titles = ['Page 1', 'Page 2', 'Page 3'];
    var swiper_youtube = new Swiper('.swiper-youtube-container', {
        loop: true,  // 循環
        init: true,
        slidesPerView: 1,
        slidesPerGroup: 1,
        //autoplay : true, //自動播放
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        lazy: {
            loadPrevNext: true,
        },
        paginationBulletRender: function (index, className) {
            return '<span class="' + className + '">' + titles[index] + '</span>';
        },
        on: {
            init: function (swiper) {
                //Swiper初始化了
                // alert('当前的slide序号是' + this.activeIndex);//或者swiper.activeIndex，swiper与this都可指代当前swiper实例
                //this.emit('transitionEnd');//在初始化时触发一次transitionEnd事件，需要先设置transitionEnd
                var initPlayer = function (element) {
                    var player = element.querySelector('.video-iframe');
                    var button = element.querySelector('.video-play');
                    if (player) {
                        //console.log("video")
                        ytplayer = new YT.Player(player, {
                            playerVars: {
                                width: 560, // 播放器寬度 (px)
                                height: 316, // 播放器高度 (px)
                                'mute': 1,
                                'autoplay': 1,
                                'modestbranding': 1,
                                'controls': 1,
                                'rel': 0,
                                'autohide': 0,
                                'playsinline':1
                            },
                            videoId: element.dataset.id,
                            events: {
                                'onStateChange': onPlayerStateChange, //當播放器狀態改變時執行
                                //'onPlaybackMuteChange' : dddd
                            }
                        });
                    } else {
                        console.log("img")

                    }

                };
                window.onYouTubePlayerAPIReady = function () {
                    var container = document.querySelectorAll('.video-container');
                    for (var i = 0; i < container.length; i++) {
                        initPlayer(container[i])
                    }
                };
            },
        }
    }).on('slideChange', function () {
        let isVideo_activeIndex = swiper_youtube.slides[swiper_youtube.activeIndex]
        let isVideo_previousIndex = swiper_youtube.slides[swiper_youtube.previousIndex]
        window.clearTimeout(timeID);
        //console.log(isVideo_activeIndex.children[0].dataset.type)
        if (isVideo_previousIndex.children[0].dataset.type == "video") {

            var isVideo = swiper_youtube.slides[swiper_youtube.previousIndex].querySelector('.video-container');
            if (isVideo) {
                YT.get(isVideo_previousIndex.querySelector('iframe').id).stopVideo();
                // console.log(isVideo.querySelector('iframe').id);
            }
        }
        if (isVideo_activeIndex.children[0].dataset.type == "img") {
            document.querySelector("#mute-toggle").style.display = "none"
            timeID = window.setTimeout(function () {
                console.log('圖片5秒換下')
                swiper_youtube.slideNext();
            }, 5000)
            return
        }
        if (isVideo_activeIndex.children[0].dataset.type == "video") {
            var isVideo = swiper_youtube.slides[swiper_youtube.activeIndex].querySelector('.video-container');
            document.querySelector("#mute-toggle").style.display = "block"
            if (isVideo) {
                console.log(isVideo_activeIndex.querySelector('iframe').id)
                if (isMute) {
                    YT.get(isVideo_activeIndex.querySelector('iframe').id).mute();
                    document.querySelector(".ans").textContent = isMute
                }
                else {
                    YT.get(isVideo_activeIndex.querySelector('iframe').id).unMute();
                    //sconsole.log('不靜音')
                    document.querySelector(".ans").textContent = isMute
                }
                YT.get(isVideo_activeIndex.querySelector('iframe').id).playVideo();
            }
        }
    });

    document.querySelector("#mute-toggle").addEventListener('click', function () {
        isMute = !isMute
        var isVideo_activeIndex = swiper_youtube.slides[swiper_youtube.activeIndex].querySelector('.video-container');
        document.querySelector(".ans").textContent = isMute
        if (isMute) {
            YT.get(isVideo_activeIndex.querySelector('iframe').id).mute();
            document.querySelector(".ans").textContent = isMute
        }
        else {
            YT.get(isVideo_activeIndex.querySelector('iframe').id).unMute();
            //sconsole.log('不靜音')
            document.querySelector(".ans").textContent = isMute

        }
    })

    function onPlayerStateChange(event) {
        console.log(event.data)
        ytplayer.playVideo();
        if (event.data === 0) {
            console.log('播完換下一部')
            swiper_youtube.slideNext();
        }
    }

}