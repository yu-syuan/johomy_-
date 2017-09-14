$(function() {
  $("#datepicker").datepicker({dateFormat: "yy-mm-dd"});
  $("#datepicker2").datepicker({dateFormat: "yy-mm-dd"});
  $(".datepicker").datepicker({dateFormat: "yy-mm-dd"});
  $(".datepicker3").datepicker({
                                dateFormat: "yy-mm-dd",
                                minDate: "+1d",
                               });
  $(".check_shipping").click(function(){
    var sn = $(this).attr("sn");
    var shipping_company_id = $("#shipping_company_id"+sn).val();
    if (parseInt(shipping_company_id) == 0){
      alert("請選擇貨運公司!");
      $("#shipping_company_id"+sn).focus();
      return false;
    }
    var shipping_code = $("#shipping_code"+sn).val();
    if ($.trim(shipping_code) == ""){
      alert("請輸入出貨單號!");
      $("#shipping_code"+sn).focus();
      return false;
    }
    Rule = /^[_a-zA-Z0-9\s]+$/;
    if (!shipping_code.match(Rule)){
      alert("請輸入英數字!");
      $("#shipping_code"+sn).focus();
      return false;
    }
    var shipping_day = $("#shipping_day"+sn).val();
    if ($.trim(shipping_day) == ""){
      alert("請選擇出貨日!");
      $("#shipping_day"+sn).focus();
      return false;
    }
    if (confirm("確定更新出貨資料?")){
      $("#item"+sn).submit();
    }
  });
  $(".check_shipping_all").click(function(){
    var supplier_id = $(this).attr("supplier_id");
    var shipping_day = $("#shipping_day_all"+supplier_id).val();
    if ($.trim(shipping_day) == ""){
      alert("請選擇出貨日!");
      $("#shipping_day_all"+supplier_id).focus();
      return false;
    }
    if (confirm("確定更新出貨資料?")){
      $("#item_all"+supplier_id).submit();
    }
  });
});
