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

const SWITCH_ALGORITHM_ABOVE_X_NODES = 10;
const CIRCLE_RADIUS = 40;


export default function mapGraph(graph: DisassembledGraph): MappedGraph {
  return calcNodes(graph[GraphIndex.NODES], graph[GraphIndex.EDGES]);
}

function calcNodes(nodes: Array<number>, edges: Array<Edge>):
  [Array<MappedNode>, Array<MappedEdge>] {

  const mappedNodes = placeNodes(nodes, edges);
  const mappedEdges = edges.map((edge: Edge, i) => {
    const defaultNode = { x: 0, y: 0 };
    const nodeFrom = mappedNodes.find((_, i) => i === edge.from) ?? defaultNode;
    const nodeTo = mappedNodes.find((_, i) => i === edge.to) ?? defaultNode;
    return {
      label: edge.label,
      from: { x: nodeFrom.x, y: nodeFrom.y },
      to: { x: nodeTo.x, y: nodeTo.y },
    };
  });
  return [mappedNodes, mappedEdges];
}

function placeNodes(nodes: Array<number>, edges: Array<Edge>): Array<MappedNode> {
  if (nodes.length > SWITCH_ALGORITHM_ABOVE_X_NODES) {
    return placeRandomly(nodes, edges);
  }
  return placeOnCircle(nodes, edges);
}

function placeOnCircle(nodes: Array<number>, edges: Array<Edge>): Array<MappedNode> {
  const angleStep = 360 / nodes.length;
  const center = { x: 50, y: 50 };
  return nodes.map((node: number) =>
    getPositionOnCircle(node * angleStep, CIRCLE_RADIUS, center));
}

/**
 * It won't place nodes too close together. RNG's seed is graph for consistency.
 */
function placeRandomly(nodes: Array<number>, edges: Array<Edge>): Array<MappedNode> {
  const seed = nodes.toString() + edges.toString();
  const gen = typedGenerator(seed);
  const dissallowedRadius = getDissallowedRadiusBasedOnDensity(nodes.length);
  const positions = positionGenerator(gen, dissallowedRadius);

  return nodes.map(_ => positions.next().value);
}

/**
 * Uses algorithm (x, y) = (xO + r * cos(theta), yO + r * sin(theta))
 */
function getPositionOnCircle(angle: number, radius: number, center: Position): Position {
  const theta = (Math.PI / 180) * angle;
  const x = center.x + (radius * Math.cos(theta));
  const y = center.y + (radius * Math.sin(theta));
  return { x, y };
}

/**
 * Wraps old js module to provide type hints (or w/e ts calls it).
 */
function* typedGenerator(seed: string): Generator<number> {
  const gen = new rand(seed);
  while (true) {
    yield gen.random();
  }
}

function* positionGenerator(rng: Generator<number>, disallowedRadius: number)
  : Generator<Position> {
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

function getDissallowedRadiusBasedOnDensity(numberOfNodes: number): number {
  // This should do the job just fine. Might change later.
  return Math.floor((1 / Math.pow(numberOfNodes, 2)) * 100);
}

function isAllowed(
  position: Position,
  usedPositions: Array<Position>,
  disallowedRadius: number,
): boolean {
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
