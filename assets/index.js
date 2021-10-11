const id = "8a59485fc0098295507e55078609bfee";
const country = ""
// const country = "Semarang";
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${id}`;

const city = document.getElementById("city");
const cloud = document.getElementById("cloud");
const temp = document.getElementById("temp");
const windSpeed = document.getElementById("windSpeed");

console.log(BASE_URL);

fetch(BASE_URL)
	.then((response) => {
		return response.json();
	})
	.then((data) => {
		console.log(data);
        city.innerHTML = data.name
        cloud.innerHTML = data.weather[0].description
        temp.innerHTML = Math.round(data.main.temp - 273.15) + " &#8451"
        windSpeed.innerHTML = data.wind.speed + " m/s"
	})
	.catch((err) => {
		console.log(err + "error");
	});

// console.log(fetch);
// console.log(BASE_URL);
