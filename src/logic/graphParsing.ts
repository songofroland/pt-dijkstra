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

export function isTriangle(graph: Graph): boolean {
  let correctRowLenght = graph.length;
  for (const graphRow of graph) {
    if (correctRowLenght === 0) break;
    if (graphRow.length !== correctRowLenght) return false;
    correctRowLenght--;
  }
  return true;
}

export function isValid(text: string): boolean {
  const graph = toMatrix(text);
  if (!graph.length) return false;
  return isSquare(graph) || isTriangle(graph);
}

function mirrorDiagonally(x: number, y: number, squareSide: number):
  [number, number]
{
  const distanceFromSide = squareSide - y - 1;
  const distanceFromBottom = squareSide - x - 1;
  return [distanceFromBottom, distanceFromSide];
}

function squareGraph(graph: Graph): Graph {
  const squareSide = graph.length;
  for (let x = 0; x < squareSide; x++) {
    for (let y = 0; y < squareSide; y++ ) {
      if (graph[x][y] === undefined) {
        const [x_m, y_m] = mirrorDiagonally(x, y, squareSide);
        graph[x][y] = graph[x_m][y_m];
      }
    }
  }
  return graph;
}

/**
 * Parses text into graph
 * @param text Should be checked with 'isValid(text)' before.
 */
export function parseValidGraph(text: string): Graph {
  const graph = toMatrix(text);
  if (isTriangle(graph)) return squareGraph(graph)
  return graph;
}
