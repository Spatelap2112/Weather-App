const apiKey = "180184d5eaebf925fdd898cf551e0b14";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  console.log("API Key notification", response);
  let data = await response.json();
  console.log("data", data);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    // replaced with switch case
    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "images/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "images/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "images/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "images/mist.png";
        break;
      case "Snow":
        weatherIcon.src = "images/snow.png";
        break;
      default:
        // Default action if none of the cases match
        break;
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
  }
  //var data = await response.json();
}

searchBtn.addEventListener("click", () => {
  console.log(searchBox.value, searchBox.value.length, "Name of the city");
  if (searchBox.value.length < 3) {
    window.alert("City name much be at least 3 characters long.");
    searchBox.classList.add("error-input");
  }
  if (searchBox.value.length > 3) {
    checkWeather(searchBox.value);
  }
});
