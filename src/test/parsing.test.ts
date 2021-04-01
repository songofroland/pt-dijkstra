import { isSquare, isTriangle, isValid, parse } from '../logic/graphParsing';
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
    [1, 1],
    [1]
];
const empty: Graph = [];

const squareGraphString = '\n   1  1 1\n\n    1 1 1\n1 1 1\n\n\n\n';
const traingleGraphString = ' 1  1  1\n \n 1 1 \n  1 '
const invalidGraphString = '11 1\n1 1 1\n1 1 1';

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

test('isVaid', () => {
    expect(isValid(squareGraphString)).toBeTruthy();
    expect(isValid(invalidGraphString)).toBeFalsy();
})

test('parse', () => {
    expect(parse(squareGraphString)).toStrictEqual(squareGraph);
    expect(parse(traingleGraphString)).toStrictEqual(squareGraph);
})
