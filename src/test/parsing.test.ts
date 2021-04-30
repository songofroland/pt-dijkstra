import { isSquare, isValid, parseValidGraph } from '../logic/graphParsing';
import { Graph } from '../logic/commonInterfaces';

const squareGraph = [
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 0],
];
const invalidGraph = [
    [1, 1, 1],
    [],
    [],
];
const noDiagonalGraph = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 0]
]
const empty: Graph = [];

const squareGraphString = '\n   0  1 1\n\n    1 0 1\n1 1 0\n\n\n\n';
const invalidGraphString = '11 1\n1 1 1\n1 1 1';
const noDiagonalGraphString = '\n  1  1 1\n\n   1 1 1\n1 1 0\n\n\n\n';
const emptyGraphString = '\n\n  aasd \n ';

test('isSquare', () => {
    expect(isSquare(squareGraph)).toBeTruthy();
    expect(isSquare(invalidGraph)).toBeFalsy();
    expect(isSquare(noDiagonalGraph)).toBeTruthy();
    expect(isSquare(empty)).toBeTruthy();
});

test('isValid', () => {
    expect(isValid(squareGraphString)).toBeTruthy();
    expect(isValid(invalidGraphString)).toBeFalsy();
    expect(isValid(noDiagonalGraphString)).toBeFalsy();
    expect(isValid(emptyGraphString)).toBeFalsy();
});

test('parseValidGraph', () => {
    expect(parseValidGraph(squareGraphString)).toStrictEqual(squareGraph);
});
