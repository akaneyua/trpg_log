// 要素
// const mc1 = new Audio('./music/下弦の月.mp3');
// const mc2 = new Audio('./music/プレギエーラの月夜に.mp3');
// const mc3 = new Audio('./music/祈りのヴィオレット.mp3');
// const mc4 = new Audio('./music/翡翠のカヴィリエーレ.mp3');
// const mc5 = new Audio('./music/麗しきセデュース.mp3');
// const mc6 = new Audio('./music/密教の首飾り.mp3');
// const mc7 = new Audio('./music/罪過に契約の血を.mp3');
// const mc8 = new Audio('./music/月蝕のヴァニタス.mp3');
// const mc9 = new Audio('./music/EUPHORIA_償いのレクイエム.mp3');

// const play1 = document.getElementById('play1');
// const play2 = document.getElementById('play2');
// const play3 = document.getElementById('play3');
// const play4 = document.getElementById('play4');
// const play5 = document.getElementById('play5');
// const play6 = document.getElementById('play6');
// const play7 = document.getElementById('play7');
// const play8 = document.getElementById('play8');
// const play9 = document.getElementById('play9');

// 再生中の音楽
// var music = mc1;
// var play;

// 再生・停止
// function musicPlay(play_ID,music_NO) {
//     if (play !== play_ID) {
//         if (!music.paused) {
//             play.innerHTML = '<i class="fa-solid fa-music fa-sm"></i>';
//             music.pause();
//         }
//         play = play_ID;
//         music = music_NO;
//         music.currentTime = 0;
//     }

//     if (!music.paused) {
//         play.innerHTML = '<i class="fa-solid fa-music fa-sm"></i>';
//         music.pause();
//     } else {
//         play.innerHTML = '<i class="fa-solid fa-pause fa-sm"></i>';
//         music.play();
//     }
// };

// 再生ボタン
// function playMc1() {musicPlay(play1,mc1);};
// function playMc2() {musicPlay(play2,mc2);};
// function playMc3() {musicPlay(play3,mc3);};
// function playMc4() {musicPlay(play4,mc4);};
// function playMc5() {musicPlay(play5,mc5);};
// function playMc6() {musicPlay(play6,mc6);};
// function playMc7() {musicPlay(play7,mc7);};
// function playMc8() {musicPlay(play8,mc8);};
// function playMc9() {musicPlay(play9,mc9);};


