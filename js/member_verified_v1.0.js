$(function(){
  $("#sms_form").hide();
  $("#send_sms").click(function(){
    $("#send_error").html("");
    var ac_obj = {};
    checkSendSMS(ac_obj);
    return false;
  });
  $("#member_sms").click(function(){
    $("#sms_form").submit();
  });
  $(".member div").addClass("active");
  $(".member img").attr("src","images/menu_icon_member_1.png");
  $(".member a").css("color","white");
});
function checkSendSMS(ac_obj){
  $.ajax({
    cache: false,
    method : "POST",
    url: "/check_sms",
    dataType : "json",
    data : ac_obj
  }).done(function(msg) {
    $("#send_error").html(msg.msg);
    if (parseInt(msg.code) == 1 || parseInt(msg.code) == 0){
      $("#sms_form").show();
    }
    if (parseInt(msg.code) == 2){
      top.location.href="/bind";
    }
  });
}
