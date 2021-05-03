import React from 'react';
import CSS from 'csstype';
import { Position } from '../logic/commonInterfaces'

const INACTIVE_COLOR = 'blue'
const ACTIVE_COLOR = 'red'
const DEFAULT_COLOR = 'white'

function getEdgePositionUsingPythagoras(from: Position, to: Position) :
  [Position, number, number]
{
  const [first, second] = from.x < to.x ? [from, to] : [to, from];
  const a = second.y - first.y;
  const b = second.x - first.x;
  const c = Math.sqrt((a * a) + (b * b));
  // beta = arccos( b^2 + c^2 - a^2 / 2bc ) and radians to degrees
  const beta = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180/Math.PI);
  const angle = second.y > first.y ? beta : -beta;
  return [first, c, angle];
}

function Edge({from, to, label, isActive, isInactive}
  : {
    from: Position,
    to: Position,
    label?: string,
    isActive: boolean,
    isInactive: boolean,
  })
{
  const backgroundColor =
    isActive || isInactive ? (isActive ? ACTIVE_COLOR : INACTIVE_COLOR) : DEFAULT_COLOR;
  const [{ x, y }, length, rotation] = getEdgePositionUsingPythagoras(from, to);
  const style: CSS.Properties = {
    position: 'absolute',
    left: `${x}%`,
    top: `${y}%`,
    backgroundColor: `${backgroundColor}`,
    height: '1px',
    width: `${length}%`,
    transformOrigin: 'top left',
    transform: `rotate(${rotation}deg)`,
  };
  return <div style={style}>{label}</div>;
}

export default Edge;
