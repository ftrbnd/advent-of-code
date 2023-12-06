import { Day } from "../day";

class Day5 extends Day {

    constructor() {
        super(5);
    }

    parseInput(input: string[]) {
        const seeds = input[0].replace('seeds: ', '').split(' ').map(val => parseInt(val));

        const maps: number[][][] = [];

        for (let i = 1; i < input.length; i++) {
            if (input[i].includes('map:')) {
                const currentMap: number[][] = [];

                while (i + 1 < input.length && !input[++i].includes('map:')) {
                    currentMap.push(input[i].split(' ').map(val => parseInt(val)));
                } 

                maps.push(currentMap);
                i--;
            }
        }

        return {
            seeds,
            seedToSoil: maps[0],
            soilToFertilizer: maps[1],
            fertilizerToWater: maps[2],
            waterToLight: maps[3],
            lightToTemperature: maps[4],
            temperatureToHumidity: maps[5],
            humidityToLocation: maps[6],
        }
    }

    solveForPartOne(input: string): number {
        const splitInput = input
            .split(/\r?\n/)
            .filter(val => val !== '')
            .map(val => val.trim());
        
        const {
            seeds,
            seedToSoil,
            soilToFertilizer,
            fertilizerToWater,
            waterToLight,
            lightToTemperature,
            temperatureToHumidity,
            humidityToLocation
        } = this.parseInput(splitInput)
        
        return -1;
    }

    solveForPartTwo(input: string): number {
        return -1;
    }
}

export default new Day5;