var path = require("path");
var express = require("express");
var zipdb = require("zippity-do-dah");
var ForecastIO = require("forecastio");
//alert(ForecastIO);

var app = express(); //creates an express application

var wheather = new ForecastIO("449eb7dde22eac9ad3a35f182e9717fb"); //creates an instance of forcast object 

app.use(express.static(path.resolve(__dirname,"public"))); //server static files out of public folder

app.set("views",path.resolve(__dirname,"views"));//uses ejs as the view engind and serves the views out fo views folder

app.set("view engine","ejs");

app.get("/",function(req,res){

     res.render("index");   //render the index view if you hit the homepage

});
//gettting here when submit
app.get(/^\/(\d{5})$/, function(req,res,next) {
    // console.log(zipdb);
   //location object contain this data so 
//{zipcode: '76626', type: 'standard', city: 'Blooming Grove', state: 'TX', latitude: '32.09', longitude: '-96.71' }

    var zipcode = req.params[0];  //got the zopcode here
   
    var location = zipdb.zipcode(zipcode); //grabbing the location
     //var city =zipdb.City(zipcode);
   //  console.log("City is " + City);
    //console.log(zipcode + "this is the location" + location);
      if(!location.zipcode) {
           next();  
           return;

      }
   
    var city = location.city;
    console.log(city);
    var latitude = location.latitude;
    var longitude =location.longitude;

      wheather.forecast(latitude,longitude,function(err,data){
         if(err) {
               next();
               
               return;

         }
  //     console.log(data.City);
         res.json({
               zipcode:zipcode,
               temperature : data.currently.temperature,
               City : city
   
         }); 
   

     });
 

});

app.use(function(req,res){
res.status(404).render("404");

})
app.listen(4000,function(){
  console.log("server started on port 4000");

});