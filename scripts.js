let zipcode = document.querySelector("#zipcode");
const button = document.querySelector("#zipBtn");
let li1 = document.querySelector("#li1")
let li2 = document.getElementById("#li2")
let li3 = document.getElementById("#li3")
let li4 = document.getElementById("#li4")

const getWeatherData = async (zippy) => {
    const data = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?zip=${zippy},us&appid=10d8beea1817fae16684102120bc9863&units=imperial`);
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


};


zipBtn.addEventListener("click", function(evt) {
    evt.preventDefault()
    getWeatherData(zipcode.value);
});