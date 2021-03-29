var ytplayer, isMute = true, timeID, t, time, palyingTime, n = 0;
// 
let jss = [
    'https://unpkg.com/swiper/swiper-bundle.min.js',
    'https://www.youtube.com/iframe_api',
];
let csss = [
    'https://unpkg.com/swiper/swiper-bundle.min.css'
]
linkInit()

function linkInit() {
    //插件加載中顯示的畫面
    document.querySelector('.video-swiper-wrapper').style.backgroundImage = "url('sec01.jpg')"
    document.querySelector('.video-swiper-wrapper').style.backgroundSize = "cover"
    document.querySelector('.video-swiper-wrapper').style.overflow = "hidden"
    document.querySelector('.video-swiper-wrapper').style.height = "62vw"
    document.querySelector('.youtubeTool').style.visibility = 'hidden'

    document.querySelectorAll('.swiper-slide').forEach(function(item){
        item.style.visibility = 'hidden'
    })
    // position: absolute;
    // document.querySelector('.youtubeTool').style.opacity = '0'

    for (let i = 0; i < csss.length; i++) {
        var tag = document.createElement('link');
        tag.href = csss[n];
        var firstLinkTag = document.getElementsByTagName('link')[0];
        firstLinkTag.parentNode.insertBefore(tag, firstLinkTag);
        tag.setAttribute('rel', 'stylesheet')
    };
    srclink()
    function srclink() {
        if (n !== jss.length) {
            var tag = document.createElement('script');
            tag.src = jss[n];
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            firstScriptTag.onload = function (e) {
                console.log(e)
                n = n + 1
                if (n !== jss.length) {
                    srclink()
                }
                if (n == jss.length) {
                    init()
                }
            }
        }
    }
}

