import {Graph} from '../logic/commonInterfaces';

export function adjMatrixToGraphString(matrix: Graph){
  if (matrix.some(row => row.some(digit => digit >= 10))){
    return matrix.map(row => row.join('  ')).join('\n');
  }
  return matrix.map(row => row.join(' ')).join('\n');
};
