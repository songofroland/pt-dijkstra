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
      activeEdges: [0],
    },
    { //frame 2
      inactiveEdges: [0],
      activeEdges: [],
    },
  ]
}
