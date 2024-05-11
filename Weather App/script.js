const nameInput = document.getElementById("name-input");
const locationInfo = document.getElementById("location-info");
const unitSwap = document.getElementById("unit-swap");
const weatherTemp = document.getElementById("weather-temp");
const weatherIcon = document.getElementById("weather-icon");
const weatherCondition = document.getElementById("weather-condition");
const windInfo = document.getElementById("wind");
const windArrow = document.getElementById("wind-arrow");
const windContainer = document.getElementById("wind-container");

const fetchWeather = async () => {
	windContainer.style.display = "flex";
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
// if is_day then change theme

const unitImperial = () => {
	//convert instead of swapping
};

locationInfo.innerHTML = `
	<div id="name" class="reveal">${data.location.name}</div>
	<div id="region" class="reveal">${data.location.region}</div>
	<div id="country" class="reveal">${data.location.country}</div>`
weatherTemp.innerHTML = `
	<div id="temp-c" class="reveal">Temperature: ${data.current.temp_c}ºC</div>
	<div id="feels-c" class="reveal">Feels Like: ${data.current.feelslike_c} ºC</div>
	<div id="last-updated" class="reveal">Last updated: ${data.current.last_updated}</div>`;
weatherIcon.innerHTML = `<img id="icon" src="${data.current.condition.icon}" alt="Weather Icon">`;
weatherCondition.innerText = `${data.current.condition.text}`;
wind.innerHTML = `
<div id="wind-direction" class="reveal">${data.current.wind_dir}</div>
<div id="wind-degree" class="reveal">${data.current.wind_degree}º</div>
<div id="wind-kph" class="reveal">${data.current.wind_kph} KPH</div>`;
windArrow.style.transform = `rotate(${data.current.wind_degree}deg)`;

	} catch (error) {
		alert("Location not found!");
		console.error(error);
	}
};

unitSwap.addEventListener("click", () => {

});

nameInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		fetchWeather();
		nameInput.blur();
		nameInput.value= "";
	}
});