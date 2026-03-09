var weatherdata ;
async function weather() {
    const apiKey = 'bad6cfc061caa9295004653e8d6612a0';  // Replace with your OpenWeather API key
    const city = 'bewar';  // Replace with the city name
    
    // Fetch weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      .then(response => response.json())
      .then(data => {
          console.log(data);
          updateweather(data); // Check the response data
          
           // Call a function to update your app's UI
      })
      .catch(error => console.error('Error fetching weather data:', error));
}
weather()

function updateweather(data) {
    function convertTime(unixTime, timezone) {
        let date = new Date((unixTime + timezone) * 1000);
        let hours = date.getUTCHours().toString().padStart(2, '0');
        let minutes = date.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    // Populate weather data
    document.getElementById('temp').innerText = data.main.temp.toFixed(1);
    document.getElementById('feels-like').innerText = data.main.feels_like.toFixed(1);
    document.getElementById('temp_min').innerText = data.main.temp_min.toFixed(1);
    document.getElementById('temp_max').innerText = data.main.temp_max.toFixed(1);
    document.getElementById('humidity').innerText = data.main.humidity;
    document.getElementById('pressure').innerText = data.main.pressure;
    document.getElementById('sea_level').innerText = data.main.sea_level;
    document.getElementById('grnd_level').innerText = data.main.grnd_level;
    document.getElementById('wind_speed').innerText = data.wind.speed;
    document.getElementById('wind_deg').innerText = data.wind.deg;
    document.getElementById('wind_gust').innerText = data.wind.gust;
    document.getElementById('cloudiness').innerText = data.clouds.all;
    document.getElementById('visibility').innerText = (data.visibility / 1000).toFixed(1);
    
    document.getElementById('city-name').innerText = data.name;
    document.getElementById('date').innerText = new Date().toLocaleDateString();
    
    // Convert and display sunrise/sunset
    document.getElementById('sunrise').innerText = convertTime(data.sys.sunrise, data.timezone);
    document.getElementById('sunset').innerText = convertTime(data.sys.sunset, data.timezone);
    
    // Set weather description and icon
    document.getElementById('description').innerText = `Conditions: ${data.weather[0].description}`;
    document.getElementById('weather-icon').src = `https://rodrigokamada.github.io/openweathermap/images/${data.weather[0].icon}_t@4x.png`;

}

function convertUnixTime(unixTime, timezone) {
    const date = new Date((unixTime + timezone) * 1000);
    return date.toUTCString().match(/(\d{2}:\d{2})/)[0];
}
function fahrenheitToCelsius(fahrenheit) {
    return ((fahrenheit - 32) * 5 / 9).toFixed(2); // Round to 2 decimal places
}

async function rail() {
    const url = 'https://thingproxy.freeboard.io/fetch/https://www.railmitra.com/stations/farrukhabad-fbd-railway-station';

    // Fetch the HTML content using the proxy
    fetch(url)
      .then(response => response.text()) // Convert the response to text (HTML)
      .then(html => {
          // Now you have the HTML content of the page
          console.log(html); // Do something with the HTML content
      })
      .catch(error => console.error('Error fetching the page:', error));
    

}
rail()