// [destinationStart, sourceStart, rangeLength]
// 166562384 too low
// 650599855

const fs = require('fs')
//console.time()
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
            //isNaN(construct[key][0][0]) ? construct[key][0].shift() : null
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
                    // console.log(key, destSrcLine)
                    let [ destStart, sourceStart, range ] = destSrcLine

                    // console.log(i, destStart, sourceStart, range, seedMap)
                    if(i == 0){
                        if (seed >= sourceStart && seed <= sourceStart + range) {
                            // console.log(seedMap, destStart, sourceStart, range)
                            seedMap[key] = destStart + (seed - sourceStart)
                        }
                    } else if (!seedMap[key]) {
                        if (seedMap[arr[i-1]] >= sourceStart && seedMap[arr[i-1]] <= sourceStart + range) {
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

        // console.log(mappedSeeds)
        return mappedSeeds
    }

    let closest = 0
    seedMapping(dataProc(dataArr)).forEach((seedmap) => {
        closest == 0 ? closest = seedmap['humidity-to-location'] : seedmap['humidity-to-location'] < closest ? closest = seedmap['humidity-to-location'] : null
    })

    console.log(closest)

})
//console.timeEnd()