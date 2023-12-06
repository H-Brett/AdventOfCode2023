// H-Brett
// 12.6.2023
// Advent Calendar of Code Day 6
// Part 1 1159152
// Part 2

const fs = require("fs")

fs.readFile('../input.txt', (err, data) => {
	if(err) {
		return console.error(err);
	}

	const inArr = data.toString().split('\r\n').map((line) => { return line.split(':').map((split) => { return split.trim().split(/\s+/) }) })
	let races = []
	for (i = 0; i < inArr[0][1].length; i++) {
		races.push([parseInt(inArr[0][1][i]), parseInt(inArr[1][1][i])])
	}

	let possWinCount = []
	races.forEach((timeDistPair) => {
		let winCount = 0

		for(i = 1; i < timeDistPair[0]; i++) {
			let distance = (timeDistPair[0] - i) * i
			if (distance > timeDistPair[1]) {
				winCount += 1
			}
		}

		possWinCount.push(winCount)
	})


	let multArr = (array) => {
		return array.reduce((accumulator, currentValue) => {
			return accumulator * currentValue
		},1)
	}

	console.log(multArr(possWinCount))
})