import {DijkstraTracer} from '../logic/dijkstra';
import {testGraph, expectedHistoryFromFirstNode, expectedCostsFromLastNode, 
  expectedHistoryFromMiddleNode,expectedCostsFromMiddleNode,expectedPathsFromMiddleNode,
  expectedHistoryFromLastNode, expectedPathsFromFirstNode, expectedPathsFromLastNode,
  expectedCostsFromFirstNode,
} from './calculatedResults';


test('Paths, costs and traversal history set correctly from first node', () => {
  const tracer = new DijkstraTracer(testGraph, 0);
  expect(tracer.paths).toStrictEqual(expectedPathsFromFirstNode);
  expect(tracer.costs).toStrictEqual(expectedCostsFromFirstNode);
  expect(tracer.traversalHistory).toStrictEqual(expectedHistoryFromFirstNode);
});

test('Paths, costs and traversal history set correctly from middle node', () => {
  const tracer = new DijkstraTracer(testGraph, 3);
  expect(tracer.paths).toStrictEqual(expectedPathsFromMiddleNode);
  expect(tracer.costs).toStrictEqual(expectedCostsFromMiddleNode);
  expect(tracer.traversalHistory).toStrictEqual(expectedHistoryFromMiddleNode);
});

test('Paths, costs and traversal history set correctly from last node', () => {
  const tracer = new DijkstraTracer(testGraph, 6);
  expect(tracer.paths).toStrictEqual(expectedPathsFromLastNode);
  expect(tracer.costs).toStrictEqual(expectedCostsFromLastNode);
  expect(tracer.traversalHistory).toStrictEqual(expectedHistoryFromLastNode);
});
