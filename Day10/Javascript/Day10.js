// H-Brett
// 
// Advent Calendar of Code Day 10
// Part 1 6786
// part 2 495

/*
['L', 'J'] conect from North to [ 'F', '7', '|' ]
['F', '7'] connect from South to [ 'L', 'J', '|' ]
['F', 'L'] connect from West to [ '7', 'J', '-' ]
['J', '7'] connect from East to [ 'F', 'L', '-']
*/

const fs = require("fs")

fs.readFile('../input.txt', (err, data) => {
//fs.readFile('../sampleInput.txt', (err, data) => {
	if(err) {
		return console.error(err);
	}

	const inArr = data.toString().split('\r\n')
	// console.log(inArr[0].length) // 140 
	// console.log(inArr.join('\r\n').match('S')) // index 3627
	// console.log(3627 / 140) // 25.9, S = Row 25
	// console.log(inArr[25].match('S')) // index 77
	let startCoord = [ 25, 77 ]
	// let startCoord = [0, 4] 
	
	// hard coding start points, handle 'S' canConnect case programatically later
	// arbitrarily labeling one as loopForward, one as loopBack
	// includes direction moved from last
	let loopForwardPos = [24, 77, 'up']
	let loopBackPos = [26, 77, 'down']
	// let loopForwardPos = [1, 4, 'down']
	// let loopBackPos = [0, 3, 'left']

	let up = [ 'F', '7', '|' ]
	let right = [ 'J', '7', '-' ]
	let down = [ 'L', 'J', '|' ]
	let left = [ 'F', 'L', '-' ]

	let getCardinalDir = ([row, col, moved]) => {
		return {
			north: [row - 1, col],
			east: [row, col + 1],
			south: [row + 1, col],
			west: [row, col - 1],
		}
		
	}

/*
	let dir = getCardinalDir(startCoord)
	console.log(dir.north,dir.east,dir.south,dir.west)

	console.log('  ', inArr[dir.north[0]][dir.north[1]], ' ', '\n',
				inArr[dir.west[0]][dir.west[1]], inArr[startCoord[0]][startCoord[1]], inArr[dir.east[0]][dir.east[1]], '\n',
				' ', inArr[dir.south[0]][dir.south[1]], ' ', '\n',)
*/


	let canConnect = (positions, map) => {
		let x = 0
		let y = 1
		let nextForward
		let nextBack



		positions.forEach((loopDir, i) => {
			let { north, east, south, west } = getCardinalDir(loopDir)
			let [row, col, moved] = loopDir
			
			switch(moved) {
			case 'up':
				switch(map[row][col]) {
				case 'F':
					i == 0 ? nextForward = [row, col + 1, 'right'] : nextBack = [row, col + 1, 'right'] 
					// move right
					// check west
					break;
				case '7': 
					i == 0 ? nextForward = [row, col - 1, 'left'] : nextBack = [row, col - 1, 'left']
					// move left
					// check east
					break;
				case '|': 
					i == 0 ? nextForward = [row - 1, col, 'up'] : nextBack = [row - 1, col, 'up']
					// move up again
					// check north
					break;
				}
				break;
			case 'right':
				switch(map[row][col]) {
				case 'J':
					i == 0 ? nextForward = [row - 1, col, 'up'] : nextBack = [row - 1, col, 'up']
					// move up
					// check north
					break;
				case '7': 
					i == 0 ? nextForward = [row + 1, col, 'down'] : nextBack = [row + 1, col, 'down']
					// move down
					break;
				case '-': 
					i == 0 ? nextForward = [row, col + 1, 'right'] : nextBack = [row, col + 1, 'right']
					// move right again
					break;
				}
				break;
			case 'down':
				switch(map[row][col]) {
				case 'L':
					i == 0 ? nextForward = [row, col + 1, 'right'] : nextBack = [row, col + 1, 'right']
					// move right
					break;
				case 'J': 
					i == 0 ? nextForward = [row, col - 1, 'left'] : nextBack = [row, col - 1, 'left']
					// move left
					break;
				case '|': 
					i == 0 ? nextForward = [row + 1, col, 'down'] : nextBack = [row + 1, col, 'down']
					// move down again
					break;
				}
				break;
			case 'left':
				switch(map[row][col]) {
				case 'F':
					i == 0 ? nextForward = [row + 1, col, 'down'] : nextBack = [row + 1, col, 'down']
					// move down
					break;
				case 'L': 
					i == 0 ? nextForward = [row - 1, col, 'up'] : nextBack = [row - 1, col, 'up']
					// move up
					break;
				case '-': 
					i == 0 ? nextForward = [row, col - 1, 'left'] : nextBack = [row, col - 1, 'left']
					// move left again
					break;
				}
				break; 
			}

		})


		return [nextForward, nextBack]
	}

	let forwardCount = 1
	let backCount = 1
	let pipeMap = [[24, 77, 'up']]


	while (inArr[loopForwardPos[0]][loopForwardPos[1]] != 'S' ||  inArr[loopBackPos[0]][loopBackPos[1]] != 'S') {
		forwardCount += 1
		backCount += 1

		nextPos = canConnect([loopForwardPos, loopBackPos], inArr)

		loopForwardPos = nextPos[0]
		loopBackPos = nextPos[1]
		pipeMap.push(loopForwardPos)

	}

	pipeMap.forEach((section) => {
		inArr[section[0]] = inArr[section[0]].split('')
		let pipe = inArr[section[0]][section[1]]

		pipe == '|' && section[2] == 'up' ? inArr[section[0]][section[1]] = '↑' : null
		pipe == '|' && section[2] == 'down' ? inArr[section[0]][section[1]] = '↓' : null
		pipe == 'F' ? inArr[section[0]][section[1]] = '┌' : pipe == 'L' ? inArr[section[0]][section[1]] = '└' : pipe == '7' ? inArr[section[0]][section[1]] = '┐' : pipe == 'J' ? inArr[section[0]][section[1]] = '┘' : null
		pipe == '-' && section[2] == 'left' ? inArr[section[0]][section[1]] = '←' : null
		pipe == '-' && section[2] == 'right' ? inArr[section[0]][section[1]] = '→' : null

		inArr[section[0]] = inArr[section[0]].join('')
	})


	pipeMap.sort((a, b) => {
			return a[0] - b[0] || a[1] - b[1]
		})

	let mapObj = {}

	pipeMap.forEach((pipe) => {
		let currentRow = pipe[0]
		if(!mapObj[currentRow]) {
			mapObj[currentRow] = {}
		}

		mapObj[currentRow][pipe[1]] = pipe[2]
	})


	fieldCount = 0


	inArr.forEach((line, i) => {
		let insidePipe = false
		let scanArr = line.split('')
		let re = /[↑←→↓└┐┘┌]/

		if(i == startCoord[0]) {
			scanArr[startCoord[1]] = '↓'
		}

		for (j = 0; j < scanArr.length; j++ ) {
			if(scanArr[j] == '↑' || (scanArr[j] == '┌' && mapObj[i][j] != 'left') || (scanArr[j] == '┐' && mapObj[i][j] == 'up')) {
				//console.log('switch true',j, scanArr[j], mapObj[i][j])
				insidePipe = true
			} else if (scanArr[j] == '↓' || (scanArr[j] == '┐' && mapObj[i][j] != 'up') || (scanArr[j] == '┌' && mapObj[i][j] == 'left')) {
				//console.log('switch false',j, scanArr[j], mapObj[i][j])
				insidePipe = false
			}

			if(insidePipe && !re.test(scanArr[j])) {
				scanArr[j] = 'X'
				fieldCount++
			}	
		}

		line = scanArr.join('')

		console.log(line) // makes a pretty map
	})

	console.log('Day 10 Part 1 answer:', forwardCount / 2)
	console.log('Day 10 Part 2 answer:', fieldCount)

});

// /[↑←→↓└┐┘┌]/ 