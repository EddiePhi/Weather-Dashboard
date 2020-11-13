//Questions for tutor:
    // How to adjust date format for forecast squares?
    //how to make my code DRY?



// https://openweathermap.org/api
// API Key: 0f848c85d2b3dd23041f7c21a9bd6d0b
// current weather: https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b
// 5 day/3 hour forecast: https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b
// UV Index: http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b

//Get localStorage values when page first loads
let getStorage = localStorage.getItem("savedDetails") || "[]";
let storageParse = JSON.parse(getStorage);
console.log(storageParse[0] + " first check")

previousSearch();
$("#submitBtn").on("click", searchCity);
// $(".historyItem").each("click", clickHistory);


function previousSearch() {
    //event.preventDefault();
    //Drawing user input from search field needs work
    let cityInput = storageParse[0];
    let currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b";
    
    
    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: currentWeatherURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        let currentCity = $('#currentCity');
        let cityName = response.name;
        currentCity.text(cityName);
        

        //let currentDate = $('#currentDate')
        let momentDate = moment().format('L');
        currentCity.append(" (" + momentDate + ")")
        let currentIcon = response.weather[0].icon;
        currentCity.append(`<img src="https://openweathermap.org/img/wn/${currentIcon}@2x.png">`)

        let temp = $('#temp');
        let cityTemp = response.main.temp;
        temp.text("Temp: " + cityTemp);

        let humidity = $('#humidity');
        let cityHumidity = response.main.humidity;
        humidity.text("Humidity: " + cityHumidity);

        let windSpeed = $('#windSpeed');
        let cityWindSpeed= response.wind.speed;
        windSpeed.text("Wind Speed: " + cityWindSpeed);


        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b";
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
            console.log(response);
            //Set forecast dates
            let date1 = $('#date1');
            let date2 = $('#date2');
            let date3 = $('#date3');
            let date4 = $('#date4');
            let date5 = $('#date5');

            let dateA = response.list[0].dt_txt;
            let dateB = response.list[8].dt_txt;
            let dateC = response.list[16].dt_txt;
            let dateD = response.list[24].dt_txt;
            let dateE = response.list[32].dt_txt;

            date1.text(dateA);
            date2.text(dateB);
            date3.text(dateC);
            date4.text(dateD);
            date5.text(dateE);

            //Set forecast icons
            let icon1 = $('#icon1');
            let icon2 = $('#icon2');
            let icon3 = $('#icon3');
            let icon4 = $('#icon4');
            let icon5 = $('#icon5');

            let iconA = response.list[0].weather[0].icon;
            let iconB = response.list[8].weather[0].icon;
            let iconC = response.list[16].weather[0].icon;
            let iconD = response.list[24].weather[0].icon;
            let iconE = response.list[32].weather[0].icon;
            
            $(icon1).empty();
            $(icon2).empty();
            $(icon3).empty();
            $(icon4).empty();
            $(icon5).empty();
            
            icon1.append(`<img src="https://openweathermap.org/img/wn/${iconA}@2x.png">`);
            icon2.append(`<img src="https://openweathermap.org/img/wn/${iconB}@2x.png">`);
            icon3.append(`<img src="https://openweathermap.org/img/wn/${iconC}@2x.png">`);
            icon4.append(`<img src="https://openweathermap.org/img/wn/${iconD}@2x.png">`);
            icon5.append(`<img src="https://openweathermap.org/img/wn/${iconE}@2x.png">`);
            
            //Set forecast temp
            let temp1 = $('#temp1');
            let temp2 = $('#temp2');
            let temp3 = $('#temp3');
            let temp4 = $('#temp4');
            let temp5 = $('#temp5');

            let tempA = response.list[0].main.temp;
            let tempB = response.list[8].main.temp;
            let tempC = response.list[16].main.temp;
            let tempD = response.list[24].main.temp;
            let tempE = response.list[32].main.temp;

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

            let humidityA = response.list[0].main.humidity;
            let humidityB = response.list[8].main.humidity;
            let humidityC = response.list[16].main.humidity;
            let humidityD = response.list[24].main.humidity;
            let humidityE = response.list[32].main.humidity;

            humidity1.text("Humidity: " + humidityA);
            humidity2.text("Humidity: " + humidityB);
            humidity3.text("Humidity: " + humidityC);
            humidity4.text("Humidity: " + humidityD);
            humidity5.text("Humidity: " + humidityE);

        });
    });
};










