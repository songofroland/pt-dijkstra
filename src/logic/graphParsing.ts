import {Graph, GraphRow} from './commonInterfaces';

function toMatrix(text: string): Graph {
  const rows = text.split('\n');
  return rows
    .map((row: string) =>
      row.split(' ')
        .map((element: string) => parseInt(element))
        .filter((element: number) => !Number.isNaN(element)),
    )
    .filter((row: GraphRow) => row.length !== 0);
}

export function isSquare(graph: Graph) : boolean {
  const squareSideLength = graph.length;
  return graph.every(row => row.length === squareSideLength);
}

function hasZerosOnDiagonal(graph: Graph): boolean {
  for (let i = 0; i < graph.length; i++) {
    if (graph[i][i] !== 0) return false
  }
  return true;
}

export function isValid(text: string): boolean {
  const graph = toMatrix(text);
  return !!graph.length && isSquare(graph) && hasZerosOnDiagonal(graph);
}

/**
 * Parses text into graph
 * @param text Should be checked with 'isValid(text)' before.
 */
export function parseValidGraph(text: string): Graph {
  const graph = toMatrix(text);
  return graph;
}
