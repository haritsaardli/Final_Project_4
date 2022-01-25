const city = document.getElementById("city");
const cloud = document.getElementById("cloud");
const temp = document.getElementById("temp");
const windSpeed = document.getElementById("windSpeed");


document.getElementById("input").addEventListener("keyup", function(event) {
	event.preventDefault();
    if (event.keyCode === '13') {
		const country = document.getElementById("input").value;
        let params = {
			q: `${country}`,
		}
		// console.log(params)
		weatherAPI(params)
    }
})

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

	let params = {
		lat: `${lati}`,
		lon: `${long}`,
	};

	weatherAPI(params)
	
}

function weatherAPI(p) {
	let params = {
		units: "metric",
		lang: "id",
		appid: ""
	}
	Object.assign(params,p)

	const BASE_URL = new URL("https://api.openweathermap.org/data/2.5/weather");
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
