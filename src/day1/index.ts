import { Day } from "../day";

const splitLines = (input: string) => {
    return input.split("\n");
}



class Day1 extends Day {

    constructor(){
        super(1);
    }

    solveForPartOne(input: string): string {
        const lines = splitLines(input);

        for (const line of lines) {
            let left = 0;
            let right = lines.length - 1;

            
        }
        
        return input;
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day1;