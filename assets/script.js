// Declaring user input DOM elements as variables
var userInput = document.querySelector('#user-input');
var searchBtn = document.querySelector('#search-btn');
var fiveDayOutput = document.querySelector('#five-day');

// Added event listner to search button; activates getWeather function
searchBtn.addEventListener('click', function() {
    var city = userInput.value;
    getWeather(city);
    saveData(city);
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
    var urlFiveDay = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=7a9a82902161d2b14dc8da148668a60b&units=imperial';
    fetch(urlFiveDay).then(function(res) {
        return res.json();
    }).then(function(data) {
        console.log(data);
        fiveDayOutput.innerText = '';
        for (i = 7; i < data.list.length; i = i+8) {
            console.log(data.list[i]);
            var date = document.createElement('h3');
            date.innerText = data.list[i].dt_txt;
            fiveDayOutput.appendChild(date);
            var temp = document.createElement('p');
            temp.innerText = data.list[i].main.temp;
            fiveDayOutput.appendChild(temp);
            var windSpeed = document.createElement('p');
            windSpeed.innerText = data.list[i].wind.speed;
            fiveDayOutput.appendChild(windSpeed);
            var icon = document.createElement('img');
            icon.src = 'https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png';
            fiveDayOutput.append(icon);
        }
    })
}   

// saveData function stores recently searched cities/ countires into local storage and calls the displayRecentSearches function
function saveData(city) {
    var recentSearches = JSON.parse(localStorage.getItem('Cities')) || [];
    recentSearches.push(city);
    localStorage.setItem('Cities', JSON.stringify(recentSearches));
    displayRecentSearches(recentSearches);
}

// displayRecentSearches function grabs recently searched cities/ countries from local storag and adds them to the html as buttons. When click, buttons run the getWeather function.
function displayRecentSearches(recentSearches) {
    var searchesEl = document.querySelector('#recent-searches');
    searchesEl.innerHTML = '';
    for (i=0; i < recentSearches.length; i++) {
        var recentSearchBtn = document.createElement('button');
        recentSearchBtn.innerText = recentSearches[i];
        recentSearchBtn.addEventListener('click', function(event) {
            getWeather(event.target.innerText);
        });
        searchesEl.appendChild(recentSearchBtn);
    }
}

// displaying recent searches on start-up
var recentSearches = JSON.parse(localStorage.getItem('Cities')) || [];
displayRecentSearches(recentSearches);