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

    getMappedValue(seed: number, map: number[][]) {
        for (const line of map) {
            const [destinationStart, sourceStart, rangeLength] = line;

            if (sourceStart <= seed && seed <= sourceStart + rangeLength - 1) {
                const difference = destinationStart - sourceStart;
                const correspondingValue = seed + difference;

                return correspondingValue;
            }
        }
        // Any source numbers that aren't mapped correspond to the same destination number
        return seed;
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
        const locations: number[] = [];

        for (const seed of seeds) {
            const soil = this.getMappedValue(seed, seedToSoil);
            const fertilizer = this.getMappedValue(soil, soilToFertilizer);
            const water = this.getMappedValue(fertilizer, fertilizerToWater);
            const light = this.getMappedValue(water, waterToLight);
            const temperature = this.getMappedValue(light, lightToTemperature);
            const humidity = this.getMappedValue(temperature, temperatureToHumidity);
            const location = this.getMappedValue(humidity, humidityToLocation);

            locations.push(location);
        }
        
        return Math.min(...locations);
    }

    solveForPartTwo(input: string): number {
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
        const mappings = [seedToSoil, soilToFertilizer, fertilizerToWater, waterToLight, lightToTemperature, temperatureToHumidity, humidityToLocation]

        const pairs: number[][] = [];
        for (let i = 0; i < seeds.length; i += 2) {
            pairs.push([seeds[i], seeds[i] + seeds[i + 1]])
        }

        let res: number[][] = [];
        for (const mapping of mappings) {
            // could not figure out
        }

        return -1;
    }
}

export default new Day5;