/*
  Miya JS整理
 */
$(function() {
  // FB廣告數據
  // fbq("init",FbBPixelId);
  // if ($.trim(FbBPixelIdSet1) != ""){
  //   fbq("addPixelId",FbBPixelIdSet1);
  // }
  // fbq("track","PageView");
  // Google跟蹤器
  // ga("create",google_analyze_id,"auto");
  // ga('require','displayfeatures');
  // ga("send", "pageview");
  //點擊hamburger_icon選單(Header)
  $(".hamburger_icon").click(function() {  
    $(".search_wrap").hide(); //搜尋關鍵字隱藏
    $(".content_left").toggle("slide",300); //Menu內容
    $(".content_right").toggle("slide",300); //內容
  });
  //點擊search_icon搜尋
  $(".search_wrap").hide();
  $(".search_icon").click(function() {
    $(".search_wrap" ).toggle("blind",300); //搜尋關鍵字滑出
    $(".content_left").hide(); //Menu內容隱藏
    $(".content_right").show(); //內容顯示
  });
  // gotop設定
  $(".gotop_icon").hide()  
  $(window).scroll(function(){
    if($(this).scrollTop()>1){
      $(".gotop_icon").fadeIn();
    } else {
      $(".gotop_icon").fadeOut();
    }
  });   
  $(".gotop_icon a").click(function(){
    $("html,body").animate({scrollTop:0},400);
    return false;  
  });
    // footer menu_icon點擊換色 20170930連結a改div 20171002增加圖片切換功能
  $(".menu_icon_buy a").removeClass("active");
  $(".menu_icon_buy a").addClass("active");
  $(".menu_icon").click(function(){
    // reset
    $(".menu_icon div").removeClass("active");
    $(".menu_icon_buy a").removeClass("active");
    $(".ori_img").each(function(){ 
      var file = $(this).attr("file_name");
      $(this).attr("src",'images/'+file+"0.png");
      $(this).next("a").css("color","Black");
    });
    //active
    $(this).children(".menu_icon div").addClass("active");
    $(this).children(".menu_icon_buy a").addClass("active");
    $(".menu_icon_buy a").css("color","Black");
    $(".menu_icon_buy a").css("color","Black");
    var file_name = $("img",this).attr("file_name");
    $("img",this).attr("src","images/"+file_name+"1.png");
    $("div a",this).css("color","white");
  });
  // 關鍵字搜尋的搜尋按鈕功能
  $(".search_btn").click(function(){
    var search = $.trim($("#search_value").val());
    if (search != ""){
      top.location.href = "/search/"+search;
    } else {
      alert("請輸入關鍵字！");
    }
  });
  // 20170905 hamburger_menu 製作
  $("#hamburger_menu li").click(function(){
    var ui_id = $(this).attr("ui_id");
    $("#hamburger_menu .hamburger_show").slideUp();
    $("#ui_id_"+ui_id).stop().slideToggle(300);
  });
});

$(function(){
  // 商品介紹頁購買按鈕功能
  $(".buy_buy").click(function() {
    $(".search_wrap").hide();
    $(".hamburger_list_wrap").hide();
    var prod_id = $(this).attr("id");
    if (prod_id > 0){
      top.location.href = "/models/"+prod_id;
    }
  });
  //20170817商品介紹頁頁籤設定
  $(".tab_contents article").hide();
  $(".tab_contents #table_1").show();
  $(".controls a").removeClass("active");
  $(".table_1 a").addClass("active");
  
  $(".controls a").click(function(){
    $(".search_wrap").hide();
    $(".tab_contents article").hide();
    $($(this).attr("href")).show();
    $('html,body').animate({scrollTop:$($(this).attr("href")).offset().top},800);
    $(".controls a").removeClass("active");
    $(this).addClass("active");
    return false;
  });
});