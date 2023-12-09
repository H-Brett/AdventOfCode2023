// H-Brett
// 12.9.2023
// Advent Calendar of Code Day 9
// Part 1 1980437560
// Part 2 977

const fs = require("fs")

fs.readFile('../input.txt', (err, data) => {
//fs.readFile('../sampleInput.txt', (err, data) => {
	if(err) {
		return console.error(err);
	}

	const inArr = data.toString().split('\r\n')

	let lastValArr = []

	inArr.forEach((line) => {
		let tempArr = [line.split(' ').map((num) => { return parseInt(num) })] // }).reverse()] // part 2 solved by reversing the array returned from map
		let flag = false


		while(new Set(tempArr[tempArr.length - 1]).size != 1) {
			tempArr.push([])

			tempArr[tempArr.length - 2].forEach((num, i, arr) => {
				if (i != 0) {
					tempArr[tempArr.length - 1].push(num - arr[i-1])
				}
			})			
		}

		tempArr[tempArr.length - 1].push(tempArr[tempArr.length - 1][0])

		for( let i = tempArr.length - 1; i > 0; i --) {
			let lastVal = tempArr[i].length	- 1
			tempArr[i - 1].push(tempArr[i - 1][lastVal] + tempArr[i][lastVal])
		}

		lastValArr.push(tempArr[0][tempArr[0].length - 1])
	})

	console.log(lastValArr.reduce((a, b) => { return a + b },0 ))
});