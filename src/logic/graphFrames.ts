import { Frame, DissasembledGraph, Algorithm } from './commonInterfaces';

export default function createFrames(
  dissasembledGraph: DissasembledGraph,
  algorithm: Algorithm,
):
  Array<Frame>
{
  const edgeFrames = createFramesWithEdges(algorithm);
  //return findIndexes(dissasembledGraph, edgeFrames);

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

export function createFramesWithEdges(from: Algorithm) {

}


