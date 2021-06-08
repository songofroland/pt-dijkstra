import {Graph} from '../logic/commonInterfaces';

export function adjMatrixToGraphString(matrix: Graph){
  return matrix.map(row => row.join(' ')).join('\n');
};
