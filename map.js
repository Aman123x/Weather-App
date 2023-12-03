
function initializeMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

initializeMap();

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  updateMapIframe(latitude, longitude);
  fetchWeatherData(latitude, longitude);
}

function updateMapIframe(latitude, longitude) {
  const lat = document.getElementById("locat1");
  const lon = document.getElementById("locat2");

  lat.innerHTML = `<p>Latitude : ${latitude}</p>`;
  lon.innerHTML = `<p>Longitude : ${longitude}</p>`;

  const iframe = document.getElementById("map");

  iframe.src = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;
}

async function fetchWeatherData(lat, lon) {
  const bottomDown = document.getElementById("bottom-down");

  const apiKey = "acfdf7c3cfd41c872af8d62c1883e965";

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

  // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch weather data. Status: ${response.status}`
      );
    }
    const data = await response.json();

    // console.log(data);
    // console.log(data.name);
    // console.log(data.wind.speed);
    // console.log(data.main.humidity);
    // console.log(data.timezone);
    // console.log(data.main.pressure);
    // console.log(data.wind.deg);
    // console.log(500);
    // console.log(data.main.feels_like);

    const windDirectionDegrees = data.wind.deg;

    function getCardinalDirection(degrees) {
      const directions = [
        "North",
        "North-East",
        "East",
        "South-East",
        "South",
        "South-West",
        "West",
        "North-West",
      ];
      const index = Math.round(degrees / 45) % 8;
      return directions[index];
    }

    const windDirectionCardinal = getCardinalDirection(windDirectionDegrees);

    // Given feels_like temperature in Kelvin
    const feelsLikeKelvin = data.main.feels_like;

    // Convert Kelvin to Celsius
    const feelsLikeCelsius = feelsLikeKelvin - 273.15;

    const windSpeedKMH = data.wind.speed * 3.6;
    const pressure = data.main.pressure / 1013.25;

    bottomDown.innerHTML = `
        <div class="btn-cls">
            <button class="btn">Location: ${data.name}</button>
            <button class="btn">Wind Speed: ${windSpeedKMH.toFixed(
              2
            )} km/h </button>
            <button class="btn">Humidity : ${data.main.humidity}</button>
        </div>
        <div class="btn-cls">
        <button class="btn">Time Zone : GMT +5:30</button>
            <button class="btn">Pressure: ${pressure.toFixed(2)} atm</button>
            <button class="btn">Wind Direction: ${windDirectionCardinal}</button>
        </div>
        <div class="btn-cls">
            <button class="btn">UV Index : 500</button>
            <button class="btn">Feels like: ${feelsLikeCelsius.toFixed(
              2
            )}°C</button>
        </div>
        `;
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
  }
}