function init() {

    var titles = ['Page 1', 'Page 2', 'Page 3'];
    var mySwiper = new Swiper('.swiper-youtube-container', {
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
                console.log("透過swiper的init")
                //Swiper初始化了
                
                // alert('当前的slide序号是' + this.activeIndex);//或者swiper.activeIndex，swiper与this都可指代当前swiper实例
                window.onYouTubePlayerAPIReady = function () {
                    console.log("onYouTubePlayerAPIReady")
                    var container = document.querySelectorAll('.video-container');
                    for (var i = 0; i < container.length; i++) {
                        initPlayer(container[i])
                    }
                    document.querySelector('.video-swiper-wrapper').style.background = 'none'
                    document.querySelector('.youtubeTool').style.visibility = 'visible'
                    document.querySelector('.video-swiper-wrapper').style.height = "auto"
                    document.querySelectorAll('.swiper-slide').forEach(function(item){
                        item.style.visibility = 'visible'
                    })
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
                                'autohide': 0,
                                'playsinline': 1,
                                'widget_referrer': location.origin,
                                'enablejsapi': 1,
								'origin': location.origin,
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
        let isVideo_activeIndex = mySwiper.slides[mySwiper.activeIndex]
        let isVideo_previousIndex = mySwiper.slides[mySwiper.previousIndex]
        //console.log(isVideo_activeIndex.children[0].dataset.type) //檢查是影片還是圖片
        //onsole.log(mySwiper.slides)
        //console.log(mySwiper.activeIndex)

        //停止上一卡還在播放的影片；如果上一卡是圖片則取消跳轉計時
        //播放當前卡，如果是影片則播放；圖片則計時跳轉
        //console.log(isVideo_activeIndex.children[0].dataset.type)
        if (isVideo_activeIndex.children[0].dataset.type == "video") {
            mySwiper.allowTouchMove = false //阻止手指滑動          
            document.querySelector("#mute-toggle").style.visibility = "visible"
            document.querySelector("#playBtn").style.visibility = 'visible'
            document.querySelector("#pauseBtn").style.visibility = 'visible'
            document.querySelector("#progress").style.visibility = 'visible'
            document.querySelector(".progressTxt").style.visibility = 'visible'
            togger("#playBtn", "#pauseBtn", init = true)
            if (isMute) {
                playVideo_mute(isVideo_activeIndex)
            }
            else {
                stopVideo_unMute(isVideo_activeIndex)
            }
            YT.get(isVideo_activeIndex.querySelector('iframe').id).playVideo();
        } else {
            mySwiper.allowTouchMove = true//允許手指滑動
            //console.log(mySwiper.allowTouchMove)
            document.querySelector("#mute-toggle").style.visibility = "hidden"
            document.querySelector("#playBtn").style.visibility = 'hidden'
            document.querySelector("#pauseBtn").style.visibility = 'hidden'
            document.querySelector("#progress").style.visibility = 'hidden'
            document.querySelector(".progressTxt").style.visibility = 'hidden'

            timeID = window.setTimeout(function () {
                //console.log('圖片5秒換下')
                mySwiper.slideNext();
            }, 5000)
        }

        if (isVideo_previousIndex.children[0].dataset.type == "video") {
            YT.get(isVideo_previousIndex.querySelector('iframe').id).stopVideo();
            //console.log("停止播放上一卡影片：" , isVideo_previousIndex.querySelector('iframe').id)
        } else {
            window.clearTimeout(timeID);
        }
    });

    //自訂按鈕
    document.querySelector("#mute-toggle").addEventListener('click', function () {
        isMute = !isMute
        var isVideo_activeIndex = mySwiper.slides[mySwiper.activeIndex]
        if (isMute) {
            playVideo_mute(isVideo_activeIndex)
            togger("#nuMute", "#mute")
        }
        else {
            stopVideo_unMute(isVideo_activeIndex)
            togger("#nuMute", "#mute")
        }
    })
    document.querySelector("#playBtn").addEventListener('click', function () {
        var isVideo_activeIndex = mySwiper.slides[mySwiper.activeIndex]
        // console.log(isVideo_activeIndex)
        togger("#playBtn", "#pauseBtn")
        YT.get(isVideo_activeIndex.querySelector('iframe').id).playVideo();
        //測試是否可用dom元素來控制
        // console.log(isVideo_activeIndex.querySelector('iframe').id)

    })
    document.querySelector("#pauseBtn").addEventListener('click', function () {
        var isVideo_activeIndex = mySwiper.slides[mySwiper.activeIndex]
        togger("#playBtn", "#pauseBtn")
        YT.get(isVideo_activeIndex.querySelector('iframe').id).pauseVideo();

    })

    function togger(a, b, init) {
        var aDOM = document.querySelector(a);
        var bDOM = document.querySelector(b);
        if (init === true) {
            document.querySelector("#playBtn").style.display = "none";
            document.querySelector("#pauseBtn").style.display = "block";
            document.querySelector(".progressTxt").style.display = "block";
            if (isMute) {
                document.querySelector("#nuMute").style.display = "block";
                document.querySelector("#mute").style.display = "none";
            }
            return
        }
        if (aDOM.style.display === "none") {
            aDOM.style.display = "block";
            bDOM.style.display = "none";
        }
        else if (aDOM.style.display === "block") {
            aDOM.style.display = "none";
            bDOM.style.display = "block";
        }
    }

    function playVideo_mute(isVideo_activeIndex) {
        YT.get(isVideo_activeIndex.querySelector('iframe').id).mute();
    }
    function stopVideo_unMute(isVideo_activeIndex) {
        YT.get(isVideo_activeIndex.querySelector('iframe').id).unMute(); //不靜音
    }

    function onPlayerStateChange(event) {
        window.clearTimeout(t);
        let isVideo_activeIndex = mySwiper.slides[mySwiper.activeIndex]
        if (isVideo_activeIndex.children[0].dataset.type == "img") {
            //console.log('isImg')
            return
        }
        let totalTime = parseInt(YT.get(isVideo_activeIndex.querySelector('iframe').id).getDuration()),
            Total_Minute = Math.floor(Math.floor(totalTime % 3600) / 60),
            Total_Second = Math.floor(totalTime % 60);
        document.querySelector('#progress').setAttribute('max', totalTime)
        totalTime = document.getElementById("progress").max
        document.querySelector('#totalTime').textContent = Total_Minute + ":" + Total_Second

        if (event.data === 0) {
            //console.log("影片" + event.target.h.id + "播完換下一部")
            setTimeout(function () {
                showVideoTime("0", "0", 0, 100);
                mySwiper.slideNext();
            }, 1000)
        }
        if (event.data === 1) {
            console.log("播放")
            isTime(isVideo_activeIndex, totalTime)
        }
        if (event.data === 2) { }
        if (event.data === null) {
            //一開始初始youtube時，如果沒回傳結果才會執行
            YT.get(isVideo_activeIndex.querySelector('iframe').id).playVideo();
        }
    }

    function onPlayerReady(event) {
        onPlayerStateChange(event)
        //console.log("影片" + event.target.h.id + "加載完完")
    }

    function isTime(isVideo_activeIndex, totalTime) {
        var palyingTime, Cal_Minute, Cal_Second;
        palyingTime = parseInt(YT.get(isVideo_activeIndex.querySelector('iframe').id).getCurrentTime())
        Cal_Minute = Math.floor(Math.floor(palyingTime) % 3600 / 60)
        Cal_Second = Math.floor(palyingTime % 60);
        if (palyingTime < 1) {
            Cal_Second = Cal_Second + 1
            palyingTime = palyingTime + 1
        }
        showVideoTime(Cal_Minute, Cal_Second, palyingTime, totalTime);

        t = setTimeout(function () {
            window.clearTimeout(t);
            isTime(isVideo_activeIndex, totalTime)
        }, 1000);
    }
    // }

    document.querySelector("#progress").addEventListener('change', function (e) {
        window.clearTimeout(t);
        //console.log("当前滑块值: ", e.target.value);
        let isVideo_activeIndex = mySwiper.slides[mySwiper.activeIndex]
        let totalTime = document.getElementById("progress").max
        let seekToValue = e.target.value
        let Cal_Minute = Math.floor(Math.floor(seekToValue % 3600) / 60),
            Cal_Second = Math.floor(seekToValue % 60);
        showVideoTime(Cal_Minute, Cal_Second, seekToValue, totalTime);
        YT.get(isVideo_activeIndex.querySelector('iframe').id).seekTo(seekToValue, true)
    })


    function showVideoTime(Cal_Minute, Cal_Second, palyingTime, totalTime) {
        let percent = (palyingTime / totalTime) * 100

        document.querySelector('#palyingTime').textContent = Cal_Minute + ":" + Cal_Second
        document.getElementById("progress").value = palyingTime;
        document.getElementById("progress").setAttribute("value", palyingTime);
        document.getElementById("progress").style.background = 'linear-gradient(to right, rgba(199, 22, 22,0.5) 0%, rgba(199, 22, 22,0.5) ' + percent + '%, rgba(255, 255, 255, 0.2) ' + percent + '%, white 100%)'
    };
}

