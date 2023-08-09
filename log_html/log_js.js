particlesJS("particles-js", {
  particles: {
    number: { value: 100, density: { enable: false, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "star",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: {
        src: "http://wiki.lexisnexis.com/academic/images/f/fb/Itunes_podcast_icon_300.jpg",
        width: 100,
        height: 100,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
    },
    size: {
      value: 4,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
    },
    line_linked: {
      enable: false,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 14,
      direction: "left",
      random: false,
      straight: true,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false, mode: "grab" },
      onclick: { enable: true, mode: "repulse" },
      resize: true,
    },
    modes: {
      grab: { distance: 200, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
})

//スクロールした際の動きを関数でまとめる
function ScrollAnime() {
  var windowHeight = $(window).height();
  var bodyHeight = $("body").height();
  if (bodyHeight >= windowHeight) {
    $(".scrolldown2").show();
  } else {
    $(".scrolldown2").hide();
  }
}

// CSV読み込み
function readCsv(data) {
  var target = "#loglist";
  var csv = $.csv.toArrays(data);
  var loglist = "";
  var titleName = $("#header").find("h1").text();

  $(csv).each(function () {
    if (this[0].length > 0) {
      if (this[0] == titleName) {
        loglist +=
          '<a href="../log_data/' +
          this[0] +
          "/" +
          this[1] +
          '" class="btnarrow5 iframe-open">' +
          this[2] +
          "</a>";
      }
    }
  });
  $(target).append(loglist);
}

//5. iframeのモーダル
var iFrameWight = $(window).width();
var iFrameHeight = $(window).height() * (80 / 100);
// var iFrameWight = 800;
// var iFrameHeight = 800;

$(window).on("load", function () {
  // csvファイルを確認してリンクを作成
  var csvfile = "./log_data.csv";
  $(function () {
    $.get(csvfile, readCsv, "text");
  });

  $("body").addClass("appear"); //フェードアウト後bodyにappearクラス付与

  //=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる

  //=====ここから背景が伸びた後に動かしたいJSをまとめたい場合は
  $(".splashbg").on("animationend", function () {
    //この中に動かしたいJSを記載
    

    ScrollAnime(); /* スクロールした際の動きの関数を呼ぶ*/

    $(".iframe-open").modaal({
      type: "iframe",
      width: iFrameWight, //iframe横幅
      height: iFrameHeight, //iframe高さ
      overlay_close: true, //モーダル背景クリック時に閉じるか
      before_open: function () {
        // モーダルが開く前に行う動作
        $("html").css("overflow-y", "hidden"); /*縦スクロールバーを出さない*/
      },
      after_close: function () {
        // モーダルが閉じた後に行う動作
        $("html").css("overflow-y", "scroll"); /*縦スクロールバーを出す*/
      },
    });

    $(".openbtn").click(function () {
      //ボタンがクリックされたら
      $(this).toggleClass("active"); //ボタン自身に activeクラスを付与し
      $("#g-nav").toggleClass("panelactive"); //ナビゲーションにpanelactiveクラスを付与
    });
  });
  //=====ここまで背景が伸びた後に動かしたいJSをまとめる
});

// $("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
// $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
// $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
// });
