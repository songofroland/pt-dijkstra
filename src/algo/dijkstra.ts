interface Nodes {
    [key: string]: number
}

interface PathsMap {
    [key: string]: number[]
}


export class Result {
    nodes: Nodes;
    pathMap: PathsMap;

    constructor(distances: Nodes, pathMap: PathsMap) {
        this.nodes = distances;
        this.pathMap = pathMap;
    }
}

export default function calculatePaths(graph: Array<Array<number>>, startNode: number = 0) {
    // TODO: doccomment
    const nodes = Array.from(Array(graph.length).keys());

    let costs: Nodes = nodes.reduce((acc: Nodes, curr: number) => (acc[curr] = Infinity, acc), {});
    let pathsMap: PathsMap = nodes.reduce((acc: PathsMap, curr: number) => (acc[curr] = [], acc), {});
    let unvisitedNodes: Set<number> = new Set(nodes);

    costs[startNode] = 0;
    let currentNode = startNode;

    while (unvisitedNodes.size) {
        for (const [neighboredNode, neighbourCost] of graph[currentNode].entries()) {
            if (neighbourCost !== 0) {
                let previousCost = costs[neighboredNode];
                let currentCost = neighbourCost + costs[currentNode];

                if (currentCost < previousCost) {
                    costs[neighboredNode] = currentCost;
                    pathsMap[neighboredNode] = [...pathsMap[currentNode], currentNode];
                }
            }
        }

        unvisitedNodes.delete(currentNode);
        currentNode = getCheapesNode(getUnvisitedNodes(costs, unvisitedNodes));
    }

    return new Result(costs, pathsMap);
}

function getUnvisitedNodes(nodes: Nodes, unvisited: Set<number>) {
    let unvisitedNodes: Nodes = {};
    for (const [key, value] of Object.entries(nodes)) {
        if (unvisited.has(parseInt(key))) {
            unvisitedNodes[key] = value;
        }
    }
    return unvisitedNodes;
}

function getCheapesNode(nodes: Nodes) {
    let minDistance = Math.min(...Object.values(nodes));
    return parseInt(Object.keys(nodes).find(key => nodes[key] === minDistance)!);
}
