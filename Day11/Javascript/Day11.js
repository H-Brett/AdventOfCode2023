// H-Brett
// 12.11.2023
// Advent Calendar of Code Day 11

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
		
		if(!/\#/.test(line)) {
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

	//console.log(emptyCol)
	//console.log(emptyRow)


	inArr.forEach((line) => {
		//console.log(line)
		let expLine = line.split('')

		for(let i = 0; i < emptyCol.length; i++) {
			expLine.splice(emptyCol[i] + i, 0, '.')
		}
		expanded.push(expLine.join(''))

	})

	for(let i = 0; i < emptyRow.length; i++) {
		expanded.splice(emptyRow[i] + i, 0, '.'.repeat(expanded[0].length))
	}

	expanded.forEach((line, i) => {
		if(/\#/.test(line)) {
			while(/\#/.test(line)) {
				let match = line.match(/\#/)
				galaxyIndex.push([i, match.index])
				line = line.replace(/\#/, '.')
			}
		}

	})

	console.log(expanded)
	console.log(galaxyIndex)

	let distanceSum = 0

	galaxyIndex.forEach((galaxy, i) => {
		//take in first galaxy

		for(j = i + 1; j < galaxyIndex.length; j++) {
			distanceSum += Math.abs((galaxyIndex[j][0] - galaxy[0])) + Math.abs((galaxyIndex[j][1] - galaxy[1]))
			//console.log(distanceSum) 
		}
	})

	console.log(distanceSum)




	//console.log(galaxyIndex.length)
	//console.log(galaxyCount)
	//console.log(inArr)
});

/*
if(/\#/.test(line)) {
			while(/\#/.test(line)) {
				let match = line.match(/\#/)

				galaxyIndex.push([i, match.index])

				line = line.replace(/\#/, galaxyCount)
				galaxyCount++
			}
		} else {
			emptyRow.push(i)
		}

*/ 