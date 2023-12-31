import day9 from './index';

describe('On Day 9', () =>{
    it(`Part 1: get the sum of next history values from OASIS report`, () => {
        const input = '0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45';

        expect(day9.solveForPartOne(input)).toBe(114);
    })

    it(`Part 2: get the sum of previous history values from OASIS report`, () => {
        const input = '0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45';
        
        expect(day9.solveForPartTwo(input)).toBe(2);
    })
});