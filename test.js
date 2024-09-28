// let zip = document.querySelector(“#zipcode”);
// let button = document.getElementById(“submit”)

// function weatherBalloon( zipCode ) {
//     const key = ‘46fbf048ea77cec3537a94244ec91020’;
//     fetch(‘https://api.openweathermap.org/data/2.5/weather?zip='+zipCode+‘&units=imperial’+‘&appid=’+key)
//     // .then( => response.json())
//     .then(function(resp) {
//         let formattedData = resp.json();
//         console.log(formattedData);
//         return formattedData})
//     .then(function(data) {
//             drawWeather(data);
// })
//     /*.catch(function(error) {
//         console.log(error)
//     });*/
// }
// button.addEventListener(“click”, (evt) => {
//     evt.preventDefault();
//     console.log(zip);
//     weatherBalloon(zip.value);
// })
// window.onload = function() {
//     weatherBalloon( 30016 );
// }
// function drawWeather(info) {
//     document.getElementByClassName(“description”).innerHTML = info.weather[0].description;
//     document.getElementsByClassName(“temp”).innerHTML = info.main.temp + “&deg;“;
//     document.getElementsByClassName(“city”).innerHTML = info.name;
// }


// const getWeatherBallon2 = async (zipcode) => {
//     let data = await fetch('https://api.openweathermap.org/data/2.5/weather?zip='+zipcode+'&units=imperial'+'&appid=46fbf048ea77cec3537a94244ec91020');
//     // console.log(data);
//     const formattedData = await data.json();
//     console.log(formattedData);


// }

// button.addEventListener("click", (evt) => {
//     evt.preventDefault();
//     console.log(zip.value);
//     getWeatherBallon2(zip.value);
// })


// const handleFunction = async () => {
//     try {
//         await whateverFunction();// make sure to await when you call your function here
//     } catch (e) {
//         console.error(e); //catching your error 
//     } finally {
//         console.log('Do stuff here');//handle yur error in this code block
//     }
// }