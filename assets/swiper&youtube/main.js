
var ytplayer, isMute = true, timeID, t, time, palyingTime
// window.onload = function () {

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
        // touchMoveStopPropagation : true, //true时阻止touchmove冒泡事件。
        // touchStartPreventDefault : false, //阻止`touchstart` (`mousedown`)的默认事件，设置为false则不阻止。
        // followFinger : false,//跟随手指。如设置为false，手指滑动时slide不会动，当你释放时slide才会切换。
        allowTouchMove: false,//允许触摸滑动。设为false时，slide无法滑动，只能使用扩展API函数例如slideNext() 或slidePrev()或slideTo()等改变slides滑动。等同于Swiper3.x 的 onlyExternal。
        //autoplay : true, //自動播放 (不適用有影片)
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
                window.onYouTubePlayerAPIReady = function () {
                    var container = document.querySelectorAll('.video-container');
                    for (var i = 0; i < container.length; i++) {
                        initPlayer(container[i])
                    }
                }

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
                                'controls': 0, //0隱藏youtube工具列，使用自訂工具列
                                'rel': 0,
                                'autohide': 0,
                                'playsinline': 1
                            },
                            videoId: element.dataset.id,
                            events: {
                                'onStateChange': onPlayerStateChange, //當播放器狀態改變時執行
                                'onReady': onPlayerReady, //測試影片是否有載入
                            }
                        });
                    } else {
                        //console.log("img")
                    }

                };

            },
        }
    }).on('slideChange', function () {
        let isVideo_activeIndex = swiper_youtube.slides[swiper_youtube.activeIndex]
        let isVideo_previousIndex = swiper_youtube.slides[swiper_youtube.previousIndex]
        //console.log(isVideo_activeIndex.children[0].dataset.type) //檢查是影片還是圖片

        //停止上一卡還在播放的影片；如果上一卡是圖片則取消跳轉計時
        //播放當前卡，如果是影片則播放；圖片則計時跳轉
        //console.log(isVideo_activeIndex.children[0].dataset.type)
        if (isVideo_activeIndex.children[0].dataset.type == "video") {
            swiper_youtube.allowTouchMove= false //阻止手指滑動
            
            document.querySelector("#mute-toggle").style.display = "block"
            document.querySelector("#playBtn").style.display = 'none'
            document.querySelector("#pauseBtn").style.display = 'block'
            if (isMute) {
                playVideo_mute(isVideo_activeIndex)
            }
            else {
                stopVideo_unMute(isVideo_activeIndex)
                
            }

            YT.get(isVideo_activeIndex.querySelector('iframe').id).playVideo();
            // console.log(ytplayer)
            // console.log(isVideo_activeIndex.querySelector('iframe').id)
            // console.log(YT.get(isVideo_activeIndex.querySelector('iframe').id).getDuration())
        } else {
            swiper_youtube.allowTouchMove= true//允許手指滑動
            console.log(swiper_youtube.allowTouchMove)
            document.querySelector("#mute-toggle").style.display = "none"
            document.querySelector("#playBtn").style.display = 'none'
            document.querySelector("#pauseBtn").style.display = 'none'
            timeID = window.setTimeout(function () {
                console.log('圖片5秒換下')
                swiper_youtube.slideNext();
            }, 5000)
        }


        if (isVideo_previousIndex.children[0].dataset.type == "video") {
            YT.get(isVideo_previousIndex.querySelector('iframe').id).stopVideo();
            //console.log("停止播放上一卡影片：" , isVideo_previousIndex.querySelector('iframe').id)
        } else {
            window.clearTimeout(timeID);
        }
    });

    // $('#ytplayer').show(0, function () {
    //     player.playVideo();
    //     $('#progressBar').show();
    //     var playerTotalTime = player.getDuration();
    //     mytimer = setInterval(function () {
    //         var playerCurrentTime = Math.round(player.getCurrentTime());
    //         var playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;
    //         var playerTimePercent = Math.round(playerTimeDifference);
    //         console.log(playerTimePercent);
    //         progress(playerTimePercent, $('#progressBar'));
    //     }, 1000);
    // });

    //自訂按鈕
    document.querySelector("#mute-toggle").addEventListener('click', function () {
        isMute = !isMute
        var isVideo_activeIndex = swiper_youtube.slides[swiper_youtube.activeIndex]
        if (isMute) {
            playVideo_mute(isVideo_activeIndex)
            document.querySelector("#nuMute").style.display = 'block'
            document.querySelector("#mute").style.display = 'none'
        }
        else {
            stopVideo_unMute(isVideo_activeIndex)
            document.querySelector("#nuMute").style.display = 'none'
            document.querySelector("#mute").style.display = 'block'
        }
    })
    document.querySelector("#playBtn").addEventListener('click', function () {
        window.clearTimeout(t);
        var isVideo_activeIndex = swiper_youtube.slides[swiper_youtube.activeIndex]

        document.querySelector("#playBtn").style.display = 'none'
        document.querySelector("#pauseBtn").style.display = 'block'
        YT.get(isVideo_activeIndex.querySelector('iframe').id).playVideo();

    })
    document.querySelector("#pauseBtn").addEventListener('click', function () {
        window.clearTimeout(t);
        var isVideo_activeIndex = swiper_youtube.slides[swiper_youtube.activeIndex]

        document.querySelector("#pauseBtn").style.display = 'none'
        document.querySelector("#playBtn").style.display = 'block'
        YT.get(isVideo_activeIndex.querySelector('iframe').id).pauseVideo();
        
    })

    function playVideo_mute(isVideo_activeIndex) {
        YT.get(isVideo_activeIndex.querySelector('iframe').id).mute();
    }
    function stopVideo_unMute(isVideo_activeIndex) {
        YT.get(isVideo_activeIndex.querySelector('iframe').id).unMute();
        //sconsole.log('不靜音')
    }

    function onPlayerStateChange(event) {
        window.clearTimeout(t);
        //console.log(event)
        // var isVideo_activeIndex = swiper_youtube.slides[swiper_youtube.activeIndex].querySelector('.video-container');
        let isVideo_activeIndex = swiper_youtube.slides[swiper_youtube.activeIndex]

        if (event.data === 0) {
            //console.log("影片" + event.target.h.id + "播完換下一部")

            setTimeout(function () {
                document.getElementById("progress").value = 0;
                swiper_youtube.slideNext();
            }, 1000)
        }
        if (event.data !== null) {
            if (isVideo_activeIndex.children[0].dataset.type == "img") {
                //console.log('isImg')
                return
            }
            let totalTime = parseInt(YT.get(isVideo_activeIndex.querySelector('iframe').id).getDuration()),
                Total_Minute = Math.floor(Math.floor(totalTime % 3600) / 60),
                Total_Second = Math.floor(totalTime % 60);
            document.querySelector('#progress').setAttribute('max', totalTime)
            document.querySelector('#totalTime').textContent = Total_Minute + ":" + Total_Second
        }
        if (event.data === 1) {
            isTime(isVideo_activeIndex)
        }
        if (event.data === 2) {
            //console.log('暫停')
            //window.clearTimeout(t);
        }

        if (event.data === null) {
            //一開始初始youtube時，如果沒回傳結果才會執行
            document.querySelector("#playBtn").style.display = 'none'
            document.querySelector("#pauseBtn").style.display = 'block'
            YT.get(isVideo_activeIndex.querySelector('iframe').id).playVideo();
        }
    }

    function onPlayerReady(event) {
        onPlayerStateChange(event)
        //console.log("影片" + event.target.h.id + "加載完完")
    }

    function isTime(isVideo_activeIndex) {
        var palyingTime
        //console.log(seekTo)
        if (isVideo_activeIndex.children[0].dataset.type == "img") {
            //console.log('isImg')
            return
        }


         
         

            // if(seekTo == undefined ){
                
                palyingTime = parseInt(YT.get(isVideo_activeIndex.querySelector('iframe').id).getCurrentTime())
                
            // }else{
            //     //console.log('ok')
            //     palyingTime = seekTo
            // }

            let Cal_Minute = Math.floor(Math.floor(palyingTime) % 3600 / 60),
            Cal_Second = Math.floor(palyingTime % 60);
            console.log("計時器前",palyingTime)
            // document.querySelector('#progress').setAttribute('value', palyingTime)
            document.getElementById("progress").value = palyingTime;
            document.querySelector('#palyingTime').textContent = Cal_Minute + ":" + Cal_Second

        t = setTimeout(function () {
            palyingTime = parseInt(YT.get(isVideo_activeIndex.querySelector('iframe').id).getCurrentTime());
            console.log("計時器，用youtube抓時間",palyingTime)
            Cal_Minute = Math.floor(Math.floor(palyingTime) % 3600 / 60);
            Cal_Second = Math.floor(palyingTime % 60);

            // document.querySelector('#progress').setAttribute('value', palyingTime)
            document.getElementById("progress").value = palyingTime;
            document.querySelector('#palyingTime').textContent = Cal_Minute + ":" + Cal_Second

            isTime(isVideo_activeIndex)
        }, 1000);
    }




// }

document.querySelector("#progress").addEventListener('change', function (e) {
    window.clearTimeout(t);
    console.log("当前滑块值: ", e.target.value);
    value = e.target.value
    
    var isVideo_activeIndex = swiper_youtube.slides[swiper_youtube.activeIndex]
    YT.get(isVideo_activeIndex.querySelector('iframe').id).seekTo(value, true)
    // console.log(value)
    //isTime(isVideo_activeIndex,value)
    
})

// const sliderRange = document.querySelector("#progress");
//     sliderRange.onchange = e => {
//         console.log("当前滑块值: ", e.target.value);
//     };

