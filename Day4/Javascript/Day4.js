// H-Brett
// 12.4.2023
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
			construct['id'] = parseInt(game[0].split(': ')[0].match(/\d{1,}/)[0])
			construct['card'] = game[0].split(': ')[1].split(/\s{1,}/)
			construct['winnings'] = game[1].split(/\s{1,}/)
			construct['timesPlayed'] = 0
			construct['winCnt'] = 0
			construct['singleWinSum'] = 0

			return construct
		})
		return processed
	}

	let checkWinnings = (game) => {
		let winTotal = 0
		let winCnt = 0
		game.timesPlayed += 1

		game.winnings.forEach((winVal) => {
			game.card.forEach((checkVal) => {
				 if(parseInt(winVal) == parseInt(checkVal)) {
				 	winCnt += 1
				 	winTotal == 0 ? winTotal += 1 : winTotal += winTotal
				 }
			})
		})

		return [winCnt, winTotal]
	}

	let getTotals = (array) => {
		let winSum = 0
		let cardSum = 0

		array.forEach((game, i, arr) => {
			if(game.winCnt > 0) {
				for(k = game.timesPlayed; k > 0; k--){
					for(j = game.winCnt; j > 0; j--) {
						arr[i+j].timesPlayed += 1
					}	
				}
			}
			winSum += game.singleWinSum
			cardSum += game.timesPlayed
		})

		return [winSum, cardSum]
	}

	let procData = dataProc(inArr)
	procData.forEach((game, i, arr) => {
		let checkTuple = checkWinnings(game)
		game.winCnt += checkTuple[0]
		game.singleWinSum += checkTuple[1]
	})
	
	let answers = getTotals(procData)
	console.log('Day 4 Part 1 answer:', answers[0])
	console.log('Day 4 Part 2 answer:', answers[1])
})