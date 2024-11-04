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

// Background animations

function updateBackground(weatherCondition) {
    const background = document.getElementById("weatherBackground");
    background.innerHTML = ''; // Clear previous elements

    if (weatherCondition === "Clear") {
        const sun = document.createElement("div");
        sun.classList.add("sun");
        background.appendChild(sun);
    } else if (weatherCondition === "Clouds") {
        for (let i = 0; i < 3; i++) {
            const cloud = document.createElement("div");
            cloud.classList.add("cloud");
            cloud.style.top = `${20 + i * 20}%`;
            cloud.style.left = `${i * 50}px`;
            background.appendChild(cloud);
        }
    } else if (weatherCondition === "Rain") {
        for (let i = 0; i < 50; i++) {
            const raindrop = document.createElement("div");
            raindrop.classList.add("raindrop");
            raindrop.style.left = `${Math.random() * 100}vw`;
            raindrop.style.animationDelay = `${Math.random() * 1.5}s`;
            background.appendChild(raindrop);
        }
    } else if (weatherCondition === "Snow") {
        for (let i = 0; i < 50; i++) {
            const snowflake = document.createElement("div");
            snowflake.classList.add("snowflake");
            snowflake.style.left = `${Math.random() * 100}vw`;
            snowflake.style.animationDelay = `${Math.random() * 3}s`;
            background.appendChild(snowflake);
        }
    }
}

// Example usage:
// Call updateBackground(formattedData.weather[0].main) after getting data from API

