import day1 from './index';

describe('On Day 1', () =>{
    it.only(`Part 1: sum of all calibration values`, () => {
        const input = `1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet`;

        expect(day1.solveForPartOne(input)).toBe(142);
    })
});