const apiKey = "eddd97b4888f68d37efd1190dd84b5a8";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const searchError = document.querySelector(".searchError");
const invalidError = document.querySelector(".invalidError");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  //Checks if the city entered is invalid
  if (response.status == 404) {
    document.querySelector(".invalidError").style.display = "block";
    document.querySelector(".searchError").style.display = "none";
    document.querySelector(".weather").style.display = "none";
  }
  //Checks if user clicked search without entering a city name
  else if (response.status == 400) {
    document.querySelector(".invalidError").style.display = "none";
    document.querySelector(".searchError").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
  //If the user enters a proper city name then it produces the weather conditions
  else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

    //Based on the city's weather type, below if conditions update the weather icon
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.jpg";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Snow") {
      weatherIcon.src = "images/snow.png";
    }

    //Hides the errors and displays only the weather info
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".invalidError").style.display = "none";
    document.querySelector(".searchError").style.display = "none";
  }
}

//This helps in activating the search button by the click action
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});
