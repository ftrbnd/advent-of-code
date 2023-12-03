import day1 from './index';

describe('On Day 1', () =>{
    it.skip(`Part 1: sum of all calibration values`, () => {
        const input = `1abc2
            pqr3stu8vwx
            a1b2c3d4e5f
            treb7uchet`;

        expect(day1.solveForPartOne(input)).toBe(142);
    })

    it.skip('Part 2: sum of calibration values with strings', () => {
        const input = `two1nine
            eightwothree
            abcone2threexyz
            xtwone3four
            4nineeightseven2
            zoneight234
            7pqrstsixteen`;

        expect(day1.solveForPartTwo(input)).toBe(281);
    }); 
});