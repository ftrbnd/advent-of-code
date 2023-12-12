import { Day } from "../day";
import { splitLines } from "../util/splitLines";

class Day9 extends Day {

    constructor(){
        super(9);
    }

    getNextValue(nums: number[]): number {
        if (nums.every(num => num === 0)) {
            return 0;
        }

        const differences: number[] = [];
        for (let i = 1; i < nums.length; i++) {
            differences.push(nums[i] - nums[i - 1]);
        }

        return this.getNextValue(differences) + nums[nums.length - 1];
    }

    solveForPartOne(input: string): number {
        const lines = splitLines(input);
        const nextHistoryValues: number[] = [];

        for (const line of lines) {
            const history = line.split(' ').map(Number);
            
            const nextHistoryValue = this.getNextValue(history);
            nextHistoryValues.push(nextHistoryValue);
        }

        return nextHistoryValues.reduce((a, b) => a + b);
    }

    getPreviousValue(nums: number[]): number {
        if (nums.every(num => num === 0)) {
            return 0;
        }

        const differences: number[] = [];
        for (let i = 1; i < nums.length; i++) {
            differences.push(nums[i] - nums[i - 1]);
        }

        return nums[0] - this.getPreviousValue(differences);
    }

    solveForPartTwo(input: string): number {
        const lines = splitLines(input);
        const previousHistoryValues: number[] = [];

        for (const line of lines) {
            const history = line.split(' ').map(Number);
            
            const nextHistoryValue = this.getPreviousValue(history);
            previousHistoryValues.push(nextHistoryValue);
        }

        return previousHistoryValues.reduce((a, b) => a + b);
    }
}

export default new Day9;