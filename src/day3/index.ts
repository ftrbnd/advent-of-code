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

            if (this.withinGraph(graph, newRow, newCol) && !notSymbols.includes(graph[newRow][newCol])) {
                return true;
            }
        }

        return false;
    }

    determineCurrentNumber(graph: string[], row: number, col: number) {
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

        const visited: number[][] = [];
        // replace this number with '.' to prevent duplicates
        // TODO: this creates problems for part 2
        graph[row] = graph[row]
            .split('')
            .map((char, index) => {
                if (index < tempCol && digits.includes(char)) {
                    visited.push([row, index]);
                    return '.';
                }
                return char;
            })
            .join('');

        return {
            currentNumber: parseInt(number),
        };
    }
    
    solveForPartOne(input: string): number {
        const lines = splitLines(input).map(line => line.replace('\r', ''));
        const partNumbers: number[] = [];

        // traverse the schematic
        for (let row = 0; row < lines.length; row++) {
            for (let col = 0; col < lines[row].length; col++) {
                // if digit found: search one level around digit for a symbol
                if (digits.includes(lines[row][col]) && this.adjacentToSymbol(lines, row, col)) {
                    // determine the number we are on
                    const number = this.determineCurrentNumber(lines, row, col).currentNumber;
                    partNumbers.push(number);
                }
            }
        }

        return partNumbers.reduce((a, b) => a + b);
    }

    // travel around asterisk * and find numbers adjacent to it
    findAdjacentNumbers(graph: string[], row: number, col: number): number[] {
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [-1, 1], [1, -1], [-1, -1]];
        const numbers: number[] = []; 

        for (const dir of directions) {
            const [newRow, newCol] = [row + dir[0], col + dir[1]];

            if (this.withinGraph(graph, newRow, newCol) && digits.includes(graph[newRow][newCol])) {
                const { currentNumber } = this.determineCurrentNumber(graph, newRow, newCol);
                numbers.push(currentNumber);
            }
        }

        return numbers;
    }

    solveForPartTwo(input: string): number {
        const lines = splitLines(input).map(line => line.replace('\r', ''));
        const gearRatios: number[] = [];

        // loop through lines and search for an asterisk *
        for (let row = 0; row < lines.length; row++) {
            for (let col = 0; col < lines[row].length; col++) {
                if (lines[row][col] === '*') {
                    // go one level around the asterisk
                    const numbers = this.findAdjacentNumbers(lines, row, col);
                    // check if you find exactly 2 adjacent numbers
                    if (numbers.length === 2) {
                        // multiple those numbers together to get the gear ratio
                        const gearRatio = numbers[0] * numbers[1];
                        gearRatios.push(gearRatio);
                    }
                }
            }
        }

        // return the sum of all gear ratios
        return gearRatios.reduce((a, b) => a + b);
    }
}

export default new Day3;