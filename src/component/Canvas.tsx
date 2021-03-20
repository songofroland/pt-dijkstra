import React from 'react';
import Node from './Node';
import Edge from './Edge';

function calulateCoordinates(
  nodes: string[],
  edges: { from: number, to: number }[]) {
  // super complicated algorithm calculating optimal coordinates
  const mappedNodes = nodes.map((l, i) => ({
    label: l,
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));
  const mappedEdges = edges.map((obj, i) => {
    const node1 = mappedNodes.find((e) => e.id === obj?.from);
    const node2 = mappedNodes.find((e) => e.id === obj?.to);
    return {
      id: i,
      x1: node1?.x ?? 0,
      y1: node1?.y ?? 0,
      x2: node2?.x ?? 0,
      y2: node2?.y ?? 0,
    };
  });
  console.log('mappedNodes', mappedNodes);
  return {n: mappedNodes, e: mappedEdges};
}

function calculateEdgePosition(e: {
  x1: number,
  y1: number,
  x2: number,
  y2: number
}) {
  const [x1, y1, x2, y2] = e.x1 < e.x2 ?
    [e.x1, e.y1, e.x2, e.y2] :
    [e.x2, e.y2, e.x1, e.y1];
  // using pythagoras
  // a ^ 2 + b ^ 2 = c ^ 2
  const getC = (a: number, b: number) => Math.sqrt((a * a) + (b * b));
  const getBeta = (a: number, b: number, c: number) =>
    Math.acos((b * b + c * c - a * a) / (2 * b * c));
  const toDegrees = (rad: number) => rad * (180/Math.PI);
  const a = y2 - y1;
  const b = x2 - x1;
  const c = getC(a, b);
  const beta = toDegrees(getBeta(a, b, c));
  const angle = y2 > y1 ? beta : -beta;
  return {
    x: x1,
    y: y1,
    len: c,
    rot: angle,
  };
}

function Canvas({nodes, edges}
  : {
    nodes: string[],
    edges: { from: number, to: number }[]
  }) {
  const {n: mappedNodes, e: mappedEdges} = calulateCoordinates(nodes, edges);
  const nodeComponents = mappedNodes.map((n) => {
    return <Node x={n.x} y={n.y} label={n.label} key={n.id} />;
  });
  const edgeComponents = mappedEdges.map((e) => {
    return <Edge position={calculateEdgePosition(e)} key={e.id} />;
  });
  return <div className="Canvas">
    {edgeComponents}
    {nodeComponents}
  </div>;
}

export default Canvas;

