const searchBtn = document.querySelector(".search");
const locationBtn = document.querySelector(".location_btn");
const inputValue = document.querySelector(".city_name");
const weatherDataFirst = document.querySelector(".weather_data_first");
let dropDownList = document.querySelector("#cities");
const citiesList = document.querySelector(".dropdown_list");
let weatherData = document.querySelector(".weather_data");


// API key to fetch api
const API_KEY = `ee776f55501df664931d5a5629d4ef09`;


// function to display current day weather details 

function firstweatherCard(fiveDaysForecast ,data){
    return `   <li class="current_day p-7 text-lg">
            <h1 class="text-white">${data.city.name} (${fiveDaysForecast.dt_txt.split(" ")[0]})</h1>
            
            <h2 class="text-white">Temp: ${fiveDaysForecast.main.temp}C</h2>
            <h2 class="text-white">Wind: ${fiveDaysForecast.wind.speed}m/s</h2>
            <h2 class="text-white">Humidity:${fiveDaysForecast.main.humidity}%</h2>
          </li>
           <li class=" p-7 flex flex-col justify-center items-center mb-2">
            <img src="https://openweathermap.org/img/wn/${fiveDaysForecast.weather[0].icon}@2x.png" , alt="weather_icon" />
            <h2 class="text-white ">${fiveDaysForecast.weather[0].description}</h2>
          </li>`;
}

//  function to display five days weather details

function weatherCard(weatherItem) {
  return `<li class="card rounded-lg p-4 w-52 text-white font-sans">
              <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
              <img src="https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png" class="h-3 w-3" , alt="weather_icon">
           
              <h2>${weatherItem.weather[0].description}</h2>
              
              <h4>Temp: ${weatherItem.main.temp}C</h4>
              <h4>Wind: ${weatherItem.wind.speed}m/s</h4>
              <h4>Humidity:${weatherItem.main.humidity}%</h4>
            </li>`;
}

// function to get the weather  details from the server using latitude and longitude 

function getWeatherDetails(name, lat, lon) {

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  fetch(url)
    .then((response) => response.json())
    .then((data)=>{  
      console.log(data);
       const uniqueforecastDays = [];
      const fiveDaysForecast = data.list.filter((forecast) => {
        const forecastDate = new Date(forecast.dt_txt).getDate();
        if (!uniqueforecastDays.includes(forecastDate)) {
          uniqueforecastDays.push(forecastDate);
          return true;
        }
        return false;
      });

      localStorage.setItem("everyData",JSON.stringify(data));  
      localStorage.setItem("storedData",JSON.stringify(fiveDaysForecast));     
          
      weatherData.innerHTML = "";
      let savedWeatherData = JSON.parse(localStorage.getItem("storedData"));
      savedWeatherData.forEach( (weatherItem)=> {
        
        
        weatherData.insertAdjacentHTML("beforeend",weatherCard(weatherItem)
        );
        
        
      });
      
      weatherDataFirst.innerHTML="";
      weatherDataFirst.insertAdjacentHTML("beforeend",firstweatherCard(savedWeatherData[0],data));



      
    
      
    })

    

    .catch((err) =>{console.log(err)});
}




// function to get the details of longitude and latitude by search the city name 


function getCity() {
  dropDown();
  const cityName = inputValue.value.trim();
  if (!cityName) return;
  

  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      
      
      if (data.length == 0) return alert(`no cordinates found for ${cityName}`);

      const { name, lat, lon } = data[0];
      getWeatherDetails(name, lat, lon);
      
      
      
      
      
    })
    .catch((error) => console.log(error));


    
    
}


// function to get current location
const getCurrentLocation = ()=>{
navigator.geolocation.getCurrentPosition(
  position=>{
    console.log(position)
    const {name,latitude,longitude} = position.coords;
    getWeatherDetails(name,latitude,longitude);
    
  },
  error=> 
  {
    console.log("Cannot access Your location!")
  }
);
}

dropDownList.innerHTML ="";         
function dropDown(){
  
    const savedcityData = JSON.parse(localStorage.getItem("everyData"));
    return `<option class="dropdown_list text-black" value="Helllo">${savedcityData.city.name}</option>`
  
}
dropDownList.insertAdjacentHTML("beforeend",dropDown)
            
            
    
  




// add the event listener to the search button 

searchBtn.addEventListener("click", getCity);


locationBtn.addEventListener("click", getCurrentLocation);
// dropDownList.addEventListener("click",dropDown);
  


// add the event listener to the document 

