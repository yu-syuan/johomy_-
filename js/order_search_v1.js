$(function(){
  $("#goSearchOrder").click(function(){
    var code = $("#tracking_code").val();
    var Rule = /^[a-zA-Z0-9]+$/;
    if (!code.match(Rule)){
      // alert("請輸入英數字!");
      $("#tracking_error").html("請輸入英數字!");
    } else {
      $("#code_form").submit();
    }
  });
  $("#go_pay").click(function(){
    $("#pay_again").submit();
  });
  $(".order a").addClass("active");
  // 20171005 Footer架構變動 因此變更顯示方式
  $(".order div").addClass("active");
  $(".order img").attr("src","images/menu_icon_order_1.png");
  $(".order a").css("color","white");
});
