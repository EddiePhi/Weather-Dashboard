//Questions for tutor:
    // How to adjust date format for forecast squares?
    //local sotrage to hold last searched city?


// https://openweathermap.org/api
// API Key: 0f848c85d2b3dd23041f7c21a9bd6d0b
// current weather: https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b
// 5 day/3 hour forecast: https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b
// UV Index: http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b



$("#submitBtn").on("click", function(event) {
    event.preventDefault();
    //Drawing user input from search field needs work
    let cityInput = $('#cityInput').val(); // check movie.json.dump.html
    let currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b";
    let searchHistory = [];
    searchHistory.push(cityInput);
    $('#cityInput').val('');

    // Populate search history
    for (let i = 0; i < searchHistory.length; i++){
        let searchSection = $('#searchHistory');
        let newDiv = $('<div>');
        newDiv.text(searchHistory[i]);
        searchSection.prepend(newDiv);
    };
    
    // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: currentWeatherURL,
          method: "GET"
        }).then(function(response) {
            console.log(response);
            let currentCity = $('#currentCity');
            let cityName = response.name;
            currentCity.text(cityName);
            

            let currentDate = $('#currentDate')
            let momentDate = moment().format('L');
            currentDate.text(momentDate)

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
                let uvIndex = $('#uvIndex');
                let cityUVIndex = response.value;
                uvIndex.text("UV Index: " + cityUVIndex);

                if (cityUVIndex >= 0 && cityUVIndex < 3){
                    uvIndex.css('backgroundColor', 'green');
                } else if (cityUVIndex >= 3 && cityUVIndex < 6){
                    uvIndex.css('backgroundColor', 'yellow');
                } else if (cityUVIndex >= 6 && cityUVIndex < 8){
                    uvIndex.css('backgroundColor', 'orange');
                } else if (cityUVIndex >= 8 && cityUVIndex < 11){
                    uvIndex.css('backgroundColor', 'red');
                } else {
                    uvIndex.css('backgroundColor', 'purple');
                };
            });

            var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b";
            $.ajax({
                url: forecastURL,
                method: "GET"
            }).then(function(response) {
                // console.log(response);
                //Set forecast dates
                let date1 = $('#date1');
                let date2 = $('#date2');
                let date3 = $('#date3');
                let date4 = $('#date4');
                let date5 = $('#date5');

                let dateA = response.list[1].dt_txt;
                let dateB = response.list[9].dt_txt;
                let dateC = response.list[17].dt_txt;
                let dateD = response.list[25].dt_txt;
                let dateE = response.list[33].dt_txt;

                date1.text(dateA);
                date2.text(dateB);
                date3.text(dateC);
                date4.text(dateD);
                date5.text(dateE);

                //Set forecast icons
                // let icon1 = $('#icon1');
                // let icon2 = $('#icon2');
                // let icon3 = $('#icon3');
                // let icon4 = $('#icon4');
                // let icon5 = $('#icon5');

                // let iconA = ;
                // let iconB = ;
                // let iconC = ;
                // let iconD = ;
                // let iconE = ;

                // icon1.text(iconA);
                // icon2.text(iconB);
                // icon3.text(iconC);
                // icon4.text(iconD);
                // icon5.text(iconE);
                
                //Set forecast temp
                let temp1 = $('#temp1');
                let temp2 = $('#temp2');
                let temp3 = $('#temp3');
                let temp4 = $('#temp4');
                let temp5 = $('#temp5');

                let tempA = response.list[1].main.temp;
                let tempB = response.list[9].main.temp;
                let tempC = response.list[17].main.temp;
                let tempD = response.list[25].main.temp;
                let tempE = response.list[33].main.temp;

                temp1.text("Temp: " + tempA);
                temp2.text("Temp: " + tempB);
                temp3.text("Temp: " + tempC);
                temp4.text("Temp: " + tempD);
                temp5.text("Temp: " + tempE);
                
                //Set forecast humidity
                let humidity1 = $('#humidity1');
                let humidity2 = $('#humidity2');
                let humidity3 = $('#humidity3');
                let humidity4 = $('#humidity4');
                let humidity5 = $('#humidity5');

                let humidityA = response.list[1].main.humidity;
                let humidityB = response.list[9].main.humidity;
                let humidityC = response.list[17].main.humidity;
                let humidityD = response.list[25].main.humidity;
                let humidityE = response.list[33].main.humidity;

                humidity1.text("Humidity: " + humidityA);
                humidity2.text("Humidity: " + humidityB);
                humidity3.text("Humidity: " + humidityC);
                humidity4.text("Humidity: " + humidityD);
                humidity5.text("Humidity: " + humidityE);
            });

        });
        
});

      