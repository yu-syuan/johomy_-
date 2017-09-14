gender = 2;
$(function(){
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
  $("#state_id").change(function(){
    var id = $(this).val();
    getAddressList(id,$("#city_id"),0);
  });
  $("#save_profile").click(function(){
    var check = 0;
    var name = $("#name").val();
    $("#name_error").html("");
    if (!isChinese(name)){
      $("#name_error").html("請輸入中文");
      check++;
    }
    var email = $("#email").val();
    $("#email_error").html("");
    if (email != ""){
      var emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
      if (email.search(emailRule) == -1){
        $("#email_error").html("電子信箱格式錯誤。");
        check++;
      }
    }
    var state_id = $("#state_id").val();
    var city_id = $("#city_id").val();
    var address = $("#address").val();
    rs = checkAddress(state_id,city_id,address,"#address_error");
    if (rs == 0){
      check++;
    }
    var year = parseInt($("#year").val());
    $("#birthday_error").html("");
    if (year > 0){
      var month = parseInt($("#month").val());
      if (month > 0){
        var day = parseInt($("#day").val());
        if (day == 0){
          $("#birthday_error").html("請選擇生日日期");
          check++;
        }
      } else {
        $("#birthday_error").html("請選擇生日月份");
        check++;
      }
    }
    if (check > 0){
      return false;
    } else {
      $("#member_profile").submit();
      return true;
    }
  });
  if (parseInt(state_id) > 0){
    getAddressList(state_id,$("#city_id"),city_id);
  }
  if (parseInt(gender) > 0){
    $("#gender"+gender).prop("checked",true);
  }
  if (parseInt(edm_enabled) > 0){
    $("#edm_enabled").prop("checked",true);
  }
  $(".member a").addClass("active");
});
function getAddressList(id,dom_obj,select_id){
  dom_obj.html("");
  if (parseInt(id) > 0){
    var city = "<option value='0'>-- 請選擇 --</option>";
    $.each(cityList[id],function(k1,v1){
      if (v1.id == select_id){
        city += "<option value='"+k1+"' selected='selected'>"+v1.postcode+"-"+v1.name+"</option>";
      } else {
        city += "<option value='"+k1+"'>"+v1.postcode+"-"+v1.name+"</option>";
      }
    });
    dom_obj.html(city);
  }
}
function checkAddress(state_id,city_id,address,error_address){
  $(error_address).html("");
  if (parseInt(state_id) == 0){
    $(error_address).html("請選擇縣市");
    return 0;
  }
  if (parseInt(city_id) == 0){
    $(error_address).html("請選擇鄉鎮市區");
    return 0;
  }
  if ($.trim(address) == ""){
    $(error_address).html("地址請勿空白");
    return 0;
  }
  if (isSpecialChar(address)){
    $(error_address).html("請勿輸入特殊符號");
    return 0;
  }
  return 1;
}
function isSpecialChar(str){
  Rule = /^[\u4E00-\u9FA5_a-zA-Z0-9\s\,\.]+$/;
  if (!str.match(Rule)){
    return 1;
  }
  return 0;
}
function isChinese(str){
  cnRule = /[^\u4E00-\u9FA5]/g;
  if (str.match(cnRule)){
    return 0;// not cn words
  }
  return 1;
}
