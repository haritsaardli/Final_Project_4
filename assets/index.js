const city = document.getElementById("city");
const cloud = document.getElementById("cloud");
const temp = document.getElementById("temp");
const windSpeed = document.getElementById("windSpeed");

function findCity() {
	const country = document.getElementById("input").value;
	const BASE_URL = new URL("https://api.openweathermap.org/data/2.5/weather");
	let params = {
		q: `${country}`,
		units: "metric",
		lang: "id",
		appid: "8a59485fc0098295507e55078609bfee"
	};
	BASE_URL.search = new URLSearchParams(params);

	fetch(BASE_URL)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			if (data.cod == "404") {
				city.innerHTML = "City Not Found";
				cloud.innerHTML = "-";
				temp.innerHTML = "-";
				windSpeed.innerHTML = "-";
			} else {
				city.innerHTML = data.name;
				cloud.innerHTML = data.weather[0].description;
				temp.innerHTML = data.main.temp + " &#8451";
				windSpeed.innerHTML = data.wind.speed + " m/s";
			}
		})
		.catch((err) => {
			console.log(err + "error");
		});
}

function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition);
	} else {
		console.log("Geolocation is not supported by this browser.");
	}
}

function showPosition(position) {
	const lati = position.coords.latitude;
	const long = position.coords.longitude;

	const BASE_URL = new URL("https://api.openweathermap.org/data/2.5/weather");
	const params = {
		lat: `${lati}`,
		lon: `${long}`,
		units: "metric",
		lang: "id",
		appid: "8a59485fc0098295507e55078609bfee"
	};
	BASE_URL.search = new URLSearchParams(params);

	fetch(BASE_URL)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			if (data.cod == "404") {
				city.innerHTML = "City Not Found";
				cloud.innerHTML = "-";
				temp.innerHTML = "-";
				windSpeed.innerHTML = "-";
			} else {
				city.innerHTML = data.name;
				cloud.innerHTML = data.weather[0].description;
				temp.innerHTML = data.main.temp + " &#8451";
				windSpeed.innerHTML = data.wind.speed + " m/s";
			}
		})
		.catch((err) => {
			console.log(err + "error");
		});
}

getLocation();
