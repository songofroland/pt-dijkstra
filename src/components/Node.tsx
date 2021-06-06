import React from 'react';
import CSS from 'csstype';


function Node({ x, y, label, bgColor }: {
  x: number,
  y: number,
  label?: string,
  bgColor: string,
}) {
  const style: CSS.Properties = {
    position: 'absolute',
    left: `${x}%`,
    top: `${y}%`,
    overflow: 'visible',
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    backgroundColor: bgColor,
  };
  return <div style={style}><div className="node">{label}</div></div>;
}

export default Node;
