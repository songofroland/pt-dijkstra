export type GraphRow = Array<number>;
export type Graph = Array<GraphRow>;

export interface MappedNode {
  label?: string;
  id: number;
  x: number;
  y: number;
};

export interface MappedEdge {
  id: number;
  label?: string;
  from: {
    x: number,
    y: number,
  };
  to: {
    x: number,
    y: number,
  };
};

export interface Paths {
    [key: number]: Array<number>
};

export class Edge {
  label?: number;
  from: number;
  to: number;
  equals = (other: Edge) => {
    return this.label === other.label && (
      (this.from === other.from && this.to === other.to) ||
      (this.from === other.to && this.to === other.from)
    )
  };
  constructor(from: number, to: number, label?: number) {
    this.from = from;
    this.to = to;
    this.label = label;
  }
};

export interface TraversalRecord {
  node: number,
  lookups: Array<number>
};
