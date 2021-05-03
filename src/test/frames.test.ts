import createFrames from '../logic/graphFrames';
import { createFramesWithEdges } from '../logic/graphFrames';
import { Algorithm, DisassembledGraph, Edge } from '../logic/commonInterfaces';

const graph: DisassembledGraph = [[0, 1], [new Edge(0, 1)]];
const alg: Algorithm = {
  traversalHistory: [{ node: 0, lookups: [1] }],
  paths: {
    0: [],
    1: [0],
  },
};

const frames = createFrames(graph, alg)

test('Frame count', () => {
  expect(frames.length).toStrictEqual(2);
});

test('First frame is empty', () => {
  const f = frames[0];
  expect(f.activeEdges.length).toStrictEqual(0);
  expect(f.inactiveEdges.length).toStrictEqual(0);
});

test('Second frame is active edge', () => {
  const f = frames[1];
  expect(f.activeEdges.length).toStrictEqual(1);
  expect(f.inactiveEdges.length).toStrictEqual(0);
});
