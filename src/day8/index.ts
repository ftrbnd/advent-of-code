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

    greatestCommonDenominator(a: number, b: number): number {
        return b === 0 ? a : this.greatestCommonDenominator(b, a % b);
    }

    leastCommonMultiple(a: number, b: number) {
        return (a * b) / this.greatestCommonDenominator(a, b);
    }

    solveForPartTwo(input: string): number {
        const lines = splitLines(input).filter(line => line);
        let [instructions, ...rest] = lines;
        instructions = instructions.trim();

        const map = new Map<string, string[]>();
        for (const line of rest) {
            const letterNumbersOnly = line.replaceAll(/[^A-Z0-9]/g, '');
            if (letterNumbersOnly !== '')
                map.set(letterNumbersOnly.substring(0, 3), [letterNumbersOnly.substring(3, 6), letterNumbersOnly.substring(6, 9)]);
        }

        let currentNodes = [...map.keys()].filter(key => key.endsWith('A'));
        const stepsPerNode: number[] = [];
        // find how long it takes each node to reach a node that ends in 'Z'
        for (const node of currentNodes) {
            let curNode = node, steps = 0;

            let instructionsCopy = instructions;
            let endsWithZ = false;
            while (!endsWithZ) {
                const instruction = instructionsCopy[0]; // get next instruction
                instructionsCopy = instructionsCopy.substring(1); // remove instruction from beginning

                const nextNodes = map.get(curNode);
                if (!nextNodes) break;

                curNode = instruction === 'L' ? nextNodes[0] : nextNodes[1];

                steps++;
                instructionsCopy = `${instructionsCopy}${instruction}`; // re-add instruction to end of string
                endsWithZ = curNode.endsWith('Z');
            }

            stepsPerNode.push(steps);
        }

        // return the least common multiple
        return stepsPerNode.reduce((a, b) => this.leastCommonMultiple(a, b));
    }
}

export default new Day8;