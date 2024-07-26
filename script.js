const searchBtn = document.querySelector(".search");
const inputValue = document.querySelector(".city_name");
const weatherData = document.querySelector(".weather_data");
const weatherDataFirst = document.querySelector(".weather_data_first");
const API_KEY = `ee776f55501df664931d5a5629d4ef09`;

function firstweatherCard(fiveDaysForecast ,data){
    return `   <li class="current_day p-7 text-lg">
            <h1 class="text-white">${data.city.name} (${fiveDaysForecast.dt_txt.split(" ")[0]})</h1>
            <h2 class="text-white">Temp: ${fiveDaysForecast.main.temp}C</h2>
            <h2 class="text-white">Wind: ${fiveDaysForecast.wind.speed}m/s</h2>
            <h2 class="text-white">Humidity:${fiveDaysForecast.main.humidity}%</h2>
          </li>
           <li>
            <img src="https://openweathermap.org/img/wn/${fiveDaysForecast.weather[0].icon}@2x.png" , alt="weather_icon" alt="" />
          </li>`;
}

function weatherCard(weatherItem) {
  return `<li class="card rounded-lg flex flex-col justify-center w-52 p-6 h-64">
              <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
              <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" class="h-3 w-3" , alt="weather_icon">
              <h4>Temp: ${weatherItem.main.temp}C</h4>
              <h4>Wind: ${weatherItem.wind.speed}m/s</h4>
              <h4>Humidity:${weatherItem.main.humidity}%</h4>
            </li>`;
}

function getWeatherDetails(name, lat, lon) {

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const uniqueforecastDays = [];
      const fiveDaysForecast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueforecastDays.includes(forecastDate)) {
          return uniqueforecastDays.push(forecastDate);
        }
      });
      
      inputValue.value = "";
      weatherData.innerHTML = "";
      fiveDaysForecast.forEach((weatherItem) => {
        weatherData.insertAdjacentHTML(
          "beforeend",
          weatherCard(weatherItem)
        );
        
        
      });
      weatherDataFirst.innerHTML="";
      weatherDataFirst.insertAdjacentHTML("beforeend",firstweatherCard(fiveDaysForecast[0],data));
    })
    .catch((err) =>{console.log(err)});
}

function getCity() {
  const cityName = inputValue.value.trim();
  if (!cityName) return;
  console.log(cityName);

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.length == 0) return alert(`no cordinates found for ${cityName}`);

      const { name, lat, lon } = data[0];
      getWeatherDetails(name, lat, lon);
      
    })
    .catch((error) => console.log(error));
}

searchBtn.addEventListener("click", getCity);
