import { labelGen } from '../logic/graphMapping';

test('laben generation', () => {
  const generator = labelGen();
  const results = Array.from({ length: 55 }, () => generator.next().value);
  expect(results.slice(0, 3)).toStrictEqual(['A', 'B', 'C']);
  expect(results.slice(26, 29)).toStrictEqual(['AA', 'AB', 'AC']);
  expect(results.slice(52, 55)).toStrictEqual(['BA', 'BB', 'BC']);
});