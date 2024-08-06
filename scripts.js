let zipcode = document.querySelector("#zipcode");
const button = document.querySelector("#zipBtn");
let li1 = document.querySelector("#li1")
let li2 = document.getElementById("#li2")
let li3 = document.getElementById("#li3")
let li4 = document.getElementById("#li4")
let weatherIcon = document.querySelector("#weatherIcon");


const getWeatherData = async (zippy) => {
    const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zippy},us&appid=10d8beea1817fae16684102120bc9863&units=imperial`);
    //console.log(data);
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
    
    //add weatherIcon
    let getWeatherIcon = () => {
        

        let iconImg = document.createElement('img');
        let currentWeather = formattedData.weather[0].main;
        
        if (currentWeather == "Clouds"){
            iconImg.src = "Assets/wi-cloudy-gusts.svg";
            // weatherIcon.innerHTML = iconImg;
            weatherIcon.insertBefore(iconImg, weatherIcon.firstChild); // inserting new icon as the first item/child
            weatherIcon.removeChild(weatherIcon.children[1]); // removing second(previous) item/child 
        }else if (currentWeather == "Clear"){
            iconImg.src = "Assets/clearIcon.png";
            // weatherIcon.innerHTML = iconImg;
            // weatherIcon.appendChild(iconImg);
            weatherIcon.insertBefore(iconImg, weatherIcon.firstChild);
            weatherIcon.removeChild(weatherIcon.children[1]);
        }else if (currentWeather == "Rain"){
            iconImg.src = "Assets/wi-showers.svg";
            // weatherIcon.innerHTML = iconImg;
            // weatherIcon.appendChild(iconImg);
            weatherIcon.insertBefore(iconImg, weatherIcon.firstChild);
            weatherIcon.removeChild(weatherIcon.children[1]);
        }else if (currentWeather == "Mist"){
            iconImg.src = "Assets/wi-showers.svg";
            // weatherIcon.innerHTML = iconImg;
            // weatherIcon.appendChild(iconImg);
            weatherIcon.insertBefore(iconImg, weatherIcon.firstChild);
            weatherIcon.removeChild(weatherIcon.children[1]);
        }else if (currentWeather == "Snow"){
            iconImg.src = "Assets/wi-snow.svg";
            // weatherIcon.innerHTML = iconImg;
            // weatherIcon.appendChild(iconImg);
            weatherIcon.insertBefore(iconImg, weatherIcon.firstChild);
            weatherIcon.removeChild(weatherIcon.children[1]);
        }
    };

    getWeatherIcon();
};

button.addEventListener("click", e => {
    e.preventDefault()
    getWeatherData(zipcode.value);
    
});


