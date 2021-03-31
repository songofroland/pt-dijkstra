import { isSquare, isTriangle, isValid } from '../logic/graphParsing';
import { Graph } from '../logic/commonInterfaces';

const squareGraph = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
];
const invalidGraph = [
    [1, 1, 1],
    [],
    []
];
const traingleGraph = [
    [1, 1, 1],
    [2, 2,],
    [3]
];
const empty: Graph = [];

test('isSquare', () => {
    expect(isSquare(squareGraph)).toBeTruthy();
    expect(isSquare(invalidGraph)).toBeFalsy();
    expect(isSquare(traingleGraph)).toBeFalsy();
    expect(isSquare(empty)).toBeTruthy();
});

test('isTriangle', () => {
    expect(isTriangle(traingleGraph)).toBeTruthy();
    expect(isTriangle(squareGraph)).toBeFalsy();
    expect(isTriangle(invalidGraph)).toBeFalsy();
    expect(isTriangle(empty)).toBeTruthy();
})

test('precheck', () => {
    const validGraph = '\n   1  1 1\n\n    1 1 1\n1 1 1\n\n\n\n';
    const invalidGraph = '11 1\n1 1 1\n1 1 1';
    expect(isValid(validGraph)).toBeTruthy();
    expect(isValid(invalidGraph)).toBeFalsy();
})