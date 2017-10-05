$(function(){
  $("#member_pwd").click(function(){
    var check = 0;
    var pwd = $.trim($("#pwd").val());
    $("#pwd_error").html("");
    $("#cpwd_error").html("");
    if (pwd.length < 6){
      $("#pwd_error").html("新密碼請輸入6位以上!");
      check++;
    } else {
      if (!isNumberEnglishFormat(pwd)){
        $("#pwd_error").html("新密碼6位以上英數字混合,英文字需區分大小寫");
        check++;
      } else {
        var cpwd = $.trim($("#cpwd").val());
        if (pwd != cpwd){
          $("#cpwd_error").html("確認新密碼與新密碼不同");
          check++;
        }
      }
    }
    if (check > 0){
      return false;
    } else {
      $("#pwd_form").submit();
      return true;
    }
  });
  $(".member div").addClass("active");
  $(".member img").attr("src","images/menu_icon_member_1.png");
  $(".member a").css("color","white");
});
function isNumberEnglishFormat(str){
  Rule = /^[a-zA-Z0-9]+$/;
  if (str.match(Rule)){
    return 1;
  }
  return 0;
}
