const dropdownLeft = document.getElementById("dropdown-left");
const dropdownRight = document.getElementById("dropdown-right");
const textInput = document.getElementById("text-input");
const textOutput = document.getElementById("text-output");
const swapBtn = document.getElementById("swap-btn");

let convertedUnit = "";
let convertedInput = "";

const weightValues = {
		microgram: 0.000001,
		miligram: 0.001,
		gram: 1,
		kilogram: 1000,
		ton: 1000000,
		ounce: 28.350,
		pound: 454,
		stone: 6350,
		uston: 907185,
		ukton: 1016000
	};

const convertWeight = () => {
	const unitLeft = dropdownLeft.value;
	const unitRight = dropdownRight.value; 
	const valueLeft = weightValues[unitLeft];
	const valueRight = weightValues[unitRight];
	const input = parseFloat(textInput.value);
	if (!isNaN(input)) {
		const convertedUnit = input * valueLeft / valueRight;
		textOutput.value = convertedUnit.toPrecision(7);
	}
};

const outputToInput = () => {
	const unitLeft = dropdownLeft.value;
	const unitRight = dropdownRight.value; 
	const valueLeft = weightValues[unitLeft];
	const valueRight = weightValues[unitRight];
	const output = parseFloat(textOutput.value);
	if (!isNaN(output)) {
		const convertedInput = output * valueRight / valueLeft;
		textInput.value = convertedInput.toPrecision(7);
	}
};

dropdownLeft.addEventListener("change", convertWeight);
dropdownRight.addEventListener("change", convertWeight);
textInput.addEventListener("input", convertWeight);
textOutput.addEventListener("input", outputToInput);

swapBtn.addEventListener("click", () => {
	const temp = dropdownLeft.value;
	dropdownLeft.value = dropdownRight.value;
	dropdownRight.value = temp;
	convertWeight();
});