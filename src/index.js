alert("hello world");
let now = new Date();
console.log(now);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinute = now.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

let today = document.querySelector("#today");
today.innerHTML = `${currentDay} ${currentHour}:${currentMinute}`;

//function displayCity(event) {
//event.preventDefault();
//let searchInput = document.querySelector("#input-city");
//let h2 = document.querySelector("#search-location");
//if (searchInput.value) {
//h2.innerHTML = `${searchInput.value.trim()}`;
//}
//}

//let inputCity = document.querySelector("#input-form");
//inputCity.addEventListener("submit", displayCity);

function convertToFarenheit(event) {
  event.preventDefault();
  let cTemp = document.querySelector("#temp");
  let fTemp = (cTemp.innerHTML * 9) / 5 + 32;
  let fTempRounded = Math.round(fTemp);
  cTemp.innerHTML = `${fTempRounded}`;
}

let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", convertToFarenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let fTemp = document.querySelector("#temp");
  let cTemp = ((fTemp.innerHTML - 32) * 5) / 9;
  let cTempRounded = Math.round(cTemp);
  fTemp.innerHTML = `${cTempRounded}`;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", convertToCelsius);

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-city");
  let h2 = document.querySelector("#search-location");
  if (searchInput.value) {
    h2.innerHTML = `${searchInput.value.trim()}`;
    let apiKey = "796777830836263600aae1fb1caf567f";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric`;
    function showTemperature(response) {
      console.log(response);

      let temperature = Math.round(response.data.main.temp);
      let temperatureElement = document.querySelector("#temp");
      temperatureElement.innerHTML = `${temperature}`;

      let windSpeed = Math.round(response.data.wind.speed);
      let windSpeedElement = document.querySelector("#wind-speed");
      windSpeedElement.innerHTML = `Wind Speed: ${windSpeed}`;

      let humidity = Math.round(response.data.main.humidity);
      let humidityElement = document.querySelector("#humidity");
      humidityElement.innerHTML = `Humidity: ${humidity}%`;

      let low = Math.round(response.data.main.temp_min);
      let lowElement = document.querySelector("#low");
      lowElement.innerHTML = `${low}℃`;

      let hi = Math.round(response.data.main.temp_max);
      let hiElement = document.querySelector("#hi");
      hiElement.innerHTML = `${hi}℃`;

      let icon = response.data.weather[0].main;
      let iconElement = document.querySelector("#main-icon");
      iconElement.innerHTML = `${icon}`;
    }

    axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);
  }
}

let inputCity = document.querySelector("#input-form");
inputCity.addEventListener("submit", displayCity);

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKeyCurrent = "796777830836263600aae1fb1caf567f";
  let apiURLCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;

  function showTemp(response) {
    console.log(response);

    let currentCity = response.data.name;
    let city = document.querySelector("#search-location");
    city.innerHTML = `${currentCity}`;

    let temperature = Math.round(response.data.main.temp);
    let tempElement = document.querySelector("#temp");
    tempElement.innerHTML = `${temperature}`;

    let windSpeed = Math.round(response.data.wind.speed);
    let windSpeedElement = document.querySelector("#wind-speed");
    windSpeedElement.innerHTML = `Wind Speed: ${windSpeed}`;

    let humidity = Math.round(response.data.main.humidity);
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity: ${humidity}%`;

    let low = Math.round(response.data.main.temp_min);
    let lowElement = document.querySelector("#low");
    lowElement.innerHTML = `${low}℃`;

    let hi = Math.round(response.data.main.temp_max);
    let hiElement = document.querySelector("#hi");
    hiElement.innerHTML = `${hi}℃`;

    let icon = response.data.weather[0].main;
    let iconElement = document.querySelector("#main-icon");
    iconElement.innerHTML = `${icon}`;
  }
  axios.get(`${apiURLCurrent}&appid=${apiKeyCurrent}`).then(showTemp);
}

function showCurrentWeather() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", showCurrentWeather);

showCurrentWeather();
