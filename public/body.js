var formClass = document.querySelector(".form");

function submitForm (event) {
    //Prevents the form from redirecting to another page
    event.preventDefault();
    //Variables used for creating the url for the API
    var website = "http://api.weatherstack.com/current?access_key=95b89455f9f89ea01c347c69504b85b9&query=";
    var input = document.getElementById("userInput").value;
    var url = website + input;

    //Creates a request using the url
    var request = new XMLHttpRequest();
    request.open("GET", url);
    request.send();

    //Executes the function if the page is completely loaded up
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {

            //Fetches data from the API and adds it to the page
            jsonObj = JSON.parse(request.responseText);
            var data = jsonObj;

            //Displays the place name
            var place = "<h1>" + data.location.name + ", " + data.location.country + "</h1>";
            document.getElementById("place").innerHTML = place;

            //Adds a symbol according to the current weather
            document.getElementById("symbol").src = data.current.weather_icons;

            //Displays the temperature
            var temperature = "<h1>" + data.current.temperature + "&degC" + "</h1>";
            document.getElementById("temperature").innerHTML = temperature;

            //Displays the current weather
            var weather = "<h3>" + data.current.weather_descriptions + "</h3>";
            document.getElementById("weather").innerHTML = weather;

            //Displays the local time at the location
            var time = "<h3>" + "Local time: " + data.location.localtime + "</h3>";
            document.getElementById("time").innerHTML = time;

            //Converts km/h to m/s and displays wind speed
            var ms = Math.round(data.current.wind_speed /3.6);
            var windSpeed = "<h3>" + "Wind speed: " + ms + " m/s" + "</h3>";  
            document.getElementById("windSpeed").innerHTML = windSpeed;

            //Displays the wind direction
            var windDirection = "<h3>" + "Wind direction: " + data.current.wind_dir + "</h3>";
            document.getElementById("windDirection").innerHTML = windDirection;

            //Changes the background colour if it is night in the location
            if (data.current.is_day == "no") {
                document.body.style.backgroundColor = "#3c4a91";
            } else {
                document.body.style.backgroundColor = "#96b4e5";
            }
        }
    };
    //Empties the form input field
    formClass.reset();
};
