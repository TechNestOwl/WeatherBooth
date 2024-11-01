let zipcode = document.querySelector("#zipcode");
const button = document.querySelector("#zipBtn");
let li1 = document.querySelector("#li1")
let li2 = document.getElementById("#li2")
let li3 = document.getElementById("#li3")
let li4 = document.getElementById("#li4")
let weatherIcon = document.querySelector("#weatherIcon");
let infoCard = document.querySelector("#infoCard");


const getWeatherData = async (zippy) => {
    const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zippy},us&appid=10d8beea1817fae16684102120bc9863&units=imperial`
    );
    const formattedData = await data.json();

    document.querySelector("#li1").innerHTML = "Weather: " + formattedData.weather[0].main;
    document.querySelector("#li2").innerHTML = "Temperature: " + formattedData.main.temp + " °F";
    document.querySelector("#li3").innerHTML = "Windspeed: " + formattedData.wind.speed + " mph";
    document.querySelector("#li4").innerHTML = "Location: " + formattedData.name;
    document.querySelector("#li5").innerHTML = "Feels like: " + formattedData.main.feels_like + " °F";
    document.querySelector("#li6").innerHTML = "Humidity: " + formattedData.main.humidity + " %";
    document.querySelector("#li7").innerHTML = "Pressure: " + formattedData.main.pressure + " hPa";
    document.querySelector("#li8").innerHTML = "Visibility: " + (formattedData.visibility / 1000) + " km";

    infoCard.classList.add("card");

    let getWeatherIcon = () => {
        let iconImg = document.createElement('img');
        let currentWeather = formattedData.weather[0].main;
        
        if (currentWeather == "Clouds") {
            iconImg.src = "Assets/wi-cloudy-gusts.svg";
        } else if (currentWeather == "Clear") {
            iconImg.src = "Assets/clearIcon.png";
        } else if (currentWeather == "Rain" || currentWeather == "Mist") {
            iconImg.src = "Assets/wi-showers.svg";
        } else if (currentWeather == "Snow") {
            iconImg.src = "Assets/wi-snow.svg";
        }
        weatherIcon.innerHTML = ''; // Clear existing icon
        weatherIcon.appendChild(iconImg); // Append the new icon
    };

    getWeatherIcon();
};


button.addEventListener("click", e => {
    e.preventDefault()
    getWeatherData(zipcode.value);
    
});
