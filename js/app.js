

var url = {
    parse: function (hash) {
        var hash = window.location.href || location.hash;
        var newHash = hash; // 关闭hash判断模块 @St. 2016-02-15-10.57
        //console.log('newHash: ' + newHash);
        //var queryIndex = newHash.indexOf(hashKey.symbol.key);
        var key = '?d-';
        var keyLen = key.length;

        // console.log(keyLen);

        var queryIndex = newHash.lastIndexOf(key);

        // console.log(newHash.slice(queryIndex + keyLen));

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


var text = url.parse();

var hash = {
    //query: url.parse(location.hash),
    query: text.t ? text : {
        t: '苏小姐',
        f: '',
        w: '',
    },
   
};


$(function () {
    var date = new Date();
    var year = date.getFullYear();

    var dom = [
        {
            name: 'section7',
            text: `
                <div class="sectionIn">
                    <p>
                        献给<span id="hashTo"></span><br>
                        <span id="hashWish"></span><br>
                        来自<span id="hashFrom"></span>
                        <br>
                        ${year}-02-14
                    </p>
                </div>
             `,
           
        }, {
            name: 'section8',
            text: '<div class="sectionIn">' +
                '<h2>特别感谢</h2>' +
                '<p>木木的React老师<a href="https://github.com/hayeah" class="textu">Howard</a>先森<br>' +
                'Google doodle／Github！</p>' +
                '<div class="btn">' +
                '<a href="https://github.com/superwoods">' +
                '访问超级木木的Github首页</a>' +
                '</div>' +
                '<div class="license">' +
                '<a href="https://github.com/superwoods">' +
                '本页面由 / 超级木木 / 木Studio 设计制作, ' +
                '我们使用MIT开源协议, 欢迎转载分享, ' +
                '但请您务必保留我们的署名, 感谢！' +
                '</a>' +
                '</div>' +
                '</div>'
        }
    ];

   
    // 给dom添加 hash截取的 3个字符串 to, wish和from（同时包含 decodeURI 转码过程）

    console.log('====================================');
    // console.log(hash.set('to'), hash.set('wish'), hash.set('from'));
    console.log(hash.query);
    console.log('====================================');

    $('#hashTo').text(decodeURI(hash.query.t));
    $('#hashWish').text(decodeURI(hash.query.w));
    $('#hashFrom').text(decodeURI(hash.query.f));
    $('#title').text(`For ` + decodeURI(hash.query.t));

    // ?d-f=苗苗&t=幸运的男孩&w=你来接我我很开心！

    /*
    2016-02-14-23:22 备忘
    ---
    1、缺少二维码生成
    √ //2、缺少onhashchange？
    3、少一个制作工具
    4、发布前需要，打开jplayer自动播放！！！
    x //5、缺少自动添加hash功能？
    */

    // 给封面title添加 hash截取的 title 字符串（同时包含 decodeURI 转码过程）

    // 替换title标签文字
    $('title').append($('#hashTo').text() + '--来自' + $('#hashFrom').text());

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
    }
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
        //var sectionBottom = sectionTop + section.offsetHeight;
        //console.log(section.offsetHeight);
        //console.log(sectionTop + " / " + sectionBottom);
        //console.log(window.scrollY);
        //console.log(window.scrollY);

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
    // create a scene
    // var scene1 = new ScrollMagic.Scene({
    //         duration: 100,  // the scene should last for a scroll distance of 100px
    //         offset: 50      // start this scene after scrolling for 50px
    //     })
    //     .setPin("#my-sticky-element") // pins the element for the the scene's duration
    //     .addTo(controller); // assign the scene to the controller

    //console.log(num);
    //console.log(element);

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
