// Brett Horst
// 12.1.2023
// Advent Calendar of Code Day 1 Challenge 1 Version 1
// Read an input file containing n lines
// Process each line for integers contained within
// Find calibration value by concatenating first and last digit encountered in line
// Sum all calibration values for final answer

//require node filesystem
var fs = require("fs")

//Async file read
fs.readFile('../input.txt', (err, data) => {
	//Error Handling
	if(err) {
		return console.error(err);
	}

	// Transform input stream to array of values, disregarding return and newline codes
	var inArr = data.toString().split('\r\n')

	// Create a new array containing arrays of integers found in each line of input
	let numArr = inArr.map((entry) => {
		let intRegex = /\d/g
		return entry.match(intRegex)
	})

	//Process integer arrays received, map to new array
	let intArr = numArr.map((calArr) => {
		//if only one digit, duplicate
		if(calArr.length < 2) {
			calArr.push(calArr[0])
		//if more than 2 digits, take first and last
		} else if (calArr.length > 2) {
			calArr = [calArr[0], calArr[calArr.length -1]]
		}
		// return combined integers as string, processed to Int
		return parseInt(calArr.join(''))
	})

	// summation of calibration values
	let sum = intArr.reduce((accumulator, currentValue) => {
		return accumulator + currentValue
	},0)

	console.log(sum)  
});