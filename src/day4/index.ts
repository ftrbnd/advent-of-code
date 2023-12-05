import { Day } from "../day";
import { splitLines } from "../util/splitLines";

class Day4 extends Day {

    constructor(){
        super(4);
    }

    solveForPartOne(input: string): number {
        const cards = splitLines(input);
        const pointsPerCard: number[] = [];

        for (const card of cards) {
            const [firstHalf, secondHalf] = card.split('|');
            
            // split winning numbers from my numbers    
            const winningNumbers = firstHalf
                .split(':')[1]
                .split(/\s+/)
                .filter(val => val); // ensure not empty
            
            const myNumbers = secondHalf
                .split(/\s+/)
                .filter(val => val); // ensure not empty
            
            
            // look for winning numbers in my own cards
            let pointValue = 0, powerValue = 0;
            for (const val of winningNumbers) {
                // the value of each winning number i have gets doubled (starting at 1) for each card
                if (myNumbers.includes(val)) {
                    pointValue = Math.pow(2, powerValue++);
                }
            }
            
            pointsPerCard.push(pointValue);
        }

        return pointsPerCard.reduce((a, b) => a + b);
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day4;