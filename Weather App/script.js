const nameInput = document.getElementById("name-input");
const mainContainer = document.getElementById("main-container");
const locationContainer = document.getElementById("location-container");
const unitSwap = document.getElementById("unit-swap");
const weatherTemp = document.getElementById("weather-temp");
const weatherIcon = document.getElementById("weather-icon");
const weatherCondition = document.getElementById("weather-condition");
const windInfo = document.getElementById("wind");
const windArrow = document.getElementById("wind-arrow");
const humidityGauge = document.getElementById("humidity-gauge");
const pressureIndicator = document.getElementById("indicator");
const pressureUnit = document.getElementById("pressure-unit");
const lastUpdated = document.getElementById("last-updated");
const body = document.querySelector("body");

let unitMetric = true;

const fetchWeather = async () => {
	mainContainer.style.display = "flex";
	const locationName = nameInput.value.toLowerCase();
	const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${locationName}&days=5`;
	const options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "f6c12a8fe9mshecc4576cadeb217p1b2560jsn29e200cdb38c",
			"X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
		}
	};
	
	try {
		const response = await fetch(url, options);
		const data = await response.json();
		console.log(data);

//Note: Add Pressure, Humidity && Percip if raining

const nightDay = () => {
	if (data.current.is_day === 1) {
		body.style.animation = "nightToDay 3s forwards";
	} else {
		body.style.animation = "dayToNight 3s forwards"
	}
};

nightDay();

// Location Container Elements
locationContainer.innerHTML = `
	<div id="name" class="reveal">${data.location.name}</div>
	<div id="region" class="reveal">${data.location.region}</div>
	<div id="country" class="reveal">${data.location.country}</div>`;

// Weather Container Elements
weatherIcon.innerHTML = `<img id="icon" src="${data.current.condition.icon}" alt="Weather Icon">`;

weatherTemp.innerHTML = `
	<div id="temp" class="reveal">${unitMetric ? data.current.temp_c + "ºC" : data.current.temp_f + "ºF"}</div>
	<div id="feels-like" class="reveal"><strong>Feels Like:</strong> ${unitMetric ? data.current.feelslike_c + "ºC" : data.current.feelslike_f + "ºF"}</div>`;

weatherCondition.innerText = `${data.current.condition.text}`;

// Wind Container Elements
wind.innerHTML = `
<div id="wind-direction" class="reveal">${data.current.wind_dir}</div>
<div id="wind-degree" class="reveal">${data.current.wind_degree}º</div>
<div id="wind-speed" class="reveal">${unitMetric ? data.current.wind_kph + " KPH" : data.current.wind_mph + " MPH"}</div>`;

windArrow.style.transform = `rotate(${data.current.wind_degree}deg)`;

// Humidity Container Elements
humidityGauge.innerHTML = `<div id="humidity-percent">${data.current.humidity}%</div>`;

humidityGauge.style.height = `${data.current.humidity}%`;

// Pressure Container Elements
pressureUnit.innerHTML = `<div class="reveal">${unitMetric ? data.current.pressure_mb + "<strong> mb</strong>" : data.current.pressure_in + "<strong> \"Hg</strong>"}</div>`;

pressureIndicator.style.bottom = `${data.current.pressure_mb / 17}%`;

// Last Updated
lastUpdated.innerHTML = `<div><strong>Last updated:</strong> ${data.current.last_updated}</div>`;

	} catch (error) {
		alert("Location not found!");
		console.error(error);
	}
};

unitSwap.addEventListener("click", () => {
	if (unitMetric) {
	unitSwap.innerText = "ºC";
	unitMetric = false;
} else {
	unitSwap.innerText = "ºF";
	unitMetric = true;
}
	fetchWeather();
});

nameInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		fetchWeather();
		nameInput.blur();
	}
});