// ページトップボタン
// スクロールした際の動きを関数でまとめる
function pagetopAnime() {
	var scroll = $(window).scrollTop();
	if (scroll >= 600){//上から600pxスクロールしたら
		$('#page-top').removeClass('DownMove');//#page-topについているDownMoveというクラス名を除く
		$('#page-top').addClass('UpMove');//#page-topについているUpMoveというクラス名を付与
	}else{
		if($('#page-top').hasClass('UpMove')){//すでに#page-topにUpMoveというクラス名がついていたら
			$('#page-top').removeClass('UpMove');//UpMoveというクラス名を除き
			$('#page-top').addClass('DownMove');//DownMoveというクラス名を#page-topに付与
		}
	}
}
// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	pagetopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// #page-topをクリックした際の設定
$('#page-top').click(function () {
    $('body,html').animate({
        scrollTop: 0//ページトップまでスクロール
    }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false;//リンク自体の無効化
});

// ログ
// スクロールすると表示される
$windowWidth = window.innerWidth;
$breakPointA = 768;

isMobileSize = ($windowWidth < $breakPointA);
isPcSize = ($windowWidth > $breakPointA);


if (isPcSize) {
    //PCの場合

    //visibility:kp
    $(function () {
         // スクロール時に反応
        $(window).scroll(function () {
            $(".kp").each(function () {
                var ePos = $(this).offset().top;
                var scroll = $(window).scrollTop();
                var windowHeight = $(window).height();
                if (scroll > ePos - windowHeight + windowHeight / 6) {
                    $(this).addClass('LtoR-early');
                }
            });

            //visibility:left
            $(".left").each(function () {
                var ePos = $(this).offset().top;
                var scroll = $(window).scrollTop();
                var windowHeight = $(window).height();
                if (scroll > ePos - windowHeight + windowHeight / 6) {
                    $(this).children('span').addClass('hide');
                    $(this).children('p').addClass('hide');
                    $(this).css({ 'opacity': '1' });
                    $(this).children('span').css({ 'opacity': '0' });
                    $(this).children('p').css({ 'opacity': '0' });
                    $(this).children('span').removeClass('hide');
                    $(this).children('p').removeClass('hide');
                    $(this).children('span').addClass('LtoR-delay');
                    $(this).children('p').addClass('LtoR');
                }
            });

            //visibility:right
            $(".right").each(function () {
                var ePos = $(this).offset().top;
                var scroll = $(window).scrollTop();
                var windowHeight = $(window).height();
                if (scroll > ePos - windowHeight + windowHeight / 6) {
                    $(this).children('span').addClass('hide');
                    $(this).children('p').addClass('hide');
                    $(this).css({ 'opacity': '1' });
                    $(this).children('p').css({ 'opacity': '0' });
                    $(this).children('span').removeClass('hide');
                    $(this).children('p').removeClass('hide');
                    $(this).children('span').addClass('RtoL-delay');
                    $(this).children('p').addClass('RtoL');
                }
            });

        });
    });


    function opacityON() {
        $(".log div").css({ opacity: "0" });
        var end = $(window).height();
        var count = 0;

        $(".log div").each(function () {
            var position = $(this).offset().top;
            if (position <= end) {
                count++
            }
        });
        for (i = 0; i <= count - 2; i++) {
            var classname = $('.log div').eq(i).attr('class');
            if (classname.indexOf('kp') !== -1) {
                $('.log div').eq(i).addClass('LtoR-early');
            }
            else {
                $('.log div').eq(i).css({ opacity: "1" });
                if (classname.indexOf('left') !== -1) {
                    $('.log div').eq(i).children('span').addClass('LtoR-delay');
                    $('.log div').eq(i).children('p').addClass('LtoR');
                }
                else if (classname.indexOf('right') !== -1) {
                    $('.log div').eq(i).children('span').addClass('RtoL-delay');
                    $('.log div').eq(i).children('p').addClass('RtoL');
                }
                else {
                    $('.log div').eq(i).css({ 'opacity': '1' });
                }
            }
        }
    }
    opacityON();

}

else if (isMobileSize) {
    //スマホ用
    function winScrLR() {
        var ePos = $(this).offset().top;
        var scroll = $(window).scrollTop();
        var windowHeight = $(window).height();
        if (scroll > ePos - windowHeight + windowHeight / 10) {
            $(this).children('span').addClass('hide');
            $(this).children('p').addClass('hide');
            $(this).css({ 'opacity': '1' });
            $(this).children('span').css({ 'opacity': '0' });
            $(this).children('p').css({ 'opacity': '0' });
            $(this).children('span').removeClass('hide');
            $(this).children('p').removeClass('hide');
            $(this).children('span').addClass('LtoR-delay');
            $(this).children('p').addClass('LtoR');
        }
    }

    //visibility:kp
    $(function () {
        // タッチホバー対応
        $('body').attr('ontouchstart', '');

        // スクロール時に反応
        $(window).scroll(function () {
            $(".left").each(winScrLR);
            $(".right").each(winScrLR);
            $(".kp").each(function () {
                var ePos = $(this).offset().top;
                var scroll = $(window).scrollTop();
                var windowHeight = $(window).height();
                if (scroll > ePos - windowHeight + windowHeight / 10) {
                    $(this).addClass('LtoR-early');
                }
            });
        });
    });

    function opacityON() {
        $(".log div").css({ opacity: "0" });
        var end = $(window).height();
        var count = 0;

        $(".log div").each(function () {
            var position = $(this).offset().top;
            if (position <= end) {
                count++
            }
        });
        for (i = 0; i <= count - 2; i++) {
            var classname = $('.log div').eq(i).attr('class');
            if (classname.indexOf('kp') !== -1) {
                $('.log div').eq(i).addClass('LtoR-early');
            }
            else {
                $('.log div').eq(i).css({ opacity: "1" });
                if (classname.indexOf('left') !== -1) {
                    $('.log div').eq(i).children('span').addClass('LtoR-delay');
                    $('.log div').eq(i).children('p').addClass('LtoR');
                }
                else if (classname.indexOf('right') !== -1) {
                    $('.log div').eq(i).children('span').addClass('LtoR-delay');
                    $('.log div').eq(i).children('p').addClass('LtoR');
                }
                else {
                    $('.log div').eq(i).css({ 'opacity': '1' });
                }
            }
        }
    }



    opacityON();

};
