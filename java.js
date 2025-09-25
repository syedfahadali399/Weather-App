let form = document.getElementById("form")
let getCity = document.getElementById("get-city")
let showCity = document.getElementById("show-city")
let showTemp = document.getElementById("show-temprature")
let showWeatherType = document.getElementById("show-weather-type")
let showError = document.getElementById("show-error")
let showfeels = document.getElementById("show-feels")
let showHumidity = document.getElementById("show-humidity")
let showPressure = document.getElementById("show-pressure")

let api_key = "419d98cc643f298cf99cec86f31cb40c"

function showDetail(city, temprature, weathertype, weatherfeel, humidity, pressure) {

    showCity.textContent = `Weather in ${city} is:`
    showTemp.textContent = `Temprature: ${temprature}°C`
    showWeatherType.textContent = `Weather: ${weathertype}`;
    showfeels.textContent = `Feels Like: ${weatherfeel}°C`
    showHumidity.textContent = `Humadity: ${humidity}%`
    showPressure.textContent = `Pressure: ${pressure} Pa`

}

async function getWeather(city) {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
    .then((response) => {
        if(!response.ok) {
            showError.style.display = "flex"
            showError.style.alignItems = "center"
            showError.style.justifyContent = "center"
            showError.textContent = "City not found"
            document.querySelectorAll('p').forEach((e) => {
                e.style.display = "none"
            })
        } else {
            showError.style.display = "none"
            document.querySelectorAll('p').forEach((e) => {
                e.style.display = "flex"
            })

        }
        return response.json()
    })
    .then((data) => {

        showDetail(
            data.name, 
            data.main.temp, 
            data.weather[0].description,
            data.main.feels_like,
            data.main.humidity,
            data.main.pressure
        )
    })
    .catch((error) => {
        console.error("Error fetching data", error)
    })
}

window.onload = () => {
    getWeather("karachi")
}

form.addEventListener("submit", function(e) {
    e.preventDefault()

    let convert = String(getCity.value)
    if (!convert.trim()) return;
    getWeather(convert)

})