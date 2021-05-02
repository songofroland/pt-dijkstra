export type GraphRow = Array<number>;
export type Graph = Array<GraphRow>;

export enum GraphIndex {
  NODES = 0,
  EDGES = 1,
}

export class Edge {
  constructor(
    public from: number,
    public to: number,
  ) {}
  equals = (other: Edge) => {
    return (this.from === other.from && this.to === other.to) ||
      (this.from === other.to && this.to === other.from)
  };
};
export type DissasembledGraph = [Array<number>, Array<Edge>]


export interface Position {
  x: number;
  y: number;
};
export interface MappedNode extends Position {
  id: number; //TODO remove id
};
export interface MappedEdge {
  id: number; //TODO remove id
  from: Position,
  to: Position,
};
export type MappedGraph = [Array<MappedNode>, Array<MappedEdge>];


export interface LabeledNode extends MappedNode {
  label: string
};
export interface LabeledEdge extends MappedEdge {
  label: string
};
export type LabeledGraph = [Array<LabeledNode>, Array<LabeledEdge>];


export interface Algorithm {
  traversalHistory: Array<TraversalRecord>,
  paths: Paths,
};

export interface Paths {
    [key: number]: Array<number>
};

export interface TraversalRecord {
  node: number,
  lookups: Array<number>
};

export interface Frame {
  inactiveEdges: Array<Edge>,
  activeEdges: Array<Edge>,
};
