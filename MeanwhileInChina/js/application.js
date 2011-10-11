
var input;
var lati;
var long;

var latiFlip;
var longFlip;

var latlng;
var latlong;

var geocoder;

var infowindow = new google.maps.InfoWindow();
var marker;



function initialize(){
  
    geocoder = new google.maps.Geocoder();
    navigator.geolocation.getCurrentPosition(foundLocation, noLocation);
}

 function foundLocation(position){
  lati = position.coords.latitude;
  long = position.coords.longitude;
  latlng = new google.maps.LatLng(lati, long);
  //codeLatLng(); //show location


  latiFlip = -position.coords.latitude;
  longFlip = position.coords.longitude;
  
  longFlip = longFlip-180;

  latlong = new google.maps.LatLng(latiFlip, longFlip);
  codeLatLngFlipt(); //show location
 }

function noLocation(){
  alert('Could not find location');
}

function codeLatLng() {
$("#results").html("latitude [ "+Math.round(lati)+" ] , Longitude [ "+Math.round(long)+" ]");
   geocoder.geocode({'latLng': latlng}, function(results, status) {
    
    if (status == google.maps.GeocoderStatus.OK) {

        if (results[1]) {
            var myOptions = {
            zoom: 12,
            center: latlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            } 
       var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        //ad
        marker = new google.maps.Marker({
            position: latlng,
            map: map
        })
      }
    } else {
        alert("Geocoder failed due to: " + status);
      }
  });
}

function codeLatLngFlipt() {
$("#flipt_results").html("latitude [ "+Math.round(latiFlip)+" ] , Longitude [ "+Math.round(longFlip)+" ]");
   geocoder.geocode({'latLng': latlng}, function(results, status) {
    
    if (status == google.maps.GeocoderStatus.OK) {

        if (results[1]) {
            var myOptions = {
              zoom: 2,
              center: latlong,
              mapTypeId: google.maps.MapTypeId.ROADMAP,
            } 
         var map = new google.maps.Map(document.getElementById("flipt_map_canvas"), myOptions);

        //ad
        marker = new google.maps.Marker({
            position: latlong,
            map: map
        })
      }
    } else {
        alert("Geocoder failed due to: " + status);
      }
  });
}
  $("#flipside").live('pageshow',function(){
        //console.log('resized!', this); 
         codeLatLng();
      });