// H-Brett
// 12.5.2023
// Advent of Code 2023 Day 5, last rev 12.6.2023
// [destinationStart, sourceStart, rangeLength]
// Part 1 650599855
// Part 2 1240035

const fs = require('fs')

fs.readFile('../input.txt', (err, data) => {
    if(err) {
        return console.error(err);
    }

    const dataArr = data.toString().split('\r\n\r')
    
    let dataProc = (array) => {
        let construct = {}

        array.forEach((range) => {
            let split = range.split(':')
            split[0] = split[0].replace('\n', '').replace(' map', '')
            split[1] = split[1].split('\r\n')
                split[1][0] == '' ? split[1].shift() : null 
            construct[split[0]] = split[1]
        })

        for (const key in construct) { 
            construct[key] = construct[key].map((line) => {
                return line.split(' ').map((value) => { return parseInt(value) })
            })
        }

        construct.seeds = construct.seeds[0]
        construct.seeds.shift()

        return construct
    }

    let seedMapping = (dataObj) => {
        let mappedSeeds = []
        let keys = [...Object.keys(dataObj)]
            keys.shift()

        dataObj.seeds.forEach((seed) => {
            let seedMap = {}
            seedMap.seed = seed

            keys.forEach((key, i, arr) => {
                dataObj[key].forEach((destSrcLine) => {
                    let [ destStart, sourceStart, range ] = destSrcLine

                    if(i == 0){
                        if (seed >= sourceStart && seed < sourceStart + range) {
                            seedMap[key] = destStart + (seed - sourceStart)
                        }
                    } else if (!seedMap[key]) {
                        if (seedMap[arr[i-1]] >= sourceStart && seedMap[arr[i-1]] < sourceStart + range) {
                            seedMap[key] = destStart + (seedMap[arr[i-1]] - sourceStart)
                        }
                    }
                })

                if(!seedMap[key]) {
                    i > 0 ? seedMap[key] = seedMap[arr[i - 1]] : seedMap[key] = seed
                }
            })

            mappedSeeds.push(seedMap)
        })

        return mappedSeeds
    }

    let reverseMap = (dataObj) => {
        let match = false
        let keys = [...Object.keys(dataObj)]
            keys.shift()
            keys.reverse()
        let part2ProcData = []
            procData.seeds.forEach((seed, i, arr) => {
                if(i % 2 == 0) {
                    let rangeEnd = arr[i + 1]
                    part2ProcData.push([seed, rangeEnd])
                }
            })
        let matchedSeed;


        let j = 0
        let locToSeedMap = {}

        while(!match) {
            
                locToSeedMap.location = j

            keys.forEach((key, i, arr) => {
                dataObj[key].forEach((destSrcLine) => {
                    let [ destStart, sourceStart, range ] = destSrcLine

                    if(!locToSeedMap[key]) {
                        if(i == 0) {
                            if(j >= destStart && j < destStart + range) {
                                locToSeedMap[key] = sourceStart + (j - destStart)
                            }

                        } else if (i == 6) {
                            if(locToSeedMap[arr[i - 1]] >= destStart && locToSeedMap[arr[i - 1]] < destStart + range) {
                                locToSeedMap['seed'] = sourceStart + (locToSeedMap[arr[i-1]] - destStart)
                            }
                            
                        } else {
                            if(locToSeedMap[arr[i - 1]] >= destStart && locToSeedMap[arr[i - 1]] < destStart + range) {
                                locToSeedMap[key] = sourceStart + (locToSeedMap[arr[i-1]] - destStart)
                            }
                        }
                    }
                })

                if(!locToSeedMap[key]) {
                    if(i == 0) {
                        locToSeedMap[key] = j
                    } else if (i == 6 && !locToSeedMap['seed']) {
                        locToSeedMap['seed'] = locToSeedMap[arr[i-1]]
                    } else {
                        locToSeedMap[key] = locToSeedMap[arr[i-1]]
                    }

                    //i == 0 ? locToSeedMap[key] = j : i == 6 ? locToSeedMap['seed'] = locToSeedMap[arr[i-1]] : locToSeedMap[key] = locToSeedMap[arr[i -1]]
                }
            })

            part2ProcData.forEach((rangePair) => {
                let [rangeStart, rangeLength] = rangePair

                if(locToSeedMap.seed > rangeStart && locToSeedMap.seed < rangeStart + rangeLength - 1) {
                    matchedSeed = locToSeedMap
                    match = true
                }
            })

            locToSeedMap = {}
            j++
        }

        return matchedSeed
    }

    const getLowestSeedFromRange = (rangePair, dataObj) => {
        let returnObj = {...dataObj}
        let start = rangePair[0]
        let end = rangePair[0] + rangePair[1]
        let lowestLocObj = 0
        let currentLowObj


        for (i = start; i < end; i++) {
            returnObj.seeds = [i]
            
            let mappedSeed = seedMapping(returnObj)[0]

            if (lowestLocObj == 0 || lowestLocObj > mappedSeed['humidity-to-location']) {
                lowestLocObj = mappedSeed['humidity-to-location']
                currentLowObj = mappedSeed
            }
        }

        return currentLowObj
    }

    let checkClosest = (construct) => {
        let closest = 0

        construct.forEach((seedmap) => {
            closest == 0 ? closest = seedmap['humidity-to-location'] : seedmap['humidity-to-location'] < closest ? closest = seedmap['humidity-to-location'] : null
        })

        return closest
    }

    let procData = dataProc(dataArr)
    let seedsConstruct = seedMapping(procData)
    let part1Answer = checkClosest(seedsConstruct)

/*
    // multi-block comment removes processing for 30 minute part 2 run-time function
    let part2ProcData = []
        procData.seeds.forEach((seed, i, arr) => {
            // modifies seed structure to process value pair range, receives seed with lowest location from given seed range
            if(i % 2 == 0) {
                let rangeEnd = arr[i + 1]
                part2ProcData.push(getLowestSeedFromRange([seed, rangeEnd], procData))
            }
        })

    let part2Answer = checkClosest(part2ProcData)
*/

    console.time()
    console.log('Day 5 Part 1 answer:', part1Answer)
    
    // Part 2, ~30 minute run time, processes seed to location in batches 
    // console.log('Day 5 Part 2 answer:', part2Answer, 'seedToLoc')

    // Part 2, ~7 second run time, processes locations 0 - n to seed values until seed within range found
    console.log('Day 5 Part 2 answer:', reverseMap(procData).location, 'locToSeed')
    console.timeEnd()
})