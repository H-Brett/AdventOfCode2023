// H-Brett
// 12.6.2023
// Advent Calendar of Code Day 6
// Part 1 1159152
// Part 2 41513103

const fs = require("fs")

fs.readFile('../input.txt', (err, data) => {
	if(err) {
		return console.error(err);
	}

	let part1Data = data.toString().split('\r\n').map((line) => { return line.split(':').map((split) => { return split.trim().split(/\s+/) }) })
		part1Data[0] = part1Data[0][1] 
		part1Data.splice(1, 1, part1Data[1][1])
		part1Data.unshift([])
		for (i = 0; i < part1Data[1].length; i++) {
			part1Data[0].push([parseInt(part1Data[1][i]), parseInt(part1Data[2][i])])
		}
		part1Data.pop(); part1Data.pop();
		part1Data = part1Data[0]

	const part2Data = data.toString().split('\r\n').map((line) => { return line.split(':').map((split) => { return split.trim().replace(/\s+/g, '') }) })
		part2Data[0] = part2Data[0][1] 
		part2Data.splice(1, 1, part2Data[1][1])

	let calcWins = (timeDistPair) => {
		let winCount = 0
		let [ time, dist ] = timeDistPair
			
		for(i = 1; i < time; i++) {
			let distance = (time - i) * i
			if (distance > dist) {
				winCount += 1
			}
		}

		return winCount
	}

	let part1Answer = 1
		part1Data.forEach((race) => {
			part1Answer *= calcWins(race)
		})

	console.time()
	console.log('Day 6 Part 1 answer:', part1Answer)
	console.log('Day 6 Part 2 answer:', calcWins(part2Data))
	console.timeEnd() // 6 seconds both solutions
})