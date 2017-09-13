$(function(){
  $("#member_login").click(function(){
    $("#account_error").html("");
    var account = $("#account").val();
    if (!isMobileFormat(account)){
      $("#account_error").html("格式有誤，請檢查手機號碼!");
      return false;
    }
    $("#member_login_form").submit();
    return true;
  });
  $.ajaxSetup({ cache: true });
  $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    FB.init({
      appId: fb_app_id,
      cookie: true,
      version: 'v2.8'
    });     
  });
  $(".fb_btn_bg").click(function(){
    FB.login(function(response) {
      if (response.status === 'connected') {
        FB.api('/me', function(response) {
          $("#fb_id").val(response.id);
          var check_connected = $("#fb_id").val();
          if ($.trim(check_connected) != ""){
            $("#fb_login_form").submit();
          }
        });
      } else {
      }
    }, {scope: 'public_profile,email'});
  });
  $(".member a").addClass("active");
});
function isMobileFormat(str){
  mobileRule = /^09\d{8}$/;
  if (str.match(mobileRule)){
    return 1;
  }
  return 0;
}
