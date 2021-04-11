function displayWeather(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-city");
  if (searchInput.value) {
    let apiKey = "796777830836263600aae1fb1caf567f";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;

    function showTemperature(response) {
      console.log(response);

      function formatSearchDate(timestamp) {
        let searchDate = new Date(timestamp);

        let days = [
         "Sunday",
         "Monday",
         "Tuesday",
         "Wednesday",
         "Thursday",
         "Friday",
         "Saturday"
        ];

        let day = days[searchDate.getDay()];
        let hours = searchDate.getHours();
           if (hours < 10) {
             hours = `0${hours}`;
           }
        let minutes = searchDate.getMinutes();
           if (minutes < 10) {
        minutes = `0${minutes}`;
        }
  
       return `${day} ${hours}:${minutes}`;
      }

      let h2 = document.querySelector("#search-location");
      let place = response.data.name;
      h2.innerHTML = `${place}`;

      let searchDateElement = document.querySelector("#today");
      searchDateElement.innerHTML = formatSearchDate(response.data.dt * 1000);

      celsiusTemperature = Math.round(response.data.main.temp);
      let temperature = (celsiusTemperature);
      let temperatureElement = document.querySelector("#temp");
      temperatureElement.innerHTML = `${temperature}`;

      let windSpeed = Math.round(response.data.wind.speed);
      let windSpeedElement = document.querySelector("#wind-speed");
      windSpeedElement.innerHTML = `Wind Speed: ${windSpeed}`;

      let humidity = Math.round(response.data.main.humidity);
      let humidityElement = document.querySelector("#humidity");
      humidityElement.innerHTML = `Humidity: ${humidity}%`;

      let iconElement = document.querySelector("#main-icon");
      let icon = response.data.weather[0].icon;
      let iconAlt = response.data.weather[0].main;
      iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
      iconElement.setAttribute("alt", `${iconAlt}`);

      function convertToFarenheit(event) {
       event.preventDefault();
       let temp = document.querySelector("#temp");
       let fTemp = (celsiusTemperature * 9) / 5 + 32;
       let fTempRounded = Math.round(fTemp);
       temp.innerHTML = `${fTempRounded}`;
       document.getElementById("celsius").style.color="blue";
       document.getElementById("farenheit").style.color="#000014";
      }

      let farenheit = document.querySelector("#farenheit");
      farenheit.addEventListener("click", convertToFarenheit);

      function convertToCelsius(event) {
      event.preventDefault();
      let temp = document.querySelector("#temp");
      temp.innerHTML = Math.round(celsiusTemperature);
      document.getElementById("farenheit").style.color="blue";
      document.getElementById("celsius").style.color="#000014";
      }

      let celsius = document.querySelector("#celsius");
      celsius.addEventListener("click", convertToCelsius);
    }

    axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
  }
}

let inputCity = document.querySelector("#input-form");
inputCity.addEventListener("submit", displayWeather);

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKeyCurrent = "796777830836263600aae1fb1caf567f";
  let apiURLCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;

  function showTemp(response) {
    console.log(response);
    function formatDate(timestamp) {
    let date = new Date(timestamp);

      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];

      let day = days[date.getDay()];
      let hours = date.getHours();
      if (hours < 10) {
        hours = `0${hours}`;
      }
      let minutes = date.getMinutes();
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
  
      return `${day} ${hours}:${minutes}`;
    }

    let dateElement = document.querySelector("#today");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    let currentCity = response.data.name;
    let city = document.querySelector("#search-location");
    city.innerHTML = `${currentCity}`;

    let temperature = Math.round(response.data.main.temp);
    let tempElement = document.querySelector("#temp");
    tempElement.innerHTML = `${temperature}`;

    let description = document.querySelector("#description");
    description.innerHTML = response.data.weather[0].description;

    let windSpeed = Math.round(response.data.wind.speed);
    let windSpeedElement = document.querySelector("#wind-speed");
    windSpeedElement.innerHTML = `Wind Speed: ${windSpeed} Km/H`;

    let humidity = Math.round(response.data.main.humidity);
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity: ${humidity}%`;

    let iconElement = document.querySelector("#main-icon");
    let icon = response.data.weather[0].icon;
    let iconAlt = response.data.weather[0].main;
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
    iconElement.setAttribute("alt", `${iconAlt}`);

    function convertToFarenheit(event) {
       event.preventDefault();
       let temp = document.querySelector("#temp");
       let fTemp = (temperature * 9) / 5 + 32;
       let fTempRounded = Math.round(fTemp);
       temp.innerHTML = `${fTempRounded}`;
       document.getElementById("celsius").style.color="blue";
       document.getElementById("farenheit").style.color="#000014";
      }

      let farenheit = document.querySelector("#farenheit");
      farenheit.addEventListener("click", convertToFarenheit);

      function convertToCelsius(event) {
      event.preventDefault();
      let temp = document.querySelector("#temp");
      temp.innerHTML = Math.round(temperature);
      document.getElementById("farenheit").style.color="blue";
      document.getElementById("celsius").style.color="#000014";
      }

      let celsius = document.querySelector("#celsius");
      celsius.addEventListener("click", convertToCelsius);

      displayForecast();
  }

  axios.get(`${apiURLCurrent}&appid=${apiKeyCurrent}`).then(showTemp);

}

function showCurrentWeather() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", showCurrentWeather);

let celsiusTemperature = null;

showCurrentWeather();
