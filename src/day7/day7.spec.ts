import day7 from './index';

describe('On Day 7', () =>{
    it(`Part 1: get the total winnings from hands`, () => {
        const input = '32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483';
        
        expect(day7.solveForPartOne(input)).toBe(6440);
    })
});