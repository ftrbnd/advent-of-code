import { Day } from "../day";
import { splitLines } from "../util/splitLines";

class Day2 extends Day {

    constructor(){
        super(2);
    }

    solveForPartOne(input: string): number {
        const bag = {
            red: 12,
            green: 13,
            blue: 14
        };
        let sum = 0;

        // split each line
        const games = splitLines(input);

        for (let i = 0; i <= games.length - 1; i++) {
            const gameId = i + 1;
            const game = games[i];
            
            // get each game's set
            const sets = game
                .replace(`Game ${gameId}: `, '')
                .split(';')
                .map(set => set.trim())
            
            let gameIsPossible = true;
            let setIndex = 0;
            // go through each set; ex: ['3 blue, 4 red', '1 red, 2 green']
            while (gameIsPossible && setIndex <= sets.length - 1) {
                const set = sets[setIndex];

                // split colors; ex: ['3 blue', '4 red']
                const colors = set
                    .split(',')
                    .map(color => color.trim());
                
                // go through each color and check if the amount is under the bag's amount
                for (const color of colors) {
                    const amount = parseInt(color.split(' ')[0]);
                    if (color.includes('red') && amount > bag.red) {
                        gameIsPossible = false;
                        break;
                    } else if (color.includes('green') && amount > bag.green) {
                        gameIsPossible = false;
                        break
                    } else if (color.includes('blue') && amount > bag.blue) {
                        gameIsPossible = false;
                        break
                    }
                }

                setIndex++;
            }
            
            if (gameIsPossible) {
                sum += gameId;
            }
        }
        return sum;
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day2;