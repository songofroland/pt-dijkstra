type GraphRow = Array<number>;
type Graph = Array<GraphRow>;

function split(text: string): Graph {
  const rows = text.split('\n');
  return rows
    .map((row: string) =>
      row.split(' ')
        .map((element: string) => parseInt(element))
        .filter((element: number) => !Number.isNaN(element))
    )
    .filter((row: GraphRow) => row.length !== 0);
}

function isSquare(graph: Graph) : boolean {
  const squareSideLength = graph.length;
  for (const graphRow of graph) {
    if (graphRow.length !== squareSideLength) return false;
  }
  return true;
}

function isTriangle(graph: Graph): boolean {
  let correctRowLenght = graph.length;
  for (const graphRow of graph) {
    if (correctRowLenght === 0) break;
    if (graphRow.length !== correctRowLenght) return false;
    correctRowLenght--;
  }
  return true;
}

function precheck(text: string) : boolean {
  const graph = split(text);
  if (graph.length === 0) return false;
  if (!isSquare(graph) || !isTriangle(graph)) return false;
  return true;
}

function parse(text: string) {
  // TODO
  return split(text);
}

export { precheck, parse };
