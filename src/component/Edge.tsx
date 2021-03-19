import React from 'react';
import CSS from 'csstype';

function Edge({position: {x, y, len, rot}, label}
  : {
    position: { x: number, y: number, len: number, rot: number },
    label?: string
  }) {
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
