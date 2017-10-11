$(function(){
  $("#check_account").click(function(){
    var mobile = $.trim($("#mobile").val());
    $("#mobile_error").html("");
    if (!isMobileFormat(mobile)){
      $("#mobile_error").html("請輸入正確的手機格式!");
    } else {
      var ac_obj = {"mobile" : $("#mobile").val()};
      checkMobile(ac_obj);
    }
    return false;
  });
  $("#member_register").click(function(){
    var check = 0;
    var mobile = $.trim($("#mobile").val());
    $("#mobile_error").html("");
    if (!isMobileFormat(mobile)){
      $("#mobile_error").html("請輸入正確的手機格式!");
      check++;
    }
    var pwd = $.trim($("#pwd").val());
    $("#pwd_error").html("");
    $("#cpwd_error").html("");
    if (pwd.length < 6){
      $("#pwd_error").html("密碼請輸入6位以上!");
      check++;
    } else {
      if (!isNumberEnglishFormat(pwd)){
        $("#pwd_error").html("密碼6位以上英數字混合,英文字需區分大小寫");
        check++;
      } else {
        var cpwd = $.trim($("#cpwd").val());
        if (pwd != cpwd){
          $("#cpwd_error").html("確認密碼與密碼不同");
          check++;
        }
      }
    }
    $("#accept_error").html("");
    if (!$("#accept").is(":checked")){
      $("#accept_error").html("請同意使用條款");
      check++;
    }
    if (check > 0){
      return false;
    } else {
      $("#register_form").submit();
      return true;
    }
  });
  $(".member a").addClass("active");
  // 20171005 Footer架構變動 因此變更顯示方式
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
function isMobileFormat(str){
  mobileRule = /^09\d{8}$/;
  if (str.match(mobileRule)){
    return 1;
  }
  return 0;
}
function checkMobile(ac_obj){
  $.ajax({
      cache: false,
      method : "POST",
      url: "/check_account",
      dataType : "json",
      data : ac_obj
  }).done(function(msg) {
    $("#mobile_error").html(msg.msg);
  });
}
