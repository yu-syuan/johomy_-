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
});
