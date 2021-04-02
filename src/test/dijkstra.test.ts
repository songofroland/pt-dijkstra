import {dijkstraTracer} from '../logic/dijkstra';

// TODO: test more graphs
const myGraph = [
  [0, 2, 6, 0, 0, 0, 0],
  [2, 0, 0, 5, 0, 0, 0],
  [6, 0, 0, 8, 0, 0, 0],
  [0, 5, 8, 0, 10, 15, 0],
  [0, 0, 0, 10, 0, 6, 2],
  [0, 0, 0, 15, 6, 0, 6],
  [0, 0, 0, 0, 2, 6, 0],
];

const expectedCosts = {
  0: 0,
  1: 2,
  2: 6,
  3: 7,
  4: 17,
  5: 22,
  6: 19,
};

const expectedPaths = {
  0: [],
  1: [0],
  2: [0],
  3: [0, 1],
  4: [0, 1, 3],
  5: [0, 1, 3],
  6: [0, 1, 3, 4],
};

const expectedHistory =  [
  { node: 0, lookups: [ 1, 2 ] },
  { node: 1, lookups: [ 0, 3 ] },
  { node: 2, lookups: [ 0, 3 ] },
  { node: 3, lookups: [ 1, 2, 4, 5 ] },
  { node: 4, lookups: [ 3, 5, 6 ] },
  { node: 6, lookups: [ 4, 5 ] },
  { node: 5, lookups: [ 3, 4, 6 ] },
]

test('basic dijkstra', () => {
  const tracer = new dijkstraTracer(myGraph, 0);
  expect(tracer.paths).toStrictEqual(expectedPaths);
  expect(tracer.costs).toStrictEqual(expectedCosts);
  expect(tracer.traversalHistory).toStrictEqual(expectedHistory);
});
