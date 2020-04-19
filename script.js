$(document).ready(function () {

 
    const apiKey = "appid=ff1187dd4648e9c8744af0f9250e8106";
    let city = [];
    let index = 0;
    let weatherURL = "https://api.openweathermap.org/data/2.5/weather?" + apiKey + "&q=";
    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?" + apiKey + "&q=";
    let uviURL = "https://api.openweathermap.org/data/2.5/uvi?" + apiKey;


    $(document).on("click", ".displayCity", function () {
        displayWeather($(this).text().trim());
    });

        
    $("#searchBtn").click(function displayCities() {

        
        let cityInput = $(".user-input").val().trim();

        
        displayWeather(cityInput);

        if (cityInput === "") {
            alert("Please enter a city name");
        }
       
        var ul = $("<ul>");
        var li = $("<li class='displayCity'>");
        li.append(cityInput);
        ul.append(li);
        $(".city-input").append(ul);
        storeCities(cityInput);
    })

    
    function displayWeather(city) {
        
        let url = weatherURL.concat(city);

        $.ajax({
            url: url,
            method: "GET"
        }).then(function (response) {

          
            
            var cityHeading = $("<h3 class='user-city'>");
            cityHeading.append(response.name);

            var date = $("<span>") 
            date.html(" " + moment(response.dt, "X").format("MM/DD/YYYY"));

            var img = "<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png' >" 

            cityHeading.append(date, img); 

            const pOne = $("<p class='temperature'>");
            let tempF = (Math.floor((response.main.temp - 273.15) * 1.80) + 32); 
            pOne.html("Temperature:   " + tempF + "°F");


            const pTwo = $("<p class='humidity'>");
            pTwo.html("Humidity:   " + response.main.humidity + "%");

            const pThree = $("<p class='wind-speed'>");
            let wind = response.wind.speed;
            pThree.html("Wind Speed:   " + wind + " mph");

          


 
            let url = forecastURL.concat(city);

          
            $.ajax({
                url: url,
                method: "GET"
            }).then(function (data) {

                //coordinates 
                let longitude = data.city.coord.lon
                let latitude = data.city.coord.lat
                var rowHeader = $("<div class='row1' id='rowHeading'>");
                rowHeader.append("5 Day Forecast");

                var row = $("<div class='row' id='second-row'>");
                var colOne = $("<div class='col1'>");

                
                var colTwo;
                var colThree;
                var colFour;
                var colFive;

          
                for (let index = 1; index < data.list.length; index++) {

                   
                    if (data.list[index].dt_txt.indexOf("00:00:00") > -1) {

                        colOne = $("<div class='col-sm-2'>"); //keeps the columns in a row
                        colOne.append(moment(data.list[index].dt, "X").format("MM/DD/YYYY"));
                        var img = "<img src='https://openweathermap.org/img/w/" + data.list[index].weather[0].icon + ".png' >"

                        var pTagOne = $("<p class='ptemp'>")
                        let tempConversion = (Math.floor((data.list[index].main.temp - 273.15) * 1.80) + 32);
                        pTagOne.html("Temp:   " + tempConversion + "°F");

                        var pTagTwo = $("<p class='humid'>");
                        pTagTwo.html("Humidity:   " + data.list[index].main.humidity + " %");


                        colOne.append(img, pTagOne, pTagTwo);
                        row.append(colOne);
                        
                        $("#five-day").empty("");
                    }
                }
               
                $("#five-day").append(rowHeader);
                $("#five-day").append(row);

               
              
                $.ajax({
                    url: uviURL + "&lat=" + latitude + "&lon=" + longitude,
                    method: "GET"
                }).then(function (data) {

                    
                    var pFour = $("<p class='uvi'>");
                    var uv = data.value
                    
                    
                    if (uv <= 2) {
                        pFour = $("<p class='ok'>");
                    } else if (uv > 3 && uv <= 5) {
                        pFour = $("<p class='moderate'>");
                    } else if (uv > 6 && uv <= 7) {
                        pFour = $("<p class='warning'>");
                    } else if (uv > 8 && uv <= 10) {
                        pFour = $("<p class='danger'>");
                    } else {
                        pFour = $("<p class='extreme'>");
                    }

                    
                    pFour.append("UV Index:   ")
                    pFour.append(data.value);

                    
                    $("#city-info").empty();
                    $("#city-info").append(cityHeading, pOne, pTwo, pThree, pFour);
                })
            })
        });
    }

    function storeCities(cityInput) {
      
        var cityArray = JSON.parse(localStorage.getItem("cityArray")) || [];

       
        if (!cityArray.includes(cityInput)) {
            cityArray.push(cityInput);
            
            localStorage.setItem("cityArray", JSON.stringify(cityArray));
        }
    }

    function retrieveCities() {
       
        var cityArray = JSON.parse(localStorage.getItem("cityArray")) || [];

        var ul = $("<ul>");
        for (var index = 0; index < cityArray.length; index++) {
            var li = $("<li class='displayCity'>");
            li.append(cityArray[index]);
            ul.append(li);
            $(".city-input").append(ul);
        }

        if (cityArray.length > 0) {
            displayWeather(cityArray[cityArray.length - 1]);
        }
    }
   
    retrieveCities();

    //Clears Search History 
    $("#clear").click(function () {
        $(".user-input").html("");
        $(".city-input").html("");
        localStorage.clear();
    });

});