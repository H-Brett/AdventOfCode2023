// H-Brett
// 12.12.2023
// Advent Calendar of Code Day 12

const fs = require("fs")

//fs.readFile('../input.txt', (err, data) => {
fs.readFile('../sampleInput.txt', (err, data) => {
	if(err) {
		return console.error(err);
	}

	const inArr = data.toString().split('\r\n').map((line) => {
		line = line.split(' ')
		line[0] = line[0].split('')
		
		line[1] = line[1].split(',')
		line[1] = line[1].map((num) => {
			return parseInt(num)
		})

		return line
	})

	inArr.forEach((springLine) => {
		console.log(springLine)
	})

	//console.log(inArr)
});