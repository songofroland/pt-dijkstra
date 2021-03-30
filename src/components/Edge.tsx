import React from 'react';
import CSS from 'csstype';

interface Position {
  x: number;
  y: number;
}

function calculateEdgePositionUsingPythagoras(from: Position, to: Position) {
  const [first, second] = from.x < to.x ? [from, to] : [to, from];
  const a = second.y - first.y;
  const b = second.x - first.x;
  // c^2 = a^2 + b^2
  const c = Math.sqrt((a * a) + (b * b));
  // beta = arccos( b^2 + c^2 - a^2 / 2bc ) and radians to degrees
  const beta = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180/Math.PI);
  const isSecondHigher = (first: Position, second: Position) =>
    second.y > first.y;
  const angle = isSecondHigher(first, second) ? beta : -beta;
  return [first.x, first.y, c, angle];
}

function Edge({from, to, label}
  : {
    from: Position,
    to: Position,
    label?: string
  }) {
  const [x, y, len, rot] = calculateEdgePositionUsingPythagoras(from, to);
  const style: CSS.Properties = {
    position: 'absolute',
    left: `${x}%`,
    top: `${y}%`,
    backgroundColor: 'white',
    height: '1px',
    width: `${len}%`,
    transformOrigin: 'top left',
    transform: `rotate(${rot}deg)`,
  };
  return <div style={style}>{label}</div>;
}

export default Edge;
