const APIkey = "c26068a5b8175b7c5235a7dfdb972586";
const currentDate = dayjs().format("(MM/DD/YYYY)");
const dateToday = document.querySelector(".dateToday");
const cityName = document.querySelector(".card-title");
const currentTemp = document.querySelector(".temp");
const currentWind = document.querySelector(".wind_speed");
const currentHumidity = document.querySelector(".humidity");
dateToday.innerHTML = currentDate;
const searchBtn = document.querySelector("#searchBtn");
const cityHistory = [];

function getGeo(event) {
  event.preventDefault();
  const cityInput = document.getElementById("cityInput").value;
  console.log(cityInput);

  const requestGeoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=${APIkey}`;
  fetch(requestGeoUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const lat = data[0].lat;
      const lon = data[0].lon;
      console.log(lat, lon);
      getWeather(lat, lon);
    });
}

function getWeather(lat, lon) {
  const requestWeatherUrl =
    `https://api.openweathermap.org/data/3.0/onecall?lat=` +
    lat +
    `&lon=` +
    lon +
    `&exclude=minutely,hourly&units=imperial&appid=${APIkey}`;
  console.log(requestWeatherUrl);
  fetch(requestWeatherUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const currentDate = dayjs().format("(MM/DD/YYYY)");
      dateToday.innerHTML = currentDate;
      currentTemp.innerHTML = "Temp: " + data.current.temp;
      currentWind.innerHTML = "Wind: " + data.current.wind_speed;
      currentHumidity.innerHTML = "Humidity: " + data.current.humidity;
      getForcast(data.daily);
    });
}
function getForcast(data) {
  console.log("getForcast", data);
}
searchBtn.addEventListener("click", getGeo);
