// Declaring user input DOM elements as variables
var userInput = document.querySelector('#user-input');
var searchBtn = document.querySelector('#search-btn');

// Added event listner to search button; activates getWeather function
searchBtn.addEventListener('click', function() {
    var city = userInput.value;
    getWeather(city);
});

// getWeather function inputs city name into both current and 5day weather apis; inputs api values into html elements
function getWeather(city) {
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=7a9a82902161d2b14dc8da148668a60b&units=imperial';
    fetch(url).then(function(res) {
        return res.json();
    }).then(function(data) {
        console.log(data);
        document.querySelector('#city-name').innerText = data.name;
        document.querySelector('#temp').innerText = 'Temp: ' + data.main.temp + ' F';
        document.querySelector('#wind-speed').innerText = 'Wind: ' + data.wind.speed + ' MPH';
        document.querySelector('#humidity').innerText = 'Humidity: ' + data.main.humidity + '%';
    });
    var urlFiveDay = 'api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=7a9a82902161d2b14dc8da148668a60b&units=imperial';
    
}   