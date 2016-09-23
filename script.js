
function getLocation(){
    var url = "http://ip-api.com/json";    
    var json = $.ajax({
        url : url,
        async : false,
    }).responseText;
    return (JSON.parse(json));    
}

function getWeather(latitude, longitude){
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=4fe5f53682ebc7dd08d794486af04245";
    var json = $.ajax({
        url: url,
        async : false,
    }).responseText;
    return (JSON.parse(json));
}

function roundTo2dp(number){
    return Math.floor(number * 100)/100;
}

$(document).ready(function(){
    var location = getLocation();
    var weather = getWeather(location.lat, location.lon);
    var tempCelcius = roundTo2dp(weather.main.temp - 273.15);
    var tempFahrenheit = roundTo2dp(weather.main.temp * 9/5 - 459.67);    
    
    $("#location").html(location.city + ", " + location.country);
    $("#description").html(weather.weather[0].description);
    $("#temp").html(tempCelcius);
    $("#units").html(" \u2103");
    $("#icon").html("<img src = http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png height=\"100\" width=\"100\" alt = \"weather icon\" />");    

$("#units").click(function(){
    if ($("#units").html() == " \u2103"){
        $("#temp").html(tempFahrenheit);
        $("#units").html(" \u2109");
    }else{
        $("#temp").html(tempCelcius);
        $("#units").html(" \u2103");
    }       
});    
});

