document.getElementById('locationForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const location = document.getElementById('locationInput').value;
  getWeather(location);
});

function getWeather(location) {
  const apiKey = '8b7cab1863ae4b3d83f185637231109';
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=10&aqi=no&alerts=no`;

  fetch(url)
      .then(response => response.json())
      .then(data => {
          displayWeather(data);
          changeBackground(data);
      })
      .catch(error => {
          console.error('Error fetching the weather data', error);
      });
}

function displayWeather(data) {
  const weatherInfo = document.getElementById('weatherInfo');
  weatherInfo.innerHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <p>Current Time/Date: ${data.current.last_updated}</p>
      <p>Current Temperature: ${data.current.temp_c}°C</p>
      <hr class="hr2">
      <div class="forecast">
          ${data.forecast.forecastday.map(day => `
              <div class="forecast-day">
                  <h3>${new Date(day.date).toDateString()}</h3>
                  <p>Condition: ${day.day.condition.text}</p>
                  <p class="red">Max Temp: ${day.day.maxtemp_c}°C</p>
                  <p class="blue">Min Temp: ${day.day.mintemp_c}°C</p>
                  <hr class="hr2">
              </div>
          `).join('')}
      </div>
  `;
}

function changeBackground(data) {
  const currentTime = new Date(data.location.localtime);
  const hours = currentTime.getHours();

  if (hours >= 6 && hours < 18) {
    document.body.style.backgroundImage = "/foto/sunny-day-minimal-mountains.jpg";
  } else {
    document.body.style.backgroundImage = "/foto/wallpapersden.com_desert-nights-moon-5k-minimalism_5120x2880.jpg";
      
  }
}
