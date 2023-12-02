// H-Brett
// 12.2.2023
// Advent Calendar of Code 2023 Day 2

const fs = require('fs')

fs.readFile('../input.txt', (err, data) => {
	//Error Handling
	if(err) {
		return console.error(err);
	}


	let sum = 0
	const inArr = data.toString().split('\r\n')

	inArr.forEach((game) => {
		let possible = {
			red: 0, 
			green: 0, 
			blue: 0
		}
		let power = 0

		game = game.split(': ')[1].split('; ').map((result) => {
			return result.split(', ').map((color) => {
				return color.split(' ')
			})
		})

		game.forEach((result, i) => {
			result.forEach((color) => {
				if(parseInt(color[0]) > possible[color[1]]) {
					possible[color[1]] = parseInt(color[0])
				}
			})
		})

		power = possible["red"] * possible["blue"] * possible["green"]
		sum += power
	})

	console.log(sum)
})