import { Day } from "../day";
import { splitLines } from "../util/splitLines";

class Day8 extends Day {

    constructor(){
        super(8);
    }

    solveForPartOne(input: string): number {
        const lines = splitLines(input).filter(line => line);
        let [instructions, ...rest] = lines;
        instructions = instructions.trim();

        const map = new Map<string, string[]>();
        for (const line of rest) {
            const lettersOnly = line.replaceAll(/[^A-Z]/g, '');
            if (lettersOnly !== '')
                map.set(lettersOnly.substring(0, 3), [lettersOnly.substring(3, 6), lettersOnly.substring(6, 9)]);
        }

        let currentNode = 'AAA';
        let steps = 0;
        while (currentNode !== 'ZZZ') {
            const instruction = instructions[0]; // get next instruction
            instructions = instructions.substring(1); // remove instruction from beginning

            const nextNodes = map.get(currentNode);
            if (!nextNodes) break;

            currentNode = instruction === 'L' ? nextNodes[0] : nextNodes[1];

            steps++;
            instructions = `${instructions}${instruction}`; // re-add instruction to end of string
        }

        return steps;
    }

    // BFS
    solveForPartTwo(input: string): number {
        return -1;
    }
}

export default new Day8;

// const lines = splitLines(input).filter(line => line);
// const [instructions, ...rest] = lines;
// const maps = rest.map(str => {
//     const lettersOnly = str.replaceAll(/[^A-Z]/g, '')
//     return [lettersOnly.substring(0, 3), lettersOnly.substring(3, 6), lettersOnly.substring(6, 9)]
//         .filter(str => str)
// }).filter(arr => arr.length > 0)