$(function(){
  fbq('track','ViewContent',{content_ids:[prod_id],content_type:'product',value: default_price,currency: 'TWD'});
  $(".prod_bn").slick({
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  });
  $("#tabs_content").tabs({
    activate: function( event, ui ) {
      currentTabIndex = ui.newTab.index().toString();
      if (currentTabIndex == "2"){
        setDefaultMap();
      }
    }
  });
  /*$(".prod_info_wrap").accordion({
    collapsible: true,
    heightStyle: "content",
  });*/
  if (google_map){
    initlocations = {
                     "real_store_name" : "",
                     "latitude" : 25.018952,
                     "longitude" : 121.532565,
                     "description" : "",
                     "basic_info" : ""
                    };
    var hash = location.hash;
    var select_tab = 0;
    $("#tabs_content").tabs("option","active",select_tab);
    if (hash != null){
      select_tab = parseInt(hash.replace("#",""));
      if (select_tab > 0 && select_tab <= 3){
        $("#tabs_content").tabs("option","active",(select_tab-1));  
        var active = $("#tabs_content").tabs("option","active");
        if (active == 2){
          setDefaultMap();
        }
      }
    }
    $("#state_change").change(function(){
      var state_id = $(this).val();
      if (parseInt(state_id) > 0){
        var options = "<option value='0'>請選擇</option>";
        $.each(city[state_id],function(key,value){
          options += '<option value="'+key+'">'+value+'</option>';
        });
        $("#city_change").html(options);
        init_gmaps(initlocations,salonList[state_id],1,0,0);
      } else {
        $("#city_change").html("");
      }
      $("#store_change").html("");
    });
    $("#city_change").change(function(){
      var state_id = $("#state_change").val();
      var city_id = $(this).val();
      if (parseInt(city_id) > 0){
        var options = "<option value='0'>請選擇</option>";
        $.each(salonList[state_id][city_id],function(key,value){
          options += '<option value="'+key+'" title="'+value.address+'">'+
                     value.real_store_name+'('+value.address+')'+'</option>';
        });
        $("#store_change").html(options);
        init_gmaps(initlocations,salonList[state_id][city_id],0,1,0);
      } else {
        $("#store_change").html("");
      }
    });
    $("#store_change").change(function(){
      var state_id = $("#state_change").val();
      var city_id = $("#city_change").val();
      var real_store_id = $(this).val();
      if (parseInt(real_store_id) > 0){
        init_gmaps(initlocations,salonList[state_id][city_id][real_store_id],0,0,1);
      }
    });
  }
});
function setDefaultMap(){
  init_gmaps(initlocations,salonList[2][10],0,1,0);
  $("#state_change").val(2);
  var options = "<option value='0'>請選擇</option>";
  $.each(city[2],function(key,value){
    options += '<option value="'+key+'">'+value+'</option>';
  });
  $("#city_change").html(options);
  $("#city_change").val(10);
}
function init_gmaps(initlocation,locations,state,city,stores){
  var latitude = "";
  var longitude = "";
  var map = new GMaps({
        el: '#map',
        lat: initlocations.latitude,
        lng: initlocations.longitude,
        zoom: 14
      });
  latitude = initlocations.latitude;
  longitude = initlocations.longitude;
  var check = 0;
  if (state){
    $.each(locations,function(k1,v1){
      $.each(v1,function(k2,v2){
        map.addMarker({
          lat: v2.latitude,
          lng: v2.longitude,
          title: v2.real_store_name,
          infoWindow: {
                       content: v2.basic_info+"<br />"+v2.description
                      }
        });
        if (check == 0){
          latitude = v2.latitude;
          longitude = v2.longitude;
        }
        check++;
      });
    });
  }
  if (city){
    check = 0;
    $.each(locations,function(k1,v1){
      map.addMarker({
        lat: v1.latitude,
        lng: v1.longitude,
        title: v1.real_store_name,
        infoWindow: {
                     content: v1.basic_info+"<br />"+v1.description
                    }
      });
      if (check == 0){
        latitude = v1.latitude;
        longitude = v1.longitude;
      }
      check++;
    });
  }
  if (stores){
    map.addMarker({
      lat: locations.latitude,
      lng: locations.longitude,
      title: locations.real_store_name,
      infoWindow: {
                   content: locations.basic_info+"<br />"+locations.description
                  }
    });
    latitude = locations.latitude;
    longitude = locations.longitude;
  }
  map.setCenter(latitude,longitude);
  map = null;
}
