import day3 from './index';

describe('On Day 3', () =>{
    it.only(`Part 1: sum of part numbers in engine schematic`, () => {
        const input = `
            467..114..
            ...*......
            ..35..633.
            ......#...
            617*......
            .....+.58.
            ..592.....
            ......755.
            ...$.*....
            .664.598..
        `;

        expect(day3.solveForPartOne(input)).toBe(4361);
    })
});