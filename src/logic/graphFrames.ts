import {
  Frame,
  DisassembledGraph,
  Algorithm,
  Edge,
  TraversalRecord,
  GraphIndex,
} from './commonInterfaces';

interface FrameWithEdges {
  activeEdges: Array<Edge>,
  inactiveEdges: Array<Edge>,
};

export default function createFrames(
  dissasembledGraph: DisassembledGraph,
  algorithm: Algorithm,
):
  Array<Frame>
{
  const edgeFrames = createFramesWithEdges(algorithm);
  return convertToIndexes(dissasembledGraph, edgeFrames);
}

export function createFramesWithEdges(from: Algorithm) {
  let frames: Array<FrameWithEdges> = [];
  for (let travelsal of from.traversalHistory) {
    frames.push(createFrameForNode(frames));
    frames.push(...createFramesForLookups(travelsal, frames));
  }
  return frames;
}

function createFrameForNode(frames: Array<FrameWithEdges>): FrameWithEdges {
  const lastFrame = frames[frames.length - 1] || { activeEdges: [], inactiveEdges: [] };
  return {
    activeEdges: [],
    inactiveEdges: lastFrame.activeEdges.concat(lastFrame.inactiveEdges),
  };
}

function createFramesForLookups(
  travelsal: TraversalRecord,
  frames: Array<FrameWithEdges>,
):
  Array<FrameWithEdges>
{
  const nodeFrames: Array<FrameWithEdges> = [
    frames[frames.length - 1] || { activeEdges: [], inactiveEdges: [] },
  ];
  for (let toNode of travelsal.lookups) {
    const lastFrame = nodeFrames[nodeFrames.length - 1];
    nodeFrames.push({
      activeEdges: [new Edge(travelsal.node, toNode)],
      inactiveEdges: lastFrame.activeEdges.concat(lastFrame.inactiveEdges),
    });
  }
  nodeFrames.shift(); //First frame was repeated
  return nodeFrames;
}

function convertToIndexes(
  graph: DisassembledGraph,
  edgeFrames: Array<FrameWithEdges>,
):
  Array<Frame>
{
  const frames: Array<Frame> = [];
  const graphEdges = graph[GraphIndex.EDGES];
  for (let eFrame of edgeFrames) {
    frames.push({
      currentEdges: convertEdgesToIdexes(eFrame.activeEdges, graphEdges),
      activeEdges: convertEdgesToIdexes(eFrame.inactiveEdges, graphEdges),
    });
  }
  return frames;
}

function convertEdgesToIdexes(
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
