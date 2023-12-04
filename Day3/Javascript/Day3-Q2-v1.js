// -&/*@#%+$=
// too high 98913096
// 81997870 right answer

const fs = require('fs')

fs.readFile('../input.txt', (err, data) => {
	//Error Handling
	if(err) {
		return console.error(err);
	}

	// const symbolsRegex = /[-&/*@#%+$=]/
	let gearRatioSum = 0

	const inArr = data.toString().split('\r\n')
	inArr.push('.'.repeat(140))
	inArr.unshift('.'.repeat(140))

	inArr.forEach((line, i, arr) => {
		let match = line.match(/\*/)

		if(match){
			while(match) {
				let above = arr[i - 1]
				let below = arr[i + 1]
				let snipStart = match.index - 3
				let snipEnd = match.index + match[0].length + 3
					match.index == 0 ? snipStart = 0 : snipEnd == line.length + 1 ? snipEnd = line.length : null;
				let aboveSnip = above.slice(snipStart, snipEnd)
				let currentSnip = line.slice(snipStart, snipEnd)
				let belowSnip = below.slice(snipStart, snipEnd)
				let snipArr = [aboveSnip, currentSnip, belowSnip]
				let combine = aboveSnip.concat(currentSnip, belowSnip)
				let parts = []

				snipArr.forEach((snip) =>{
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

	console.log(gearRatioSum)
})