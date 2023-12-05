// H-Brett
// 12.1.2023
// Advent Calendar of Code Day 1
const fs = require("fs")

fs.readFile('../input.txt', (err, data) => {
	if(err) {
		return console.error(err);
	}

	const inArr = data.toString().split('\r\n')
	const textToInt = ['ZERO', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE']

	let numArr = (array) => {
		return array.map((entry) => {
			let intRegex = /\d/g
			return entry.match(intRegex)
		})
	}

	let intArr = (array) => {
		return array.map((calArr) => {
			if(calArr.length < 2) {
				calArr.push(calArr[0])
			} else if (calArr.length > 2) {
				calArr = [calArr[0], calArr[calArr.length -1]]
			}
			return parseInt(calArr.join(''))
		})
	}

	let sumArr = (array) => {
		return array.reduce((accumulator, currentValue) => {
			return accumulator + currentValue
		},0)
	}

	let textTransform = (array) => {
		return array.map((line, i) => {
			textToInt.forEach((textNum, i) => {
				let re = new RegExp(textNum,'ig')
				line = line.replace(re, textNum+i+textNum)			
			})

			return line
		})
	}

	console.log('Day 1, part 1 answer:', sumArr(intArr(numArr(inArr))))
	console.log('Day 1, part 2 answer:', sumArr(intArr(numArr(textTransform(inArr)))))  
});