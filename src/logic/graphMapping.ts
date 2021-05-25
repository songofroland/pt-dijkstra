import {
  MappedEdge, 
  MappedNode,
  Edge,
  MappedGraph,
  GraphIndex,
  DisassembledGraph,
  Position,
} from './commonInterfaces';
const rand = require('random-seed');


export default function mapGraph(graph: DisassembledGraph): MappedGraph {
  return calcNodes(graph[GraphIndex.NODES], graph[GraphIndex.EDGES]);
}

function* typedGenerator(seed: string) : Generator<number> {
  const gen = new rand(seed);
  while (true) {
    yield gen.random();
  }
}

function getDissallowedRadiusBasedOnDensity(numberOfNodes: number): number {
  // This should do the job just fine. Might change later.
  return Math.floor((1 / Math.pow(numberOfNodes, 2)) * 100);
}

function isAllowed(
  position: Position,
  usedPositions: Array<Position>,
  disallowedRadius: number,
) : boolean
{
  const getDistance = (a: Position, b: Position) => {
    return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(b.y - b.y, 2));
  };

  const isOneAllowed = (p: Position) => {
    const distance = getDistance(p, position);
    return distance > disallowedRadius;
  };

  for (let checking of usedPositions) {
    if (!isOneAllowed(checking)) return false;
  }
  return true;
}

function* positionGenerator(rng: Generator<number>, disallowedRadius: number)
  : Generator<Position>
{
  const usedPositions: Array<Position> = [];
  while (true) {
    const position = {
      x: rng.next().value * 100,
      y: rng.next().value * 100,
    };
    if (isAllowed(position, usedPositions, disallowedRadius)) {
      usedPositions.push(position);
      yield position;
    }
  }
}

function calcNodes(nodes: Array<number>, edges: Array<Edge>):
  [Array<MappedNode>, Array<MappedEdge>]
{
  const seed = nodes.toString() + edges.toString();
  const gen = typedGenerator(seed);
  const dissallowedRadius = getDissallowedRadiusBasedOnDensity(nodes.length);
  const positions = positionGenerator(gen, dissallowedRadius);

  const mappedNodes = nodes.map(_ => positions.next().value);

  const mappedEdges = edges.map((edge: Edge, i) => {
    const defaultNode = { x: 0, y: 0 };
    const node1 = mappedNodes.find((_, i) => i === edge.from) ?? defaultNode;
    const node2 = mappedNodes.find((_, i) => i === edge.to) ?? defaultNode;
    return {
      label: edge.label,
      from: { x: node1.x, y: node1.y },
      to: { x: node2.x, y: node2.y },
    };
  });
  return [mappedNodes, mappedEdges];
}
