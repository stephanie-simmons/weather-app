
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
    lowElement.innerHTML = `${low}`;
    let lowDegrees = document.querySelector("#degrees-low");
    lowDegrees.innerHTML = "℃";

    let hi = Math.round(response.data.main.temp_max);
    let hiElement = document.querySelector("#hi");
    hiElement.innerHTML = `${hi}`;
    let highDegrees = document.querySelector("#degrees-high");
    highDegrees.innerHTML = "℃";

    let icon = response.data.weather[0].main;
    let iconElement = document.querySelector("#main-icon");
    iconElement.innerHTML = `${icon}`;
  }
  axios.get(`${apiURLCurrent}&appid=${apiKeyCurrent}`).then(showTemp);

  let apiURLForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&cnt=6`;
  function forecast(response) {
    console.log(response);

    let threeHour = document.querySelector("#three-hour");
    let threeHourTime = response.data.list[0].dt_txt.slice(10, 16);
    threeHour.innerHTML = `${threeHourTime}`;
    let threeHourTemp = document.querySelector("#three-hour-temp");
    let forecastThreeHour = response.data.list[0].main.temp;
    let threeHourRounded = Math.round(forecastThreeHour);
    threeHourTemp.innerHTML = `${threeHourRounded}℃`;

    let sixHour = document.querySelector("#six-hour");
    let sixHourTime = response.data.list[1].dt_txt.slice(10, 16);
    sixHour.innerHTML = `${sixHourTime}`;
    let sixHourTemp = document.querySelector("#six-hour-temp");
    let forecastSixHour = response.data.list[1].main.temp;
    let sixHourRounded = Math.round(forecastSixHour);
    sixHourTemp.innerHTML = `${sixHourRounded}℃`;

    let nineHour = document.querySelector("#nine-hour");
    let nineHourTime = response.data.list[2].dt_txt.slice(10, 16);
    nineHour.innerHTML = `${nineHourTime}`;
    let nineHourTemp = document.querySelector("#nine-hour-temp");
    let forecastNineHour = response.data.list[2].main.temp;
    let nineHourRounded = Math.round(forecastNineHour);
    nineHourTemp.innerHTML = `${nineHourRounded}℃`;

    let twelveHour = document.querySelector("#twelve-hour");
    let twelveHourTime = response.data.list[3].dt_txt.slice(10, 16);
    twelveHour.innerHTML = `${twelveHourTime}`;
    let twelveHourTemp = document.querySelector("#twelve-hour-temp");
    let forecastTwelveHour = response.data.list[3].main.temp;
    let twelveHourRounded = Math.round(forecastTwelveHour);
    twelveHourTemp.innerHTML = `${twelveHourRounded}℃`;

    let fifteenHour = document.querySelector("#fifteen-hour");
    let fifteenHourTime = response.data.list[4].dt_txt.slice(10, 16);
    fifteenHour.innerHTML = `${fifteenHourTime}`;
    let fifteenHourTemp = document.querySelector("#fifteen-hour-temp");
    let forecastFifteenHour = response.data.list[4].main.temp;
    let fifteenHourRounded = Math.round(forecastFifteenHour);
    fifteenHourTemp.innerHTML = `${fifteenHourRounded}℃`;

    let eighteenHour = document.querySelector("#eighteen-hour");
    let eighteenHourTime = response.data.list[5].dt_txt.slice(10, 16);
    eighteenHour.innerHTML = `${eighteenHourTime}`;
    let eighteenHourTemp = document.querySelector("#eighteen-hour-temp");
    let forecastEighteenHour = response.data.list[5].main.temp;
    let eighteenHourRounded = Math.round(forecastEighteenHour);
    eighteenHourTemp.innerHTML = `${eighteenHourRounded}℃`;
  }
  axios.get(`${apiURLForecast}&appid=${apiKeyCurrent}`).then(forecast);
}

function showCurrentWeather() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", showCurrentWeather);

showCurrentWeather();
