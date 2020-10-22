//https://openweathermap.org/api
// API Key: 0f848c85d2b3dd23041f7c21a9bd6d0b
// current weather: https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b
// 5 day/3 hour forecast: https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b
// UV Index: http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b

$("#submitBtn").on("click", function(event) {
    event.preventDefault();
    //Drawing user input from search field needs work
    var cityInput = $('input').attr("cityInput");
    var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + "Atlanta" + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b";
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + "Atlanta" + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b";
        
    // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: currentWeatherURL,
          method: "GET"
        }).then(function(response) {
            
            console.log(response);
            let currentCity = $('#currentCity');
            let cityName = response.name;
            currentCity.text(cityName);

            let temp = $('#temp');
            let cityTemp = response.main.temp;
            temp.text("Temp: " + cityTemp);

            let humidity = $('#humidity');
            let cityHumidity = response.main.humidity;
            humidity.text("Humidity: " + cityHumidity);

            let windSpeed = $('#windSpeed');
            let cityWindSpeed= response.wind.speed;
            windSpeed.text("Wind Speed: " + cityWindSpeed);


            var uvURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b";
            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function(response) {
                // Unable to locate UV Index.
                console.log(response);
                let uvIndex = $('#uvIndex');
                let cityUVIndex= response.value;
                uvIndex.text("UV Index: " + cityUVIndex);
            });

        });
        
});

      