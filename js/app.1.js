
var defaultName = {
    title: null,//'For my honey',
    from: null,//'阿木',
    to: null,//'我最亲爱的老婆阿紫～',
    wish: null,//'情人节快乐！'
};

var hashKey = {
    // key:     '?d~',
    // symbol: {
    //     start:  '#/',
    //     key:    '~',
    //     space:  '&'
    // },
    from: 'f=',
    to: 't=',
    wish: 'w='
};

var url = {
   
    parse: function (hash) {
        var hash = window.location.href || location.hash;
        var newHash = hash; // 关闭hash判断模块 @St. 2016-02-15-10.57
        var key = '?d=';
        var keyLen = key.length;
        var queryIndex = newHash.lastIndexOf(key);

        var query = {};
        if (queryIndex !== -1) {
            query = newHash
                .slice(queryIndex + keyLen) //'?d~'
                .split('&')
                .reduce(function (result, item) {
                    item = item.split('=');
                    if (item[0]) {

                        // console.log(typeof item[1]);
                        // console.log(_this.decode(item[1]));
                        //
                        // result[item[0]] = decodeURI(item[1]);
                        result[item[0]] = item[1];
                    }

                    //console.log(result);

                    return result;
                }, query);
            newHash = newHash.slice(0, queryIndex);
        }

        // return {
        //     //path:  newHash.slice(1),
        //     //query: query
        // };

        console.log(query);

        return query;


    }
};

var hash = {
    //query: url.parse(location.hash),
    query: url.parse(),
    judge: function (cons, defaultName) {
        //console.log(cons !== defaultName);
        if (cons !== defaultName && cons !== undefined) {
            //console.log(cons);
            return decodeURI(cons);
        }
        else {
            return defaultName;
        }
    },
    set: function (key) {
        var query = this.query;
        //console.log(key);
        //console.log(query);
        if (key) {
            /*
              开发备忘  @St. 2016-02-15-11.08
              ---
              1、这里考虑是否可以使用 forEach 或者 reduce来做？
              2、或者考虑将这个判断添加至 url.parse()?
            */
            if (key === 'to') {
                return this.judge(query.to, defaultName.to);
            }
            else if (key === 'from') {
                return this.judge(query.from, defaultName.from);
            }
            else if (key === 'wish') {
                return this.judge(query.wish, defaultName.wish);
            }
            else if (key === 'title') {
                return this.judge(query.title, defaultName.title);
            }
        }
    }
};


$(function () {


    // 添加 jplayer 播放控件 dom
    $('body').append('<div id="jquery_jplayer_1" class="jp-jplayer"></div>' +
        '<div id="jp_container_1" class="jp-audio" role="application" aria-label="media player">' +
        '<button class="jp-play iconPlay" role="button" tabindex="0">play</button>' +
        '</div>');
    // 初始化 jPlayer
    $("#jquery_jplayer_1").jPlayer({
        ready: function (event) {
            $(this).jPlayer("setMedia", {
                mp3: 'media/Shayne-Ward-Until-You.mp3'
            });
            // 设置自动播放，iOS safari 受安全限制无效，wechat可以自动播放
            $(this).jPlayer("play").jPlayer("repeat");
        },
        //swfPath: "js",
        supplied: "mp3",
        wmode: "window",
        useStateClassSkin: true,
        autoBlur: false,
        smoothPlayBar: true,
        keyEnabled: true,
        remainingDuration: true,
        toggleDuration: true,
        volume: 1
    });



});

// 当页面加载完毕时开始动画。
window.onload = function () {
    ani.init();
    updateSliderControl();
    addSmoothScrolling();
};

// 使用 onscroll 回调函数来更新 slider
window.onscroll = function () {
    updateSliderControl();
    //locator.stop();
};

var ani = {
    init: function () {
        this.logo("#hvd");
        this.logo("#ani1");
        this.logo("#ani2");
        this.logo("#ani3");
        //this.robot();
    },
    logo: function (tag) {
        TweenMax.fromTo(tag, 2, {
            // from
            css: {
                y: 0,
            }
        }, {
                // to
                css: {
                    y: "30px",
                },
                // 永久重复动画的选项
                repeat: -1,
                // 反转、重新运行动画的选项
                yoyo: true,
                // 改变 easing 类型
                ease: Sine.easeInOut
            }
        );
    }//,

};

function updateSliderControl() {
    // 获得所有的 slider 链接
    var links = document.querySelectorAll("#slider-control a");
    for (var i = 0; i < links.length; i++) {
        var link = links[i];
        //console.log(link);
        var attr = link.getAttribute('href');
        // 获取被链接指向的部分
        //var section = document.querySelector('#intro-section', '#native', '#touch', '#android');
        var section = document.querySelector(attr);

        //console.log(section);


        var sectionTop = section.offsetTop;
        var sectionBottom = sectionTop + window.innerHeight;  //  section.offsetHeight

        // 检查 window.scrollY 是否在这部分中
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            //console.log(attr);
            link.className = "active";
            //event.preventDefault();
            //location.hash = attr;
            //console.log(link);
        }
        else {
            link.className = "";
        }
    }
}

// 练习：网页滚动动画
function scrollToElement(element) {
    //声明变量topOfElement = element.offsetTop
    var topOfElement = element.offsetTop;
    // window 的动画滚动，使用TweenMax plugins
    TweenMax.to(window, 1, {
        scrollTo: {
            y: topOfElement,
        },
        ease: Sine.easeInOut
    });
}

function addSmoothScrolling() {
    var links = document.querySelectorAll("#slider-control a");

    for (var i = 0; i < links.length; i++) {
        var link = links[i];

        //if (typeof window.addEventListener === 'function'){
        // 闭包
        (function (_link) {
            //console.log('_link: ' + _link);
            //console.log(link);
            link.addEventListener('click', function (event) {
                /*
                  这里禁用了鼠标的点击事件, 会导致hash无法更新，
                  也就是说hash就没有作用了
                  动画是否可以考虑换一种逻辑方式，
                  利用hash的方式去执行窗体混动的动画呢？？？
                */
                event.preventDefault();
                var attr = _link.getAttribute('href');
                //console.log('href: ' + _link);
                scrollToElement(document.querySelector(attr));
                //location.hash = attr;
            });
        })(link);
    }
}
