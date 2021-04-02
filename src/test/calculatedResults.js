export const testGraph = [
  [0, 2, 6, 0, 0, 0, 0],
  [2, 0, 0, 5, 0, 0, 0],
  [6, 0, 0, 8, 0, 0, 0],
  [0, 5, 8, 0, 10, 15, 0],
  [0, 0, 0, 10, 0, 6, 2],
  [0, 0, 0, 15, 6, 0, 6],
  [0, 0, 0, 0, 2, 6, 0],
];

export const expectedCostsFromFirstNode = {
  0: 0,
  1: 2,
  2: 6,
  3: 7,
  4: 17,
  5: 22,
  6: 19,
};

export const expectedPathsFromFirstNode = {
  0: [],
  1: [0],
  2: [0],
  3: [0, 1],
  4: [0, 1, 3],
  5: [0, 1, 3],
  6: [0, 1, 3, 4],
};

export const expectedHistoryFromFirstNode =  [
  { node: 0, lookups: [ 1, 2 ] },
  { node: 1, lookups: [ 0, 3 ] },
  { node: 2, lookups: [ 0, 3 ] },
  { node: 3, lookups: [ 1, 2, 4, 5 ] },
  { node: 4, lookups: [ 3, 5, 6 ] },
  { node: 6, lookups: [ 4, 5 ] },
  { node: 5, lookups: [ 3, 4, 6 ] },
]

export const expectedCostsFromMiddleNode = {
  0: 7,
  1: 5,
  2: 8,
  3: 0,
  4: 10,
  5: 15, 
  6: 12,
};

export const expectedPathsFromMiddleNode = {
  0: [ 3, 1 ],
  1: [ 3 ],
  2: [ 3 ],
  3: [],
  4: [ 3 ],
  5: [ 3 ],
  6: [ 3, 4 ],
};

export const expectedHistoryFromMiddleNode =  [
  { node: 3, lookups: [ 1, 2, 4, 5 ] },
  { node: 1, lookups: [ 0, 3 ] },
  { node: 0, lookups: [ 1, 2 ] },
  { node: 2, lookups: [ 0, 3 ] },
  { node: 4, lookups: [ 3, 5, 6 ] },
  { node: 6, lookups: [ 4, 5 ] },
  { node: 5, lookups: [ 3, 4, 6 ] },
]
export const expectedCostsFromLastNode = {
  0: 19,
  1: 17,
  2: 20,
  3: 12,
  4: 2,
  5: 6,
  6: 0,
};

export const expectedPathsFromLastNode = {
  0: [6,4,3,1],
  1: [6,4,3],
  2: [6,4,3],
  3: [6,4],
  4: [6],
  5: [6],
  6: [],
};

export const expectedHistoryFromLastNode =  [
  { node: 6, lookups: [ 4, 5 ] },
  { node: 4, lookups: [ 3, 5, 6 ] },
  { node: 5, lookups: [ 3, 4, 6 ] },
  { node: 3, lookups: [ 1, 2, 4, 5 ] },
  { node: 1, lookups: [ 0, 3 ] },
  { node: 0, lookups: [ 1, 2 ] },
  { node: 2, lookups: [ 0, 3 ] },
]
