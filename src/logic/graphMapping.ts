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

const PLACE_RANDOMLY_ABOVE_X_NODES = 10;
const CIRCLE_RADIUS_PERCENT = 40;


interface NodePlacemntAlgorithm {
  place: Function,
}

export default function mapGraph(graph: DisassembledGraph): MappedGraph {
  const [nodes, edges] = graph;

  const mappedNodes = placeNodes(nodes, edges);
  const mappedEdges = placeEdges(mappedNodes, edges);
  
  return [mappedNodes, mappedEdges];
}

function placeEdges(mappedNodes: Array<MappedNode>, edges: Array<Edge>): Array<MappedEdge> {
  const defaultNode = { x: 0, y: 0 };
  return edges.map((edge: Edge, i) => {

    const nodeFrom = mappedNodes.find((_, id) => id === edge.from) ?? defaultNode;
    const nodeTo = mappedNodes.find((_, id) => id === edge.to) ?? defaultNode;

    return {
      label: edge.label,
      from: { x: nodeFrom.x, y: nodeFrom.y },
      to: { x: nodeTo.x, y: nodeTo.y },
    };

  });
}

function placeNodes(nodes: Array<number>, edges: Array<Edge>): Array<MappedNode> {
  const useRandom = nodes.length > PLACE_RANDOMLY_ABOVE_X_NODES;
  const placementAlgorithm = useRandom ? new RandomPlacement : new CirclePlacement;
  return placementAlgorithm.place(nodes, edges);
}

class CirclePlacement implements NodePlacemntAlgorithm {

  place(nodes: Array<number>, edges: Array<Edge>): Array<MappedNode> {
    const angleStep = 360 / nodes.length;
    const center = { x: 50, y: 50 };
    return nodes.map((node: number) =>
      this.getPositionOnCircle(node * angleStep, CIRCLE_RADIUS, center));
  }

  getPositionOnCircle(angle: number, radius: number, center: Position): Position {
    //Uses algorithm (x, y) = (xO + r * cos(theta), yO + r * sin(theta))
    const theta = (Math.PI / 180) * angle;
    const x = center.x + (radius * Math.cos(theta));
    const y = center.y + (radius * Math.sin(theta));
    return { x, y };
  }
}

class RandomPlacement implements NodePlacemntAlgorithm {

  /**
   * It won't place nodes too close together.
   * The generated positions will always be the same for the same graph.
   */
  place(nodes: Array<number>, edges: Array<Edge>): Array<MappedNode> {
    const seed = nodes.toString() + edges.toString();
    const gen = this.typedGenerator(seed);
    const dissallowedRadius = this.getDissallowedRadiusBasedOnDensity(nodes.length);
    const positions = this.positionGenerator(gen, dissallowedRadius);

    return nodes.map(_ => positions.next().value);
  }

  /**
   * Wraps old js module to provide type hints (or w/e ts calls it).
   */
  typedGenerator = function* (seed: string): Generator<number> {
    const gen = new rand(seed);
    while (true) {
      yield gen.random();
    }
  }

  getDissallowedRadiusBasedOnDensity(numberOfNodes: number): number {
    return Math.floor((1 / Math.pow(numberOfNodes, 2)) * 100);
  }

  positionGenerator = function* (rng: Generator<number>, disallowedRadius: number)
    : Generator<Position> {
    const usedPositions: Array<Position> = [];

    const isAllowed = (
      position: Position,
      usedPositions: Array<Position>,
      disallowedRadius: number,
    ): boolean => {
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
}
