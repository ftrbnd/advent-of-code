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

        // replace this number with '.' to prevent duplicates
        graph[row] = graph[row]
            .split('')
            .map((char, index) => index < tempCol && digits.includes(char) ? '.' : char)
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
    
    determineCurrentNumberWithoutReplacing(graph: string[], row: number, col: number) {
        // traverse left to beginning of number
        let tempCol = col;
        while (this.withinGraph(graph, row, tempCol) && digits.includes(graph[row][tempCol])) {
            tempCol--;
        }
        tempCol++;

        const start = tempCol;

        let number = '';
        // traverse right to end of number
        while (this.withinGraph(graph, row, tempCol) && digits.includes(graph[row][tempCol])) {
            number += graph[row][tempCol]
            tempCol++;
        }

        const end = tempCol - 1;

        const columnsCovered = [start, end]

        return {
            currentNumber: parseInt(number),
            rowCovered: row,
            columnsCovered // inclusive
        };
    }

    // travel around asterisk * and find numbers adjacent to it
    findAdjacentNumbers(graph: string[], row: number, col: number): number[] {
        const directions = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [-1, 1], [1, -1], [-1, -1]];
        const numbers: number[] = []; 

        const rowsCovered: number[] = [];
        const columnRangesCovered: number[][] = [];

        for (const dir of directions) {
            const [newRow, newCol] = [row + dir[0], col + dir[1]];

            if (rowsCovered.includes(newRow) && columnRangesCovered.some(colRange => colRange[0] <= newCol && newCol <= colRange[1])) {
                continue;
            }

            if (this.withinGraph(graph, newRow, newCol) && digits.includes(graph[newRow][newCol])) {
                const { currentNumber, rowCovered, columnsCovered } = this.determineCurrentNumberWithoutReplacing(graph, newRow, newCol);
                numbers.push(currentNumber);
                rowsCovered.push(rowCovered);
                columnRangesCovered.push(columnsCovered);
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