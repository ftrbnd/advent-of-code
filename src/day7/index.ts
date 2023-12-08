import { Day } from "../day";
import { splitLines } from "../util/splitLines";

class Day7 extends Day {

    constructor(){
        super(7);
    }

    /**
        Five of a kind: 7
        Four of a kind: 6
        Full house: 5
        Three of a kind: 4
        Two pair: 3
        One pair: 2
        High card: 1
     */
    getHandType(hand: string): number {
        const counts = new Map<string, number>();

        for (const card of hand) {
            const prevCount = counts.get(card) ?? 0;
            counts.set(card, prevCount + 1);
        }

        switch (counts.size) {
            case 1:
                return 7;
            case 2: {
                // four of a kind or full house
                for (const value of counts.values()) {
                    if (value === 4 || value === 1) {
                        return 6;
                    } else if (value === 3 || value === 2) {
                        return 5;
                    }
                }
            }
            case 3: {
                // three of a kind or two pair
                for (const value of counts.values()) {
                    if (value === 3) {
                        return 4;
                    } else if (value === 2) {
                        return 3;
                    }
                }
            }
            case 4:
                return 2;
            case 5:
                return 1;
        }

        return -1;
    }

    // return greater of handOne vs handTwo
    secondOrderCompare(handOne: string, handTwo: string): number {
        const labels = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2'];

        for (let i = 0; i < handOne.length; i++) {
            const [labelOne, labelTwo] = [handOne[i], handTwo[i]];

            if (labelOne === labelTwo) continue;

            return labels.indexOf(labelOne) < labels.indexOf(labelTwo) ? -1 : 1;
        }

        return 0;
    }

    getHandTypeJoker(hand: string): number {
        const counts = new Map<string, number>();

        for (const card of hand) {
            const prevCount = counts.get(card) ?? 0;
            counts.set(card, prevCount + 1);
        }
        const jokerCount = counts.get('J') ?? 0;

        switch (counts.size) {
            case 1:
                return 7;
            case 2: {
                // four of a kind or full house
                for (const value of counts.values()) {
                    if (value === 4 || value === 1) {
                        return hand.includes('J') ? 7 : 6;
                    } else if (value === 3 || value === 2) {
                        return hand.includes('J') ? 7 : 5;
                    }
                }
            }
            case 3: {
                // three of a kind or two pair
                for (const value of counts.values()) {
                    if (value === 3) {
                        return hand.includes('J') ? 6 : 4;
                    } else if (value === 2) { // jokerCount can be 1 or 2
                        return hand.includes('J') ? 4 + jokerCount : 3;
                    }
                }
            }
            case 4:
                return hand.includes('J') ? 4 : 2;
            case 5:
                return hand.includes('J') ? 2 : 1;
        }

        return -1;
    }

    secondOrderCompareJoker(handOne: string, handTwo: string): number {
        const labels = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

        for (let i = 0; i < handOne.length; i++) {
            const [labelOne, labelTwo] = [handOne[i], handTwo[i]];

            if (labelOne === labelTwo) continue;

            return labels.indexOf(labelOne) < labels.indexOf(labelTwo) ? -1 : 1;
        }

        return 0;
    }

    solveForPartOne(input: string): number {
        const hands = splitLines(input).map(line => line.split(' ').map(val => val.replace('\r', '')));

        hands.sort((a, b) => {
            const typeDifference = this.getHandType(b[0]) - this.getHandType(a[0]);
            return typeDifference === 0 ? this.secondOrderCompare(a[0], b[0]) : typeDifference;
        })

        const winnings: number[] = [];
        let rank = hands.length;
        for (const [hand, bid] of hands) {
            winnings.push(parseInt(bid) * rank--);
        }
        
        return winnings.reduce((a, b) => a + b);
    }

    solveForPartTwo(input: string): number {
        const hands = splitLines(input).map(line => line.split(' ').map(val => val.replace('\r', '')));

        hands.sort((a, b) => {
            const typeDifference = this.getHandTypeJoker(b[0]) - this.getHandTypeJoker(a[0]);
            return typeDifference === 0 ? this.secondOrderCompareJoker(a[0], b[0]) : typeDifference;
        })

        const winnings: number[] = [];
        let rank = hands.length;
        for (const [hand, bid] of hands) {
            winnings.push(parseInt(bid) * rank--);
        }
        
        return winnings.reduce((a, b) => a + b);
    }
}

export default new Day7;