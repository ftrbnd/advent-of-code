import day6 from './index';

describe('On Day 6', () =>{
    it.skip(`Part 1: determine the number of ways you could beat the record in each race`, () => {
        const input = 'Time:      7  15   30\nDistance:  9  40  200'

        expect(day6.solveForPartOne(input)).toBe(288);
    })
});