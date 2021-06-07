/* eslint-disable */
const samples: { [key: string]: any } = {
   advanced: {
    graph: [
      [0, 2, 6, 0, 0, 0, 0],
      [2, 0, 0, 5, 0, 0, 0],
      [6, 0, 0, 8, 0, 0, 0],
      [0, 5, 8, 0, 10, 15, 0],
      [0, 0, 0, 10, 0, 6, 2],
      [0, 0, 0, 15, 6, 0, 6],
      [0, 0, 0, 0, 2, 6, 0],
    ],
    string: '0 2 6 0 0 0 0\n2 0 0 5 0 0 0\n6 0 0 8 0 0 0\n0 5 8 0 10 15 0\n0 0 0 10 0 6 2\n0 0 0 15 6 0 6\n0 0 0 0 2 6 0',
  },
  medium: {
    graph: [
      [0, 2, 6, 0, 0],
      [2, 0, 0, 5, 0],
      [6, 0, 0, 8, 0],
      [0, 5, 8, 0, 10],
      [0, 0, 0, 10, 0],
    ],
    string: '0 2 6 0 0\n2 0 0 5 0\n6 0 0 8 0\n0 5 8 0 10\n0 0 0 10 0',
  },
  simple: {
    graph: [
      [0, 2, 0, 5], 
      [2, 0, 4, 1], 
      [0, 4, 0, 6], 
      [5, 1, 6, 0],
    ],
    string: '0 2 0 5\n2 0 4 1\n0 4 0 6\n5 1 6 0',
  },
};

export default samples;
