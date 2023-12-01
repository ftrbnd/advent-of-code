import { Day } from "../day";

const splitLines = (input: string) => {
    return input.split("\n");
}

class Day1 extends Day {

    constructor(){
        super(1);
    }

    solveForPartOne(input: string): number {
        const lines = splitLines(input);
        const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        const calibrationValues: number[] = [];

        for (const line of lines) {
            let firstDigit = 0;
            let lastDigit = 0;
            
            // look for first digit
            for (let i = 0; i < line.length; i++) {
                if (digits.includes(line[i])) {
                    firstDigit = parseInt(line[i]);
                    break;
                }
            }

            // look for last digit
            for (let i = line.length - 1; i >= 0; i--) {
                if (digits.includes(line[i])) {
                    lastDigit = parseInt(line[i]);
                    break;
                }
            }

            calibrationValues.push(firstDigit * 10 + lastDigit)
        }
        
        return calibrationValues.reduce((a, b) => a + b, 0);
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day1;