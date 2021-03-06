import React from 'react';
import CSS from 'csstype';
import { Position } from '../logic/commonInterfaces';


function getEdgePositionUsingPythagoras(from: Position, to: Position):
  [Position, number, number] {
  const [first, second] = from.x < to.x ? [from, to] : [to, from];
  const a = second.y - first.y;
  const b = second.x - first.x;
  const c = Math.sqrt((a * a) + (b * b));
  // beta = arccos( b^2 + c^2 - a^2 / 2bc ) and radians to degrees
  const beta = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
  const angle = second.y > first.y ? beta : -beta;
  return [first, c, angle];
}

function Edge({ from, to, label, bgColor }
  : {
    from: Position,
    to: Position,
    label?: string,
    bgColor: string,
  }) {
  const [{ x, y }, length, rotation] = getEdgePositionUsingPythagoras(from, to);
  const edgeStyle: CSS.Properties = {
    position: 'absolute',
    left: `${x}%`,
    top: `${y}%`,
    backgroundColor: bgColor,
    zIndex: 0,
    height: '2px',
    width: `${length}%`,
    transformOrigin: 'top left',
    transform: `rotate(${rotation}deg)`,
  };


  return <>
    <div style={edgeStyle}>
      <div className="edge-label">{label}</div>
    </div>
  </>;
}

export default Edge;
