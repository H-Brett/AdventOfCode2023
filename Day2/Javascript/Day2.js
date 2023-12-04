// H-Brett
// 12.2.2023
// Advent Calendar of Code 2023 Day 2

const fs = require('fs')

fs.readFile('../input.txt', (err, data) => {
	//Error Handling
	if(err) {
		return console.error(err);
	}

	const inArr = data.toString().split('\r\n')

	let dataProc = (array, r, b, g) => {
		return array.map((event) => {
			let game = {
				id: parseInt(event.split(': ')[0].split(' ')[1]),
				drawing: event.split(': ')[1].split('; ').map((result) => {
					return result.split(', ').map((color) => {
						return color.split(' ')
					})
				}),
				flag: false,
				red: r,
				blue: b,
				green: g,
			}

			return game
		})
	}

	let isGamePossible = (game) => {
		game.drawing.forEach((draw) => {
			draw.forEach((color) => {
				if(parseInt(color[0]) > game[color[1]]) {
					game.flag = true
				}
			})	
		})
		if(!game.flag) {
			return game.id
		} else {
			return null
		}
	}

	let setPossibleColor = (game) => {
		game.drawing.forEach((draw, i) => {
			draw.forEach((color) => {
				if(parseInt(color[0]) > game[color[1]]) {
					game[color[1]] = parseInt(color[0])
				}
			})
		})
	}

	let getGamePower = (game) => {
		return game.red * game.blue * game.green
	}

	let part1Data = dataProc(inArr, 12, 14, 13)
	let part2Data = dataProc(inArr, 0, 0, 0)
	let possCount = 0
	let powerSum = 0
	part1Data.forEach((game) => { possCount+=isGamePossible(game) })
	part2Data.forEach((game) => { setPossibleColor(game); powerSum += getGamePower(game); })
	console.log('Day 2, part 1 answer:', possCount)
	console.log('Day 2, part 2 answer:', powerSum)
})