// H-Brett
// 12.11.2023
// Advent Calendar of Code Day 11
// Part 1 10313550
// Part 2 611998089572

const fs = require("fs")

fs.readFile('../input.txt', (err, data) => {
//fs.readFile('../sampleInput.txt', (err, data) => {
	if(err) {
		return console.error(err);
	}

	let galaxyCount = 0
	let galaxyIndex = []
	let transposedInput = []
	let emptyRow = []
	let emptyCol = []
	let expanded = []

	const inArr = data.toString().split('\r\n')

	inArr.forEach((line, i) => {
		for(j = 0; j < line.length; j++) {
			if(i == 0) {
				transposedInput.push([])
				transposedInput[j].push(line[j])
			} else {
				transposedInput[j].push(line[j])
			}
		}

		if(/\#/.test(line)) {
			while(/\#/.test(line)) {
				let match = line.match(/\#/)

				galaxyIndex.push([i, match.index])

				line = line.replace(/\#/, '.')
				//galaxyCount++
			}
		} else {
			emptyRow.push(i)
		}
	})


	transposedInput.forEach((line, i) => {
		line = line.join('')
		//console.log(line)

		if(!/\#/.test(line)) {
			emptyCol.push(i)
		}
	})

	galaxyIndex.forEach((galaxy) => {
		for(i = emptyCol.length; i >= 0; i--) {
			if(galaxy[1] > emptyCol[i]) {
				galaxy[1] += 999999
			}
		}

		for(i = emptyRow.length; i >= 0 ; i--) {
			if(galaxy[0] > emptyRow[i]) {
				galaxy[0] += 999999
			}
		}
	})



	let distanceSum = 0
	galaxyIndex.forEach((galaxy, i) => {

		for(j = i + 1; j < galaxyIndex.length; j++) {
			distanceSum += Math.abs((galaxyIndex[j][0] - galaxy[0])) + Math.abs((galaxyIndex[j][1] - galaxy[1]))
		}
	})

	console.log(distanceSum)
});

