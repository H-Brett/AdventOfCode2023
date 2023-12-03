// -&/*@#%+$=

const fs = require('fs')

fs.readFile('../input.txt', (err, data) => {
	//Error Handling
	if(err) {
		return console.error(err);
	}

	const symbolsRegex = /[-&/*@#%+$=]/
	let partCount = 0

	const inArr = data.toString().split('\r\n')
	inArr.push('.'.repeat(140))
	inArr.unshift('.'.repeat(140))

	inArr.forEach((line, i, arr) => {
		let match = line.match(/\d{1,}/)

		if(match){
			while(match) {
				let above = arr[i - 1]
				let below = arr[i + 1]

				let snipStart = match.index - 1
				let snipEnd = match.index + match[0].length + 1
					match.index == 0 ? snipStart = 0 : snipEnd == line.length + 1 ? snipEnd = line.length : null;
				let aboveSnip = above.slice(snipStart, snipEnd)
				let currentSnip = line.slice(snipStart, snipEnd)
				let belowSnip = below.slice(snipStart, snipEnd)
				let combine = aboveSnip.concat(currentSnip, belowSnip)


				if (symbolsRegex.test(combine)) {
					partCount += parseInt(match[0])
				}

				line = line.replace(match[0], '.'.repeat(match[0].length))
				match = line.match(/\d{1,}/)
 
			}
		}
	})

	console.log(partCount)
})