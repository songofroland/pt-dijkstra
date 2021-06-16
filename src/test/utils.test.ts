import {adjMatrixToGraphString as toGraphString} from '../data/utils';
import samples from '../data/graphSamples';

test('Makes valid graph string' ,() => {
  expect(toGraphString(samples.advanced.graph)).toStrictEqual(samples.advanced.string);
  expect(toGraphString(samples.dense.graph)).toStrictEqual(samples.dense.string);
  expect(toGraphString(samples.neuron.graph)).toStrictEqual(samples.neuron.string);
});
