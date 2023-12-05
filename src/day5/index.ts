import { Day } from "../day";

class Day5 extends Day {

    constructor() {
        super(5);
    }

    extractMaps(input: string, mapName: string) {
        return input
            .trim()
            .replace(mapName, '')
            .split('\n')
            .filter(val => val && val !== '\n')
            .map(val => val.trim().split(' '))
            .map(arr => arr.map(str => parseInt(str)).filter(num => num || num === 0))
            .filter(arr => arr.length > 0);
    }

    splitMaps(input: string) {
        let [
            seeds,
            seedToSoil,
            soilToFertilizer,
            fertilizerToWater,
            waterToLight,
            lightToTemperature,
            temperatureToHumidity,
            humidityToLocation
        ] = input.split(/(\n|\r|\r\n){3}/).filter(val => val && (val !== '\n' && val !== '\r'));

        const seedsList = seeds
            .replace('seeds: ', '')
            .split(' ')
            .map(val => parseInt(val));
        
        const seedToSoilMap = this.extractMaps(seedToSoil, 'seed-to-soil map:');
        const soilToFertilizerMap = this.extractMaps(soilToFertilizer, 'soil-to-fertilizer map:');
        const fertilizerToWaterMap = this.extractMaps(fertilizerToWater, 'fertilizer-to-water map:');
        const waterToLightMap = this.extractMaps(waterToLight, 'water-to-light map:');
        const lightToTemperatureMap = this.extractMaps(lightToTemperature, 'light-to-temperature map:');
        const temperatureToHumidityMap = this.extractMaps(temperatureToHumidity, 'temperature-to-humidity map:');
        const humidityToLocationMap = this.extractMaps(humidityToLocation, 'humidity-to-location map:');

        return {
            seedsList,
            seedToSoilMap,
            soilToFertilizerMap,
            fertilizerToWaterMap,
            waterToLightMap,
            lightToTemperatureMap,
            temperatureToHumidityMap,
            humidityToLocationMap
        }
    }

    solveForPartOne(input: string): number {
        const res = this.splitMaps(input);
        
        return -1;
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day5;