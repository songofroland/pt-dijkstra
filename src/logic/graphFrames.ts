import { Paths, Edge, TraversalRecord, Frame, DissasembledGraph }
  from './commonInterfaces';

export default function createFrames(
  dissasembledGraph: DissasembledGraph,
  nodePaths: Paths,
  traversalHistory: Array<TraversalRecord>,
):
  Array<Frame>
{
  return [ // Temorary fixed result
    { //frame 1
      inactiveEdges: [],
      activeEdges: [dissasembledGraph[1][0]],
    },
    { //frame 2
      inactiveEdges: [dissasembledGraph[1][0]],
      activeEdges: [],
    },
  ]
}