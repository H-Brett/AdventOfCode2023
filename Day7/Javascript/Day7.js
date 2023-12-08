// H-Brett
// 12.7.2023
// Advent Calendar of Code Day 7
// 160344 too low
// 779541 too low
// 250440956 too high
// Part 1 250232501

const fs = require("fs")

fs.readFile('../input.txt', (err, data) => {
//fs.readFile('../sampleInput.txt', (err, data) => {
	if(err) {
		return console.error(err);
	}

	const inArr = data.toString().split('\r\n').map((line) => { return line.split(' ') })
	const types = ['HIGHCARD', 'ONEPAIR', 'TWOPAIR', 'FULLHOUSE', 'THREEKIND', 'FOURKIND', 'FIVEKIND']
	const cardValues = {
		'A':14,
		'K':13,
		'Q':12,
		'J':11,
		'T':10,
	}

	let handClassify = (hand) => {
		let workingHand = hand[0]
		let cardCounter = {}

		workingHand = workingHand.split('').map((card) => {
			if(cardValues.hasOwnProperty(card)) {
				return cardValues[card]
			} else {
				return parseInt(card)
			}
		}).sort((a,b) => a-b)

		for (let i = 0; i < workingHand.length; i++){
			if(!cardCounter.hasOwnProperty(workingHand[i])) {
				cardCounter[workingHand[i]] = 1
			} else {
				cardCounter[workingHand[i]] += 1
			}
		}

		let sortMatches = Object.values(cardCounter).sort((a,b) => b-a)

		switch(sortMatches[0]) {
			case 5:
				hand.push('FiveOfKind')
				break;
			case 4: 
				hand.push('FourOfKind')
				break;
			case 3:
				if (sortMatches[1] == 2) {
					hand.push('FullHouse')
				} else {
					hand.push('ThreeOfKind')
				}
				break;
			case 2:
				if (sortMatches[1] == 2) {
					hand.push('TwoPair')
				} else {
					hand.push('OnePair')
				}
				break;
			default:
				hand.push('HighCard')
		}

		return hand
	}


	let sortHandsByClass = (dataArray) => {
		let handsByType = {
			'FiveOfKind': [], 
			'FourOfKind': [],
			'FullHouse': [], 
			'ThreeOfKind': [],
			'TwoPair': [],
			'OnePair': [], 
			'HighCard': []
		}

		dataArray.forEach((hand) => {
			switch(handClassify(hand)[2]) {
				case 'FiveOfKind':
					hand.pop()
					handsByType['FiveOfKind'].push(hand)
					break;
				case 'FourOfKind':
					hand.pop()
					handsByType['FourOfKind'].push(hand) 
					break;
				case 'ThreeOfKind':
					hand.pop()
					handsByType['ThreeOfKind'].push(hand) 
					break;
				case 'FullHouse':
					hand.pop()
					handsByType['FullHouse'].push(hand)
					break;
				case 'TwoPair':
					hand.pop()
					handsByType['TwoPair'].push(hand)
					break;
				case 'OnePair': 
					hand.pop()
					handsByType['OnePair'].push(hand)
					break;
				case 'HighCard':
					hand.pop()
					handsByType['HighCard'].push(hand)

			}
		})

		return handsByType
	}



	let rankHands = (dataObject) => {
		let keys = [...Object.keys(dataObject)]

		keys.forEach((key) => {
			//console.log(key)

			dataObject[key].forEach((hand, i, arr) => { hand[0] = hand[0].split('').map((card) => {
					if(cardValues.hasOwnProperty(card)) {
						return cardValues[card]
					} else {
						return parseInt(card)
					}
				})
			})

			dataObject[key].sort((a, b) => {
				return b[0][0] - a[0][0] || b[0][1] - a[0][1] || b[0][2] - a[0][2] || b[0][3] - a[0][3] || b[0][4] - a[0][4]
			})
			
			dataObject[key].reverse()
			//console.log(dataObject[key])
		})

		return dataObject
	}

	let part1Answer = (dataObject) => {
		let total = 0
		let keys = [...Object.keys(dataObject)].reverse()

		//console.log(keys)
		let i = 1

		keys.forEach((key) => {
			//console.log(key)
			dataObject[key].forEach((hand) => {
				//console.log(i, hand[0], hand[1])
				total += hand[1] * i
				i++
				//console.log('running total', total)
			})
		})

		return total
	}



	let sorted = sortHandsByClass(inArr)
	//console.log(sorted)
	let ranked = rankHands(sorted)
	console.log('Day 7 part 1 answer:', part1Answer(ranked))


});



/*

			// console.log(key)
			let rankedHands = []

			dataObject[key].forEach((hand) => {
				// console.log(key, hand)
				let workingHand = hand[0].split('').map((card) => {
					if(cardValues.hasOwnProperty(card)) {
						return cardValues[card]
					} else {
						return parseInt(card)
					}
				}) // workingHand.Map

				///console.log(workingHand)

				if(!rankedHands[0]) {
					rankedHands.push(workingHand)
					//console.log('initialpush', rankedHands)
				} else {
					for(i = 0; i < rankedHands.length; i++){
						for(j = 0; j < workingHand.length; j++){
							// console.log(rankedHands[i], workingHand, rankedHands[i][j], workingHand[j])
							if(workingHand[j] < rankedHands[i][j]) {
								rankedHands.splice(i - 1, 0, workingHand)
								i = rankedHands.length
								j = workingHand.length
							} 

						}
					}
				}

				// console.log(rankedHands)

			}) // dataObject[key].forEach

			 console.log(key, rankedHands)


for(i = 0; i < rankedHands.length; i++) {
						for(j = 0; j < workingHand.length; j++) {
							//console.log(workingHand, rankedHands[i], workingHand[j], rankedHands[i][j])

							if(workingHand[j] < rankedHands[i][j]) {
								//console.log(workingHand[j], '<',  rankedHands[i][j], 'before', rankedHands)
								rankedHands.splice(i, 0, workingHand)
								//console.log('after', rankedHands)
								j = workingHand.length
								i = rankedHands.length
							} else if (workingHand[j] > rankedHands[i][j]) {
								
								if(!rankedHands[i+1]) {
									rankedHands.push(workingHand)
									j = workingHand.length
									i = rankedHands.length
								} else {
									if(workingHand[j] <= rankedHands[i+1][j]) {
										i++
									} else {
										rankedHands.splice(i + 1, 0, workingHand)
										j = workingHand.length
										i = rankedHands.length
									}
								}

								/*
								console.log(workingHand[j], '>',  rankedHands[i][j], 'before', rankedHands)
								rankedHands.splice(i + 1, 0, workingHand)
								console.log('after', rankedHands)
								j = workingHand.length
								i = rankedHands.length
							
								
							}
						}
					}
*/ 