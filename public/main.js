$(function(){

//alert("in main.js");
var $h1= $("h1");
var $zip = $("input[name='Zip']");

$("form").on("submit",function(event) {


event.preventDefault();
  var zipcode = $.trim($zip.val());
    $h1.text("Loading....Please wait");

    var request = $.ajax({
       url: "/" +zipcode,
       dataType: "json"

    });

    request.done(function(data){
         var temperature = data.temperature;
         var city = data.City;
         $h1.html("It is " + temperature + "&#176; in   " + city +"("+zipcode +").");

    });

     request.fail(function(){
     	$h1.text("ERROR")
     	// body...
     });

 });



});