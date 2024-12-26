const apiKey = "eb5c04a7c49798baafd2fdedc94ac046"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric"

async function checkWeather(city){
    const response = await fetch(apiUrl + `&appid=${apiKey}&q=${city}`); 
    var data = await response.json();
    console.log(data)

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".feels").innerHTML = `Feels like ${Math.round(data.main.feels_like)}°C`;
    document.querySelector(".pressure").innerHTML = `${data.main.pressure} hPa`;
    document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;

    const weatherMain = data.weather[0].main;
    const icon = getWeatherIcon(weatherMain);
    document.querySelector(".weather-icon").src = icon;

}

function getWeatherIcon(condition){
    const iconOptions = {
        Clouds: "images/cloud.png",
        Clear: "images/sun.png",
        Rain: "images/rain.png",
        Snow: "images/snowflake.png",
        Thunderstorm: "images/thunder.png"
        };
    return iconOptions[condition] || "images/sky.png"
}

document.getElementById("search-button").addEventListener("click", () => {
    const city = document.getElementById("search-input").value;
    if (city.trim() !== "") {
        checkWeather(city);  
    }
});