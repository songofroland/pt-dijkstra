import { Frame, DissasembledGraph, Algorithm } from './commonInterfaces';

export default function createFrames(
  dissasembledGraph: DissasembledGraph,
  algorithm: Algorithm,
):
  Array<Frame>
{
  return [ // Temporary fixed result
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
