import {adjMatrixToGraphString} from './utils';

const adjMatrices = {
  dense: [
    [0, 1, 2, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 3, 4, 0, 0, 0, 0, 0, 0],
    [2, 3, 0, 5, 6, 0, 0, 0, 0, 0],
    [0, 4, 5, 0, 7, 8, 0, 2, 0, 0],
    [0, 0, 6, 7, 0, 9, 0, 0, 0, 0],
    [0, 0, 0, 8, 9, 0, 1, 3, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 4, 1, 0],
    [0, 0, 0, 2, 0, 3, 4, 0, 5, 1],
    [0, 0, 0, 0, 0, 0, 1, 5, 0, 6],
    [1, 0, 0, 0, 0, 0, 0, 1, 6, 0],
  ],
  advanced: [
    [0, 2, 6, 0, 0, 0, 0],
    [2, 0, 0, 5, 0, 0, 0],
    [6, 0, 0, 8, 0, 0, 0],
    [0, 5, 8, 0, 1, 5, 0],
    [0, 0, 0, 1, 0, 6, 2],
    [0, 0, 0, 5, 6, 0, 6],
    [0, 0, 0, 0, 2, 6, 0],
  ],
  medium:  [
    [0, 2, 6, 0, 4],
    [2, 0, 0, 5, 0],
    [6, 0, 0, 8, 1],
    [0, 5, 8, 0, 9],
    [4, 0, 1, 9, 0],
  ],
  neuron: [
    [0, 1, 2, 3, 4, 5, 6],
    [1, 0, 0, 0, 0, 0, 0],
    [2, 0, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 0, 0, 0],
    [4, 0, 0, 0, 0, 0, 0],
    [5, 0, 0, 0, 0, 0, 0],
    [6, 0, 0, 0, 0, 0, 0],
  ],
  simple: [
    [0, 2, 0, 5], 
    [2, 0, 4, 1], 
    [0, 4, 0, 6], 
    [5, 1, 6, 0],
  ],
};


const samples: { [key: string]: any } = {
  dense: {
    graph: adjMatrices.dense,
    string: adjMatrixToGraphString(adjMatrices.dense),
  },
  advanced: {
    graph: adjMatrices.advanced,
    string: adjMatrixToGraphString(adjMatrices.advanced), 
  },
  medium: {
    graph: adjMatrices.medium, 
    string: adjMatrixToGraphString(adjMatrices.medium), 
  },
  neuron: {
    graph: adjMatrices.neuron,
    string: adjMatrixToGraphString(adjMatrices.neuron), 
  },
  simple: {
    graph: adjMatrices.simple,
    string:adjMatrixToGraphString(adjMatrices.simple), 
  },
};

export default samples;
