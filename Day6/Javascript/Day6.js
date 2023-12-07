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

	const part1Data = data.toString().split('\r\n').map((line) => { return line.split(':').map((split) => { return split.trim().split(/\s+/) }) })
	const part2Data = data.toString().split('\r\n').map((line) => { return line.split(':').map((split) => { return split.trim().replace(/\s+/g, '') }) })

	console.log(part2Data)

	let part2Soln = (data) => {
		let winCount = 0

		console.log(data, data[0], data[1])

		for(i = 1; i < data[0][1]; i++) {
			let distance = (data[0][1] - i) * i
			if (distance > data[1][1]) {
				winCount += 1
			}
		}

		console.log(winCount)
		//possWinCount.push(winCount)

	}

	let races = []
	for (i = 0; i < part1Data[0][1].length; i++) {
		races.push([parseInt(part1Data[0][1][i]), parseInt(part1Data[1][1][i])])
	}

	// console.log(races)

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
	part2Soln(part2Data)
})