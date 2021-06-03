import {
  Frame,
  DisassembledGraph,
  Algorithm,
  Edge,
  TraversalRecord,
  GraphIndex,
} from './commonInterfaces';


// TODO: Refactor the function chain
interface FrameWithEdges {
  processedEdges: Array<Edge>,
  unvisitedEdges: Array<Edge>,
};

interface FrameWithEdgesAndNodes extends FrameWithEdges{
  visitedNodes: Array<number>,
  activeNode: number
}

export default function createFrames(
  dissasembledGraph: DisassembledGraph,
  algorithm: Algorithm,
):
  Array<Frame>
{
  let frames: Array<FrameWithEdgesAndNodes> = [];
  const visitedNodes : Array<number> = [];
  for (let travelsal of algorithm.traversalHistory) {
    const framesWithEdgeData = [
      createFrameForNode(frames), ...createFramesForLookups(travelsal, frames),
    ];
    frames.push(...addNodeFrameData(framesWithEdgeData, travelsal.node, visitedNodes));
    visitedNodes.push(travelsal.node);
  }
  return convertToIndexes(dissasembledGraph, frames);
}

function createFrameForNode(
  frames: Array<FrameWithEdgesAndNodes>,
): FrameWithEdges 
{
  const lastFrame = frames[frames.length - 1] || {processedEdges: [], unvisitedEdges: []};
  return {
    processedEdges: [],
    unvisitedEdges: lastFrame.processedEdges.concat(lastFrame.unvisitedEdges),
  };
}

function createFramesForLookups(
  travelsal: TraversalRecord, 
  frames: Array<FrameWithEdges>,
):
  Array<FrameWithEdges>
{
  const nodeFrames: Array<FrameWithEdges> = [
    frames[frames.length - 1] || { processedEdges: [], unvisitedEdges: [] },
  ];
  for (let toNode of travelsal.lookups) {
    const lastFrame = nodeFrames[nodeFrames.length - 1];
    nodeFrames.push({
      processedEdges: [new Edge(travelsal.node, toNode)],
      unvisitedEdges: lastFrame.processedEdges.concat(lastFrame.unvisitedEdges),
    });
  }
  nodeFrames.shift(); //First frame was repeated
  return nodeFrames;
}

function addNodeFrameData(
  frames: Array<FrameWithEdges>, 
  activeNode: number,
  visitedNodes: Array<number>,
): Array<FrameWithEdgesAndNodes> 
{
  const framesWithNodeData = [];
  for (let frame of frames){
    framesWithNodeData.push({
      ...frame,
      activeNode: activeNode,
      visitedNodes: [...visitedNodes],
    });
  }
  return framesWithNodeData;
}

function convertToIndexes(
  graph: DisassembledGraph,
  edgeFrames: Array<FrameWithEdgesAndNodes>,
):
  Array<Frame>
{
  const frames: Array<Frame> = [];
  const graphEdges = graph[GraphIndex.EDGES];
  for (let eFrame of edgeFrames) {
    frames.push({
      visitedNodes: eFrame.visitedNodes,
      currentNode: eFrame.activeNode,
      currentEdges: convertEdgesToIndexes(eFrame.processedEdges, graphEdges),
      processedEdges: convertEdgesToIndexes(eFrame.unvisitedEdges, graphEdges),
    });
  }
  return frames;
}

function convertEdgesToIndexes(
  edgeArray: Array<Edge>,
  graphEdges: Array<Edge>,
):
  Array<number>
{
  const indexes: Array<number> = edgeArray.map(edge => findEdgeIndex(edge, graphEdges));
  return Array.from(new Set(indexes));
}

function findEdgeIndex(edge: Edge, edgeArray: Array<Edge>): number {
  return edgeArray.findIndex(candidate => edge.equals(candidate));
}
