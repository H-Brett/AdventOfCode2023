// H-Brett
// 12.2.2023
// Advent Calendar of Code 2023 Day 4

const fs = require('fs')

fs.readFile('../input.txt', (err, data) => {
	if(err) {
		return console.error(err);
	}

	const inArr = data.toString().split('\r\n')

	let dataProc = (array) => {
		let processed = array.map((game) => {
			let construct = {}
			game = game.split(' | ')
			construct['id'] = game[0].split(': ')[0].match(/\d{1,}/)[0]
			construct['card'] = game[0].split(': ')[1].split(/\s{1,}/)
			construct['winnings'] = game[1].split(/\s{1,}/)

			return construct
		})

		return processed
	}

	let checkWinnings = (game) => {
		let winCnt = 0
		console.log(game)
		game.winnings.forEach((winVal) => {
			game.card.forEach((checkVal) => {
				 if(parseInt(winVal) == parseInt(checkVal)) {
				 	console.log(winCnt)
				 	winCnt == 0 ? winCnt += 1 : winCnt += winCnt
				 }
			})
		})

		return winCnt
	}

	let procData = dataProc(inArr)
	let winSum = 0
	procData.forEach((game) => { winSum += checkWinnings(game) })
	console.log(winSum)

})