// H-Brett
// 
// Advent Calendar of Code Day 10


/*
['L', 'J'] conect from North to [ 'F', '7', '|' ]
['F', '7'] connect from South to [ 'L', 'J', '|' ]
['F', 'L'] connect from West to [ '7', 'J', '-' ]
['J', '7'] connect from East to [ 'F', 'L', '-']
*/

const fs = require("fs")

fs.readFile('../input.txt', (err, data) => {
	if(err) {
		return console.error(err);
	}

	const inArr = data.toString().split('\r\n')
	// console.log(inArr[0].length) // 140 
	// console.log(inArr.join('\r\n').match('S')) // index 3627
	// console.log(3627 / 140) // 25.9, S = Row 25
	// console.log(inArr[25].match('S')) // index 77
	let startCoord = [ 25, 77 ]
	
	// hard coding start points, handle 'S' canConnect case programatically later
	// arbitrarily labeling one as loopForward, one as loopBack
	// includes direction moved from last
	let loopForwardPos = [24, 77, 'up']
	let loopBackPos = [26, 77, 'down']

	let up = [ 'F', '7', '|' ]
	let right = [ 'J', '7', '-' ]
	let down = [ 'L', 'J', '|' ]
	let left = [ 'F', 'L', '-' ]

	let getCardinalDir = ([row, col, moved]) => {
		/*
		let north = [row - 1, col]
		let east = [row, col + 1] 
		let south = [row + 1, col]
		let west = [row, col - 1]

		return [north, east, south, west] 
		*/

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
		//let [loopForward, loopBack] = positions
		//console.log(row, col)
		let x = 0
		let y = 1
		let nextForward
		let nextBack

		// console.log(positions)

//		console.log(map[row][col])
//		console.log(north, east, south, west)
//		console.log(up.includes(map[north[x]][north[y]]))


		//   i == 0 ? nextForward = [row, col, ''] : nextBack = [row, col, '']

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

		console.log(nextForward, nextBack)

		return [nextForward, nextBack]
	}

		/*

		switch(map[row][col]) {
			case 'L':
			case 'J':
			case 'S':
			case '|':
				if(up.includes(map[north[x]][north[y]])) {
					console.log(map[row][col], 'conects to', map[north[x]][north[y]])
				}
				//break;
			case 'F':
			case 'L':
			case 'S':
			case '-':
				if(right.includes(map[west[x]][west[y]])) {
					console.log(map[row][col], 'conects to', map[west[x]][west[y]])
				}
				//break; 
			case 'F':
			case '7':
			case 'S':
			case '|':
				if(down.includes(map[south[x]][south[y]])) {
					console.log(map[row][col], 'conects to', map[south[x]][south[y]])
				}
				//break; 
			case 'J':
			case '7':
			case 'S':
			case '-':
				if(left.includes(map[east[x]][east[y]])) {
					console.log(map[row][col], 'conects to', map[east[x]][east[y]])
				}
				//break;  
		}

	}
	*/

	let forwardCount = 1
	let backCount = 1
	//let nextPos;

	// console.log(loopForwardPos[0] != loopBackPos[0], loopForwardPos[1] != loopBackPos[1])

	while (inArr[loopForwardPos[0]][loopForwardPos[1]] != 'S' ||  inArr[loopBackPos[0]][loopBackPos[1]] != 'S') {
		forwardCount += 1
		backCount += 1
		// console.log(loopForwardPos, loopBackPos)

		nextPos = canConnect([loopForwardPos, loopBackPos], inArr)
		//console.log(nextPos)

		loopForwardPos = nextPos[0]
		loopBackPos = nextPos[1]
		console.log()
	}

	console.log(forwardCount, backCount)


	//console.log(inArr)
});