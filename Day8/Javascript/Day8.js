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

console.time()
	let inArr = data.toString().split('\r\n')

	const instructions = inArr.shift().split('')
		inArr.shift()
	const coords = [...inArr]
	let locCoordObj = {}
	let keyArr = []

	coords.forEach((set) => {
		set = set.split(' = ')
		let location = set[0] 
		let nextCoordPair = set[1].replace(/[\(\)]/g, '').split(', ')
		
		locCoordObj[location] = nextCoordPair
		keyArr.push(location)
	})


	let found = ['AAA']
	keyArr.forEach((key) => {
		if(key.match(/.{2}A/)) {
			found.push(key)
		}
	})

	for(let j=0; j < found.length; j++) {
		let currentLoc = found[j]
		let stepCount = 0

		while(currentLoc != currentLoc.match(/.{2}Z/)) {
			for(i = 0; i < instructions.length; i++){
				instructions[i] == 'R' ? currentLoc = locCoordObj[currentLoc][1] : currentLoc = locCoordObj[currentLoc][0]
				stepCount++
			}
		}

		if(j == 0) {
			//Part 1 along the way
			console.log('Day 8 Part 1 answer:', stepCount)
		}

		found[j] = stepCount
	}

	let gcd = (a, b) => { 
	    if (b == 0) 
	        return a; 
	    return gcd(b, a % b); 
	} 
	 
	let findlcm = (arr, n) => { 
	    let lcm = arr[0]; 
	 
	    for (let i = 1; i < n; i++) {
	        lcm = (((arr[i] * lcm)) / (gcd(arr[i], lcm))); 
	    }
	 
	    return lcm; 
	}

	// remove value for part 1 
	found.shift()
	  
	let n = found.length; 
	console.log('Day 8 Part 2 Answer:', (findlcm(found, n))); 
console.timeEnd()
});
