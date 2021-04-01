export type GraphRow = Array<number>;
export type Graph = Array<GraphRow>;

export interface MappedNode {
  label?: string;
  id: number;
  x: number;
  y: number;
}

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
}
