// Brett Horst
// 12.1.2023
// Advent Calendar of Code Day 1 Challenge 1 Version 1
// Read an input file containing n lines
// Handle text integers, e.g. eight = 8 
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

	//Comparator array to regex against and indexed at same value, ONE = arr[1]... 
	let textToInt = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE']
	// Transform input stream to array of values, disregarding return and newline codes
	const inArr = data.toString().split('\r\n');

	//
	let textTransform = inArr.map((line, i) => {
		
		// Replace each text integer with TEXT#TEXT, return integers only
		textToInt.forEach((textNum, i) => {
			let re = new RegExp(textNum,'ig')
			line = line.replace(re, textNum+i+textNum)			
		})

		let intRegex = /\d/g
		return line.match(intRegex)
	})

	let intArr = textTransform.map((calArr) => {
		//if only one digit, duplicate
		if(calArr.length < 2) {
			calArr.push(calArr[0])
		//if more than 2 digits, take first and last
		} else if (calArr.length > 2) {
			calArr = [calArr[0], calArr[calArr.length - 1]]
		}
		// return combined integers as string, processed to Int
		return parseInt(calArr.join(''))
	})


	let sum = intArr.reduce((accumulator, currentValue) => {
		return accumulator + currentValue
	},0)

	console.log(sum)
});