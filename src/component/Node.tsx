import React from 'react';
import CSS from 'csstype';

function Node({x, y, label}:{x: number, y: number, label?: string}) {
  const style: CSS.Properties = {
    position: 'absolute',
    left: `${x}%`,
    top: `${y}%`,
    overflow: 'visible',
    transform: 'translate(-50%, -50%)',
  };
  return <div style={style}><div className="Node">{label}</div></div>;
}

export default Node;
