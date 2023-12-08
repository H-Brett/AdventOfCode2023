// H-Brett
// 12.8.2023
// Advent Calendar of Code Day 8
// Part 1 18113

const fs = require("fs")

fs.readFile('../input.txt', (err, data) => {
//fs.readFile('../sampleInput.txt', (err, data) => {
//fs.readFile('../part2SampleInput.txt', (err, data) => {
	if(err) {
		return console.error(err);
	}

	let inArr = data.toString().split('\r\n')

	const instructions = inArr.shift().split('')
		inArr.shift()
	const coords = [...inArr]
	let locCoordObj = {}
	// let keyArr = []

	coords.forEach((set) => {
		set = set.split(' = ')
		//console.log(set)
		let location = set[0] 
		let nextCoordPair = set[1].replace(/[\(\)]/g, '').split(', ')
		
		locCoordObj[location] = nextCoordPair
		//keyArr.push(location)
	})

	// console.log(keyArr)

	let currentLoc = 'AAA'
	let stepCount = 0

	while(currentLoc != 'ZZZ') {
		for(i = 0; i < instructions.length; i++){
			instructions[i] == 'R' ? currentLoc = locCoordObj[currentLoc][1] : currentLoc = locCoordObj[currentLoc][0]
			stepCount++
		}
	}

	console.log(stepCount)
});