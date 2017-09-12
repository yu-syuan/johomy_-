$(function(){
  fbq('track','ViewContent',{content_type: 'product',content_ids: [prod_id]});
  $("#add_cart").click(function(){
    var cart_obj = {
                    "prod_id" : $("#prod_id").val(),
                    "prod_name" : $("#prod_name").val(),
                    "models_id" : $("#prod_model").val(),
                    "qty" : $("#prod_qty").val(),
                    "deliver_method_id" : $("#prod_delivery").val(),
                    "is_tax" : $("#tax").val()
                   };
    if ($("#prod_model").val() > 0){
      addToCart(cart_obj,0);
    } else {
      alert("商品補貨中");
    }
  });
  $("#checkout_cart").click(function(){
    var cart_obj = {
                    "prod_id" : $("#prod_id").val(),
                    "prod_name" : $("#prod_name").val(),
                    "models_id" : $("#prod_model").val(),
                    "qty" : $("#prod_qty").val(),
                    "deliver_method_id" : $("#prod_delivery").val(),
                    "is_tax" : $("#tax").val()
                   };
    if ($("#prod_model").val() > 0){
      addToCart(cart_obj,1);
    } else {
      alert("商品補貨中");
    }
  });
});
function addToCart(cart_obj,checkout){
  fbq('track','AddToCart',{content_type: 'product',content_ids: [prod_id]});
  $.ajax({
      cache: false,
      method : "POST",
      url: "/add_cart/",
      dataType : "json",
      data : cart_obj
  }).done(function(msg) {
    var ok = 0;
    if (msg.code == 1){
      ok = 1;
    } else {
      alert("系統忙碌中!請稍等幾秒後再次嘗試一次。");
    }
    if (ok == 1){
      if (checkout == 1){
        top.location.href="/checkout/"+cart_obj.deliver_method_id;
      } else {
        alert("加入購物車完成!");
        top.location.href="/";
        //history.back();
      }
    }
  });
}
