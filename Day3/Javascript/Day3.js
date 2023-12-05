// H-Brett
// 12.3.2023, last rev. 12.4.2023
// Advent of Code Day 3
// -&/*@#%+$=
// Part 1: 550934
// Part 2: 81997870
// 4.596ms both parts

const fs = require('fs')

fs.readFile('../input.txt', (err, data) => {
	//Error Handling
	if(err) {
		return console.error(err);
	}

	let windowing = (match, lineIndex, array, height, width) => {
		let heightPad = (height - 1) / 2
			heightPad < 1 ? heightPad = 1 : null
		let widthPad = (width - 1) / 2
			widthPad < 1 ? widthPad = 1 : null
		let snipStart = match.index - widthPad
		let snipEnd = match.index + match[0].length + widthPad
			match.index == 0 ? snipStart = 0 : snipEnd == array[lineIndex].length + 1 ? snipEnd = array[lineIndex].length : null;
		let windArr = []

		for (i = lineIndex - heightPad; i <= lineIndex + heightPad; i++) {
			windArr.push(array[i].slice(snipStart, snipEnd))
		}

		return windArr
	}

	let part1 = (array) => {
		const symbolsRegex = /[-&/*@#%+$=]/
		let partCount = 0

		array.forEach((line, i, arr) => {
			let match = line.match(/\d{1,}/)

			if(match){
				while(match) {
					let matchWindow = windowing(match, i, arr, 1, 1)

					if (symbolsRegex.test(matchWindow.join())) {
						partCount += parseInt(match[0])
					}

					line = line.replace(match[0], '.'.repeat(match[0].length))
					match = line.match(/\d{1,}/)
	 
				}
			}
		})

		return partCount
	}

	let part2 = (array) => {
		let gearRatioSum = 0

		array.forEach((line, i, arr) => {
			let match = line.match(/\*/)

			if(match){
				while(match) {
					let parts = []
					let matchWindow = windowing(match, i, arr, 1,  7)

					matchWindow.forEach((snip) =>{
						let regex = /\d{1,}/
						let snipMatch = snip.match(regex)
						
						while (snipMatch) {
							let mIndex = snipMatch.index
							let mLength = snipMatch[0].length == 0 ? 0 : snipMatch[0].length - 1

							if (mIndex < 3) {
								if(mIndex + mLength >= 2) {
									parts.push(parseInt(snipMatch[0]))
								}
							} else if (mIndex > 3 && mIndex < 5) {
								parts.push(parseInt(snipMatch[0]))
							} else if (mIndex == 3 ) {
								parts.push(parseInt(snipMatch[0]))
							}
							snip = snip.replace(snipMatch[0], '.'.repeat(snipMatch[0].length))
							snipMatch = snip.match(regex)
						}
					})

					gearRatio = parts.length == 2 ? parts[0] * parts[1] : 0
					parts = []
					gearRatioSum += gearRatio

					line = line.replace(match[0], '.'.repeat(match[0].length))
					match = line.match(/\*/)
				}
			}
		})

		return gearRatioSum
	}

	const inArr = data.toString().split('\r\n')
	inArr.push('.'.repeat(140))
	inArr.unshift('.'.repeat(140))
console.time()
	console.log('Day 3 Part 1 answer:', part1(inArr))
	console.log('Day 3 Part 2 answer:', part2(inArr))
console.timeEnd()
})