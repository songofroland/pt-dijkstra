export type GraphRow = Array<number>;
export type Graph = Array<GraphRow>;

export interface Position {
  x: number;
  y: number;
};

export interface MappedNode {
  label?: string;
  id: number;
  x: number;
  y: number;
};

export interface MappedEdge {
  id: number;
  label?: string;
  from: Position,
  to: Position,
};

export interface Paths {
    [key: number]: Array<number>
};

export class Edge {
  constructor(
    public from: number,
    public to: number,
    public label?: number
  ) {}
  equals = (other: Edge) => {
    return this.label === other.label && (
      (this.from === other.from && this.to === other.to) ||
      (this.from === other.to && this.to === other.from)
    )
  };
};

export interface TraversalRecord {
  node: number,
  lookups: Array<number>
};
