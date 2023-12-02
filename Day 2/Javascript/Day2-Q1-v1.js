// H-Brett
// 12.2.2023
// Advent Calendar of Code 2023 Day 2

const fs = require('fs')

fs.readFile('../input.txt', (err, data) => {
	//Error Handling
	if(err) {
		return console.error(err);
	}

	const possible = {
		red: 12, 
		green: 13, 
		blue: 14
	}
	let possCount = 0
	const inArr = data.toString().split('\r\n')


	inArr.forEach((game) => {
		let flag = false
		let id = parseInt(game.split(': ')[0].split(' ')[1])

		game = game.split(': ')[1].split('; ').map((result) => {
			return result.split(', ').map((color) => {
				return color.split(' ')
			})
		})

		game.forEach((result, i) => {
			result.forEach((color) => {
				if(parseInt(color[0]) > possible[color[1]]) {
					flag = true
				}
			})
		})

		if(!flag) {
			possCount += id
		}	
	})

	console.log(possCount)	
})