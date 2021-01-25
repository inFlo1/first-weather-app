function formatDate(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}
let ampm = hours >= 12 ? 'AM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
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
return `${day} ${hours}:${minutes}${ampm}`;
}

function displayTemperature(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let hilowElement = document.querySelector('#hi-low');
  hilowElement.innerHTML = `${Math.round(response.data.main.temp_min)}°C / ${Math.round(response.data.main.temp_max)}°C`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;

  let feelsLikeElement = document.querySelector("#feelsLike");
  feelsLikeElement.innerHTML = `${Math.round(response.data.main.feels_like)} °C`;

  let dayTimeElement = document.querySelector("#dayTime");
  dayTimeElement.innerHTML = formatDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#weatherIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let apiKey = "1625e5f34c173c9d54e03c86cc8cbf1a";
let city = "Chicago";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);