function searchCity(event) {
    event.preventDefault();
    //Drawing user input from search field needs work
    let cityInput = $('#cityInput').val();
    let currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b";
    let searchHistory = [];
    searchHistory.push(cityInput);
    $('#cityInput').val('');

    // Populate search history
    for (let i = 0; i < searchHistory.length; i++){
        let searchSection = $('#searchHistory');
        let newDiv = $('<div>');
        newDiv.attr('class', 'historyItem')
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
            

        //let currentDate = $('#currentDate')
        let momentDate = moment().format('L');
        currentCity.append(" (" + momentDate + ")")
        let currentIcon = response.weather[0].icon;
        currentCity.append(`<img src="https://openweathermap.org/img/wn/${currentIcon}@2x.png">`)

        let temp = $('#temp');
        let cityTemp = response.main.temp;
        temp.text("Temp: " + cityTemp);

        let humidity = $('#humidity');
        let cityHumidity = response.main.humidity;
        humidity.text("Humidity: " + cityHumidity);

        let windSpeed = $('#windSpeed');
        let cityWindSpeed= response.wind.speed;
        windSpeed.text("Wind Speed: " + cityWindSpeed);


        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b";
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
            console.log(response);
            //Set forecast dates
            let date1 = $('#date1');
            let date2 = $('#date2');
            let date3 = $('#date3');
            let date4 = $('#date4');
            let date5 = $('#date5');

            let dateA = response.list[0].dt_txt;
            let dateB = response.list[8].dt_txt;
            let dateC = response.list[16].dt_txt;
            let dateD = response.list[24].dt_txt;
            let dateE = response.list[32].dt_txt;

            date1.text(dateA);
            date2.text(dateB);
            date3.text(dateC);
            date4.text(dateD);
            date5.text(dateE);

            //Set forecast icons
            let icon1 = $('#icon1');
            let icon2 = $('#icon2');
            let icon3 = $('#icon3');
            let icon4 = $('#icon4');
            let icon5 = $('#icon5');

            let iconA = response.list[0].weather[0].icon;
            let iconB = response.list[8].weather[0].icon;
            let iconC = response.list[16].weather[0].icon;
            let iconD = response.list[24].weather[0].icon;
            let iconE = response.list[32].weather[0].icon;
            
            $(icon1).empty();
            $(icon2).empty();
            $(icon3).empty();
            $(icon4).empty();
            $(icon5).empty();
            
            icon1.append(`<img src="https://openweathermap.org/img/wn/${iconA}@2x.png">`);
            icon2.append(`<img src="https://openweathermap.org/img/wn/${iconB}@2x.png">`);
            icon3.append(`<img src="https://openweathermap.org/img/wn/${iconC}@2x.png">`);
            icon4.append(`<img src="https://openweathermap.org/img/wn/${iconD}@2x.png">`);
            icon5.append(`<img src="https://openweathermap.org/img/wn/${iconE}@2x.png">`);
            
            //Set forecast temp
            let temp1 = $('#temp1');
            let temp2 = $('#temp2');
            let temp3 = $('#temp3');
            let temp4 = $('#temp4');
            let temp5 = $('#temp5');

            let tempA = response.list[0].main.temp;
            let tempB = response.list[8].main.temp;
            let tempC = response.list[16].main.temp;
            let tempD = response.list[24].main.temp;
            let tempE = response.list[32].main.temp;

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

            let humidityA = response.list[0].main.humidity;
            let humidityB = response.list[8].main.humidity;
            let humidityC = response.list[16].main.humidity;
            let humidityD = response.list[24].main.humidity;
            let humidityE = response.list[32].main.humidity;

            humidity1.text("Humidity: " + humidityA);
            humidity2.text("Humidity: " + humidityB);
            humidity3.text("Humidity: " + humidityC);
            humidity4.text("Humidity: " + humidityD);
            humidity5.text("Humidity: " + humidityE);
        });

    });
        
    function clickHistory(){
        let cityInput = $(this).text();
        console.log(cityInput);
        //Clear array to prevent appending.
        searchHistory = [];
        searchHistory.push(cityInput);
        let currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b";
        
            
        $.ajax({
            url: currentWeatherURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            let currentCity = $('#currentCity');
            let cityName = response.name;
            currentCity.text(cityName);
            

            //let currentDate = $('#currentDate')
            let momentDate = moment().format('L');
            currentCity.append(" (" + momentDate + ")")
            let currentIcon = response.weather[0].icon;
            currentCity.append(`<img src="https://openweathermap.org/img/wn/${currentIcon}@2x.png">`)

            let temp = $('#temp');
            let cityTemp = response.main.temp;
            temp.text("Temp: " + cityTemp);

            let humidity = $('#humidity');
            let cityHumidity = response.main.humidity;
            humidity.text("Humidity: " + cityHumidity);

            let windSpeed = $('#windSpeed');
            let cityWindSpeed= response.wind.speed;
            windSpeed.text("Wind Speed: " + cityWindSpeed);


            var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + response.coord.lat + "&lon=" + response.coord.lon + "&appid=0f848c85d2b3dd23041f7c21a9bd6d0b";
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
                console.log(response);
                //Set forecast dates
                let date1 = $('#date1');
                let date2 = $('#date2');
                let date3 = $('#date3');
                let date4 = $('#date4');
                let date5 = $('#date5');

                let dateA = response.list[0].dt_txt;
                let dateB = response.list[8].dt_txt;
                let dateC = response.list[16].dt_txt;
                let dateD = response.list[24].dt_txt;
                let dateE = response.list[32].dt_txt;

                date1.text(dateA);
                date2.text(dateB);
                date3.text(dateC);
                date4.text(dateD);
                date5.text(dateE);

                //Set forecast icons
                let icon1 = $('#icon1');
                let icon2 = $('#icon2');
                let icon3 = $('#icon3');
                let icon4 = $('#icon4');
                let icon5 = $('#icon5');

                let iconA = response.list[0].weather[0].icon;
                let iconB = response.list[8].weather[0].icon;
                let iconC = response.list[16].weather[0].icon;
                let iconD = response.list[24].weather[0].icon;
                let iconE = response.list[32].weather[0].icon;
                
                $(icon1).empty();
                $(icon2).empty();
                $(icon3).empty();
                $(icon4).empty();
                $(icon5).empty();
                
                icon1.append(`<img src="https://openweathermap.org/img/wn/${iconA}@2x.png">`);
                icon2.append(`<img src="https://openweathermap.org/img/wn/${iconB}@2x.png">`);
                icon3.append(`<img src="https://openweathermap.org/img/wn/${iconC}@2x.png">`);
                icon4.append(`<img src="https://openweathermap.org/img/wn/${iconD}@2x.png">`);
                icon5.append(`<img src="https://openweathermap.org/img/wn/${iconE}@2x.png">`);
                
                //Set forecast temp
                let temp1 = $('#temp1');
                let temp2 = $('#temp2');
                let temp3 = $('#temp3');
                let temp4 = $('#temp4');
                let temp5 = $('#temp5');

                let tempA = response.list[0].main.temp;
                let tempB = response.list[8].main.temp;
                let tempC = response.list[16].main.temp;
                let tempD = response.list[24].main.temp;
                let tempE = response.list[32].main.temp;

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

                let humidityA = response.list[0].main.humidity;
                let humidityB = response.list[8].main.humidity;
                let humidityC = response.list[16].main.humidity;
                let humidityD = response.list[24].main.humidity;
                let humidityE = response.list[32].main.humidity;

                humidity1.text("Humidity: " + humidityA);
                humidity2.text("Humidity: " + humidityB);
                humidity3.text("Humidity: " + humidityC);
                humidity4.text("Humidity: " + humidityD);
                humidity5.text("Humidity: " + humidityE);
            });
        });

        localStorage.setItem("savedDetails", JSON.stringify(searchHistory));
    };

    localStorage.setItem("savedDetails", JSON.stringify(searchHistory));
    console.log(localStorage);
    console.log(storageParse[0])

    $(document).on("click", ".historyItem", clickHistory);

    // return clickHistory;
};

  


      