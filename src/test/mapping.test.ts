import { labelGen } from '../logic/graphLabeling'
import { Edge } from '../logic/commonInterfaces'
import { getEdgesArray } from '../logic/graphDisassembling';

const EDGE_EXTRACTION_TIMEOUT_MS = 50;

const simpleGraph = [
  [0, 1],
  [1, 0]
];

const normalGraph = [
  [0, 2, 6, 0, 3],
  [2, 0, 6, 0, 2],
  [6, 6, 0, 0, 1],
  [0, 0, 0, 0, 3],
  [3, 2, 1, 3, 0],
];

test('alphabetical edges generatation', () => {
  const generator = labelGen();
  const results = Array.from({ length: 55 }, () => generator.next().value);
  expect(results.slice(0, 3)).toStrictEqual(['A', 'B', 'C']);
  expect(results.slice(26, 29)).toStrictEqual(['AA', 'AB', 'AC']);
  expect(results.slice(52, 55)).toStrictEqual(['BA', 'BB', 'BC']);
});

test('edges extraction', () => {
  const simpleGraphExpectedEdge = new Edge(0, 1);
  const normalGraphExpectedEdges = [
    new Edge(0, 1),
    new Edge(0, 2),
    new Edge(0, 4),
    new Edge(1, 2),
    new Edge(1, 4),
    new Edge(2, 4),
    new Edge(3, 4),
  ];
  expect(simpleGraphExpectedEdge.equals(getEdgesArray(simpleGraph)[0]))
  //TODO check for normal graph
});

test('edges extraction time', () => {
  const tStart = performance.now();
  getEdgesArray(normalGraph);
  const tFinish = performance.now()
  expect(tFinish - tStart).toBeLessThan(EDGE_EXTRACTION_TIMEOUT_MS);
  // TODO don't wait for edges to be extracted. Break if time exceeds ^value.
})
