import { Day } from "../day";
import { splitLines } from "../util/splitLines";

class Day6 extends Day {

    constructor(){
        super(6);
    }

    solveForPartOne(input: string): number {
        const [t, d] = splitLines(input);
        const times = t.split(':')[1].trim().split(/\s+/).map(Number);
        const recordDistances = d.split(':')[1].trim().split(/\s+/).map(Number);

        const races: number[][] = [];
        for (let i = 0; i < times.length; i++) {
            races.push([times[i], recordDistances[i]]);
        }

        const winOutcomes: number[] = [];
        for (const [time, recordDistance] of races) {
            let raceWins = 0;

            for (let i = 0; i <= time; i++) {
                const distance = i * (time - i);
                
                if (distance > recordDistance) {
                    raceWins++;
                }
            }

            winOutcomes.push(raceWins);
        }

        return winOutcomes.reduce((a, b) => a * b, 1);
    }

    solveForPartTwo(input: string): number {
        const [t, d] = splitLines(input);
        const time = parseInt(t.split(':')[1].replaceAll(/\s+/g, ''));
        const recordDistance = parseInt(d.split(':')[1].replaceAll(/\s+/g, ''));

        let raceWins = 0;

        for (let i = 0; i <= time; i++) {
            const distance = i * (time - i);
            
            if (distance > recordDistance) {
                raceWins++;
            }
        }

        return raceWins;
    }
}

export default new Day6;