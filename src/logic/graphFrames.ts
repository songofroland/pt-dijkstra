import { Paths, Edge, TraversalRecord } from './commonInterfaces';

interface Frame {
  inactiveEdges: Array<Edge>,
  activeEdges: Array<Edge>,
};

export function createFrames(
  edges: Array<Edge>,
  nodePaths: Paths,
  traversalHistory: TraversalRecord,
):
  Array<Frame>
{
  return [ // Temorary fixed result
    { //frame 1
      inactiveEdges: [],
      activeEdges: [edges[0]],
    },
    { //frame 2
      inactiveEdges: [edges[0]],
      activeEdges: [],
    }
  ]
}