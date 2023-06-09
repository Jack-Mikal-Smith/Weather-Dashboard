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
            document.querySelector('#city-name').innerText = 'Currently in: ' + data.name;
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
            var card = document.createElement('row');           
            var date = document.createElement('h3');
            date.innerText = city + ' on: ' + data.list[i].dt_txt + ':';
            card.appendChild(date);
            var temp = document.createElement('p');
            temp.innerText = 'Temp: ' + data.list[i].main.temp;
            card.appendChild(temp);
            var windSpeed = document.createElement('p');
            windSpeed.innerText = 'Wind: ' + data.list[i].wind.speed;
            card.appendChild(windSpeed);
            var icon = document.createElement('img');
            icon.src = 'https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png';
            card.appendChild(icon);
            card.setAttribute('class', 'bg-info border-light border-2 rounded-2');
            fiveDayOutput.appendChild(card);
        }
    })
}   

// saveData function stores recently searched cities/ countires into local storage and calls the displayRecentSearches function
function saveData(city) {
    var recentSearches = JSON.parse(localStorage.getItem('Cities')) || [];
    if (city === '') {
        alert('Please review your input.')
        return;
    } else {
        recentSearches.push(city);
        localStorage.setItem('Cities', JSON.stringify(recentSearches));
        displayRecentSearches(recentSearches);
    }
}

// displayRecentSearches function grabs recently searched cities/ countries from local storag and adds them to the html as buttons. When click, buttons run the getWeather function.
function displayRecentSearches(recentSearches) {
    var searchesEl = document.querySelector('#recent-searches');
    searchesEl.innerHTML = '';
    for (i=0; i < recentSearches.length; i++) {
        var recentSearchContain = document.createElement('div');
        recentSearchContain.setAttribute('class', 'col')
        var recentSearchBtn = document.createElement('button');
        recentSearchBtn.setAttribute('class', 'btn btn-outline-info my-1');
        recentSearchBtn.innerText = recentSearches[i];
        recentSearchBtn.addEventListener('click', function(event) {
            getWeather(event.target.innerText);
        });
        recentSearchContain.appendChild(recentSearchBtn);
        searchesEl.appendChild(recentSearchContain);
    }
}

// displaying recent searches on start-up
var recentSearches = JSON.parse(localStorage.getItem('Cities')) || [];
displayRecentSearches(recentSearches);