import { Day } from "../day";
import { splitLines } from "../util/splitLines";

const digits = '0123456789';
const notSymbols = `${digits}.`;

class Day3 extends Day {

    constructor() {
        super(3);
    }

    withinGraph(graph: string[], x: number, y: number): boolean {
        return 0 <= x && x <= graph.length - 1 && 0 <= y && y <= graph[x].length - 1;
    }

    // travel around given coordinates one level in all directions
    adjacentToSymbol(graph: string[], row: number, col: number): boolean {
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [-1, 1], [1, -1], [-1, -1]];
        
        for (const dir of directions) {
            const [newRow, newCol] = [row + dir[0], col + dir[1]];

            if (this.withinGraph(graph, newRow, newCol)) {
                if (!notSymbols.includes(graph[newRow][newCol])) {
                    return true;
                }
            }
        }

        return false;
    }

    determineNumber(graph: string[], row: number, col: number) {
        // traverse left to beginning of number
        let tempCol = col;
        while (this.withinGraph(graph, row, tempCol) && digits.includes(graph[row][tempCol])) {
            tempCol--;
        }
        tempCol++;

        let number = '';
        // traverse right to end of number
        while (this.withinGraph(graph, row, tempCol) && digits.includes(graph[row][tempCol])) {
            number += graph[row][tempCol]
            tempCol++;
        }

        console.log('NUMBER: ', parseInt(number));

        // replace this number with . to prevent duplicates
        // TODO: This marks the whole line with '.'?
        console.log('graph before: ', graph[row]);
        graph[row] = graph[row]
            .split('')
            .map((char, index) => {
                index <= tempCol ? '.' : char;
            }).join('');
        console.log('graph after: ', graph[row]);

        return parseInt(number);
    }
    
    solveForPartOne(input: string): number {
        const lines = splitLines(input);
        const partNumbers: number[] = [];

        // traverse the schematic
        for (let row = 0; row < lines.length; row++) {
            for (let col = 0; col < lines[row].length; col++) {
                // if digit found: search one level around digit for a symbol
                if (digits.includes(lines[row][col]) && this.adjacentToSymbol(lines, row, col)) {
                    // determine the number we are on
                    const number = this.determineNumber(lines, row, col);
                    partNumbers.push(number);
                }
            }
        }

        console.log('Part numbers: ', partNumbers);
        return partNumbers.reduce((a, b) => a + b);
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day3;