const bodyParser = require('body-parser');
const express = require('express');
const https = require('https');
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    const query = req.body.cityName;
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&APPID=3f7520f0cd473178e2de645915df92fa";
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weather = JSON.parse(data);
            const weatherData = weather.weather[0].main;
            const description = weather.weather[0].description;
            const image = weather.weather[0].icon;
            const ImgUrl = "http://openweathermap.org/img/wn/"+image+"@2x.png";
            const place = weather.name;
            console.log(weatherData);
            res.write(`<h1>The temperature in ${place}l is ${weatherData} degree celcius</h1>`);
            res.write("<h3> the weather condition are "+description+" in "+ place +"</h3>");
            res.write("<img src="+ImgUrl+"></img>");
            res.send();
        })
    })
});
app.listen(3000,function(){
    console.log("server is running on port : 3000");
})




