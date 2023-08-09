var unit = 100,
canvasList, // キャンバスの配列
info = {}, // 全キャンバス共通の描画情報
colorList; // 各キャンバスの色情報

/**
* Init function.
* 
* Initialize variables and begin the animation.
*/
function init() {
info.seconds = 0;
info.t = 0;
canvasList = [];
colorList = [];
// canvas1個めの色指定
canvasList.push(document.getElementById("waveCanvas"));
colorList.push(['#fff', '#fff', '#fff', '#fff', '#fff']);//重ねる波線の色設定


// 各キャンバスの初期化
for (var canvasIndex in canvasList) {
  var canvas = canvasList[canvasIndex];
  canvas.width = document.documentElement.clientWidth; //Canvasのwidthをウィンドウの幅に合わせる
  canvas.height = 200;//波の高さ
  canvas.contextCache = canvas.getContext("2d");
}
// 共通の更新処理呼び出し
update();
}

function update() {
for (var canvasIndex in canvasList) {
  var canvas = canvasList[canvasIndex];
  // 各キャンバスの描画
  draw(canvas, colorList[canvasIndex]);
}
// 共通の描画情報の更新
info.seconds = info.seconds + .014;
info.t = info.seconds * Math.PI;
// 自身の再起呼び出し
setTimeout(update, 35);
}

/**
* Draw animation function.
* 
* This function draws one frame of the animation, waits 20ms, and then calls
* itself again.
*/
function draw(canvas, color) {
// 対象のcanvasのコンテキストを取得
var context = canvas.contextCache;
// キャンバスの描画をクリア
context.clearRect(0, 0, canvas.width, canvas.height);

//波線を描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
drawWave(canvas, color[0], 0.8, 3, 0);
drawWave(canvas, color[1], 0.5, 4, 0);
drawWave(canvas, color[2], 0.3, 1.6, 0);
drawWave(canvas, color[3], 0.2, 3, 100);
drawWave(canvas, color[4], 0.5, 1.6, 250);
}

/**
* 波を描画
* drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawWave(canvas, color, alpha, zoom, delay) {
var context = canvas.contextCache;
context.strokeStyle = color;//線の色
context.lineWidth = 1;//線の幅
context.globalAlpha = alpha;
context.beginPath(); //パスの開始
drawSine(canvas, info.t / 0.5, zoom, delay);
context.stroke(); //線
}

/**
* Function to draw sine
* 
* The sine curve is drawn in 10px segments starting at the origin. 
* drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawSine(canvas, t, zoom, delay) {
var xAxis = Math.floor(canvas.height / 2);
var yAxis = 0;
var context = canvas.contextCache;
// Set the initial x and y, starting at 0,0 and translating to the origin on
// the canvas.
var x = t; //時間を横の位置とする
var y = Math.sin(x) / zoom;
context.moveTo(yAxis, unit * y + xAxis); //スタート位置にパスを置く

// Loop to draw segments (横幅の分、波を描画)
for (i = yAxis; i <= canvas.width + 10; i += 10) {
  x = t + (-yAxis + i) / unit / zoom;
  y = Math.sin(x - delay) / 3;
  context.lineTo(i, unit * y + xAxis);
}
}


//スクロールした際の動きを関数でまとめる
function ScrollAnime() {
    var windowHeight = $(window).height();
    var bodyHeight = $('body').height();
    if (bodyHeight >= windowHeight){
        $('.scrolldown2').show();
    }else{
        $('.scrolldown2').hide();
    }
}

// CSV読み込み
function readCsv(data) {
  var target = '#loglist';
  var csv = $.csv.toArrays(data);
  var loglist = '';
  var titleName = $('#header').find('h1').text();

  $(csv).each(function () {
    if (this[0].length > 0) {
      if(this[0] == titleName){
        loglist += '<a href="../log_data/' + this[0] + '/' + this[1] + '" class="btnarrow5 iframe-open">' + this[2] + '</a>';
      }
    }
  });
  $(target).append(loglist);
}


  //5. iframeのモーダル
  var iFrameWight = $(window).width();
  var iFrameHeight = $(window).height() * (80/100);
  // var iFrameWight = 800;
  // var iFrameHeight = 800;


$(window).on('load', function () {
  // csvファイルを確認してリンクを作成
  var csvfile = './log_data.csv';
  $(function () {
    $.get(csvfile, readCsv, 'text');
  });

  $('body').addClass('appear');//フェードアウト後bodyにappearクラス付与

//=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる

//=====ここから背景が伸びた後に動かしたいJSをまとめたい場合は
$('.splashbg').on('animationend', function () {
  //この中に動かしたいJSを記載
  init();
  
  ScrollAnime();/* スクロールした際の動きの関数を呼ぶ*/

$(".iframe-open").modaal({
    type:'iframe',
    width: iFrameWight,//iframe横幅
    height:iFrameHeight,//iframe高さ
    overlay_close:true,//モーダル背景クリック時に閉じるか
before_open:function(){// モーダルが開く前に行う動作
    $('html').css('overflow-y','hidden');/*縦スクロールバーを出さない*/
},
after_close:function(){// モーダルが閉じた後に行う動作
    $('html').css('overflow-y','scroll');/*縦スクロールバーを出す*/
}
});

$(".openbtn").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
  });
});
//=====ここまで背景が伸びた後に動かしたいJSをまとめる


});



// $("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    // $(".openbtn").removeClass('active');//ボタンの activeクラスを除去し
    // $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
// });
