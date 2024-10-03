const searchQuery = document.querySelector(".app .nav input");
const API_KEY = "105faba5ea39a0af2ade361f5e31ecab";
const searchButton = document.querySelector(".app .nav button");
let searchString = '';
let cityName = '';
const images = [
    {weatherDis:"haze",img:"Assets/mist.png"},
    {weatherDis:"",img:""},
    {weatherDis:"",img:""},
    {weatherDis:"",img:""},
    {weatherDis:"",img:""},
    {weatherDis:"",img:""},
]

function search(){
    searchString = `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery.value}&APPID=${API_KEY}`;
    cityName = searchQuery.value
}

function handleSearch(event){
    if(event.type === 'keydown'){
        if(event.key === 'Enter'){
            search();
            fetchingData();
        }
    }
    else if(event.type === 'click'){
        search();
        fetchingData();
    }
}

searchButton.addEventListener('click',handleSearch);
searchQuery.addEventListener('keydown',handleSearch);

function fetchingData(){
    fetch(searchString)
        .then(response => {
            if (!response.ok) {
                alert("Invalid Name Or Network Response Error!")
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Parse the response as JSON
        })
        .then(data => {
            console.log(data);
            document.querySelector('.weather').innerHTML = `<div class="top">
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
            <p class="temp">${String(parseInt(data.main.temp_max) - 273)}&deg;C</p>   
            <p class="city">${data.name}</p>   
            </div>
            <div class="bottom">
            <div class="col" id="1">
                <img src="Assets/humidity.png" alt="">
                <div>
                    <p class="humidity">${data.main.humidity}%</p>
                    <p>Humidity</p>
                </div>
            </div>
            <div class="col" id="2">
                <img src="Assets/wind.png" alt="">
                <div>
                    <p class="wind">${parseInt(data.wind.speed * (18/5))} KMPH</p>
                    <p>Wind Speed</p>
                </div>
            </div>
            </div>`
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}