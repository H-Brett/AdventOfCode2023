// H-Brett
// 12.11.2023
// Advent Calendar of Code Day 11
// Part 1 10313550
// Part 2 82,000,210 too low

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

	console.log(emptyCol)
	console.log(emptyRow)

	//inArr.forEach((line) => console.log(line))
	// console.log(inArr[0].length)


	inArr.forEach((line) => {
		//console.log(line)
		let expLine = line.split('')
		//console.log(expLine)

		for(let i = 0; i < emptyCol.length; i++) {
			let insert = Array(999999).fill('.')
			expLine.splice(emptyCol[i] + i, 0, insert.join(''))
		}

		expanded.push(expLine.join(''))
	})

	console.log(expanded[0].length)

	for(let i = 0; i < emptyRow.length; i++) {
		
		//console.log(emptyRow[i])

		//let top = expanded.slice(0, emptyRow[i])
		let emptyLine = '.'.repeat(expanded[0].length)
		let insert = Array(999999).fill(emptyLine)
		expanded.splice(emptyRow[i] + i, 0, insert)
		//console.log(expanded)
		
		/*
		for(j=0; j < 10; j++) {
			expanded.splice(emptyRow[i] + j, 0, '.'.repeat(expanded[0].length))
		}
		*/
	}

	expanded = expanded.flat()

	console.log(expanded.length)

	expanded.forEach((line, i) => {
		if(/\#/.test(line)) {
			while(/\#/.test(line)) {
				let match = line.match(/\#/)
				galaxyIndex.push([i, match.index])
				line = line.replace(/\#/, '.')
			}
		}

	})

	//console.log(expanded)
	//console.log(galaxyIndex)

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