let zipcode = document.querySelector("#zipcode");
const button = document.querySelector("#zipBtn");
let li1 = document.querySelector("#li1");
let li2 = document.querySelector("#li2");
let li3 = document.querySelector("#li3");
let li4 = document.querySelector("#li4");
let weatherIcon = document.querySelector("#weatherIcon");
let infoCard = document.querySelector("#infoCard");

const getWeatherData = async (zippy) => {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zippy},us&appid=10d8beea1817fae16684102120bc9863&units=imperial`);
    const formattedData = await data.json();
    console.log(formattedData);

    let weather = document.querySelector("#li1");
    weather.innerHTML = "Current weather: " + formattedData.weather[0].main;
    let temp = document.querySelector("#li2");
    temp.innerHTML = "Current temp: " + formattedData.main.temp;
    let windspeed = document.querySelector("#li3");
    windspeed.innerHTML = "Current windspeed: " + formattedData.wind.speed;
    let location = document.querySelector("#li4");
    location.innerHTML = "Location: " + formattedData.name;
    infoCard.classList.add("card");

    let getWeatherIcon = () => {
        let iconImg = document.createElement('img');
        let currentWeather = formattedData.weather[0].main;

        if (currentWeather == "Clouds") {
            iconImg.src = "Assets/wi-cloudy-gusts.svg";
        } else if (currentWeather == "Clear") {
            iconImg.src = "Assets/clearIcon.png";
        } else if (currentWeather == "Rain") {
            iconImg.src = "Assets/wi-showers.svg";
        } else if (currentWeather == "Mist") {
            iconImg.src = "Assets/wi-showers.svg";
        } else if (currentWeather == "Snow") {
            iconImg.src = "Assets/wi-snow.svg";
        } else {
            iconImg.src = "Assets/defaultIcon.png";
        }
        iconImg.id = 'iconIMG';
        weatherIcon.innerHTML = "";
        weatherIcon.appendChild(iconImg);
    };
    getWeatherIcon();
};

button.addEventListener("click", (event) => {
    event.preventDefault();
    getWeatherData(zipcode.value);
});
