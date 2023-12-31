import day3 from './index';

describe('On Day 3', () =>{
    it.skip(`Part 1: sum of part numbers in engine schematic`, () => {
        const input = `467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..`;

        expect(day3.solveForPartOne(input)).toBe(4361);
    })

    it.skip(`Part 2: sum of all gear ratios in engine schematic`, () => {
        const input = `467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..`;

        expect(day3.solveForPartTwo(input)).toBe(467835);
    })
});