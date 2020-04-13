var coords = {
    lat:0,
    lon:0,
    cities:[]
}

//searching the user input
function search(city){
    //if the local storage already has the searched city
    //then move it to the top of the search history
    //otherwise add it to the top
    if(coords.cities.includes(city)){
        coords.cities = coords.cities.filter(item => item !== city);
        coords.cities.unshift(city);
    }else{
        coords.cities.unshift(city);
    }
    //if the search is not empty save it to search history
    if(coords.cities.length > 0){
        localStorage.setItem("cities", JSON.stringify(coords.cities));
    }
    searchHistory();
    getWeather(city);
}

function searchHistory(){
    $(".list-group").empty();
    if(coords.cities.length > 0){
        for(i in coords.cities){
            var li = $("<li class='list-group-item text-capitalize'>" + coords.cities[i] + "</li>");
            //if it's the first item then make it active because that's what we use
            if(i == 0){
                li.addClass("active");
            }
            $(".list-group").append(li);
        }

        //when clicked display the city weather and make the item active
        $(".list-group-item").click(function(){
            $(".list-group-item").removeClass("active");
            $(this).addClass("active");
            getWeather($(this).text());
        })
    }
}

function getWeather(city){
    $(".box").empty();
    $.ajax({
        url:"https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ff00d24997526604f9e9b50249f6db64"
    }).then(function(resp){
        console.log(resp);
        //using moment api to get unix timestamp to date format
        var today = moment.unix(resp.dt).format("YYYY/DD/MM");
        //saving the lat, long to my object
        coords.lat = resp.coord.lat;
        coords.lon = resp.coord.lon;
        $(".box").append("<h3 class='text-capitalize'>" + city + " (" + today + ")<img src='http://openweathermap.org/img/wn/" + resp.weather[0].icon + ".png'/></h3>");
        $(".box").append("<p>Temperture: " + (~~(resp.main.temp - 273.15) * 9/5 + 32) + "F</p>");
        $(".box").append("<p>Humidity: " + resp.main.humidity + "%</p>");
        $(".box").append("<p>Wind Speed: " + resp.wind.speed + "MPH</p>");
        getUVIndex();
        get5DayForecast();
    }).catch(function(error){
        $(".box").html("<h3>No such city</h3>");
        $(".card-group").empty();
        console.log(error.statusText);
    })
}

//get uv index 
function getUVIndex(){
    $.ajax({
        url:`https://api.openweathermap.org/data/2.5/uvi?lat=${coords.lat}&lon=${coords.lon}&appid=ff00d24997526604f9e9b50249f6db64`
    }).then(function(resp){
        var uvIndex = $("<p>UV Index: <span>" + resp.value + "</span></p>");
        $(".box").append(uvIndex);
        //getting the right background color
        if(resp.value <= 3){
            uvIndex.children(":first").addClass("favorable");
        }else if(resp.value < 8){
            uvIndex.children(":first").addClass("moderate");
        }else{
            uvIndex.children(":first").addClass("severe");
        }
        
    }).catch(function(error){
        console.log(error.statusText);
    })
}

//get 5 day forecast 
function get5DayForecast(){
    $(".card-group").empty();
    $.ajax({
        url:`https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=ff00d24997526604f9e9b50249f6db64`
    }).then(function(resp){
        for(var i = 0; i<5; i++){
            var card = $("<div class='card'>");
            var cardBody = $("<div class='card-body'>");
            var h5 = $("<h5>" + moment.unix(resp.daily[i].dt).format("YYYY/DD/MM") + "</h5>");
            var img = $("<img src='http://openweathermap.org/img/wn/" + resp.daily[i].weather[0].icon + ".png'/>");
            var p1 = $("<p>Temp: " + (~~(resp.daily[i].temp.day - 273.15) * 9/5 + 32) + "F</p>");
            var p2 = $("<p>Humidity: " + resp.daily[i].humidity + "%</p>");
            cardBody.append(h5);
            cardBody.append(img);
            cardBody.append(p1);
            cardBody.append(p2);
            card.append(cardBody);
            $(".card-group").append(card);
        }
        
    }).catch(function(error){
        console.log(error.statusText);
    })
}

//when the page loading is ready init the page with the following
$( document ).ready(function() {
    if(localStorage.getItem("cities") !== null){
        coords.cities = JSON.parse(localStorage.getItem("cities"));
        searchHistory();
        getWeather(coords.cities[0]);
    }

    $("#search-form").on("submit", function(event){
        event.preventDefault();
        var query = $("#search-input").val().trim().toLowerCase();
        if(query !== null && query !== ""){
            search(query);
        }
    })
});