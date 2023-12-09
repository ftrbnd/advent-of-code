import day8 from './index';

describe('On Day 8', () =>{
    it(`Part 1: find how many steps it takes to reach ZZZ`, () => {
        const input = 'RL\n\nAAA = (BBB, CCC)\nBBB = (DDD, EEE)\nCCC = (ZZZ, GGG)\nDDD = (DDD, DDD)\nEEE = (EEE, EEE)\nGGG = (GGG, GGG)\nZZZ = (ZZZ, ZZZ)';

        expect(day8.solveForPartOne(input)).toBe(2);
    })

    it(`Part 2: find how many steps it takes for all nodes ending with 'A' to simultaneously reach nodes that end in 'Z'`, () => {
        const input = 'LR\n\n11A = (11B, XXX)\n11B = (XXX, 11Z)\n11Z = (11B, XXX)\n22A = (22B, XXX)\n22B = (22C, 22C)\n22C = (22Z, 22Z)\n22Z = (22B, 22B)'

        expect(day8.solveForPartTwo(input)).toBe(6);
    })
});