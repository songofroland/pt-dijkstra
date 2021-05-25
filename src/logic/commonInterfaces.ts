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
    public label?: string,
  ) {}
  equals = (other: Edge) => {
    return (this.from === other.from && this.to === other.to) ||
      (this.from === other.to && this.to === other.from);
  };
};
export type DisassembledGraph = [Array<number>, Array<Edge>]


export interface Position {
  x: number;
  y: number;
};

export interface MappedNode extends Position {};

export interface MappedEdge {
  from: Position,
  to: Position,
  label?: string,
};
export type MappedGraph = [Array<MappedNode>, Array<MappedEdge>];


export interface LabeledNode extends MappedNode {
  label: string
};
export interface LabeledEdge extends MappedEdge {
  label: string
};
export type LabeledGraph = [Array<LabeledNode>, Array<LabeledEdge>];


export interface Paths {
    [key: number]: Array<number>
};

export interface TraversalRecord {
  node: number,
  lookups: Array<number>
};

export interface Algorithm {
  traversalHistory: Array<TraversalRecord>,
  paths: Paths,
};

export interface Frame {
  activeEdges: Array<number>,
  currentEdges: Array<number>,
};
