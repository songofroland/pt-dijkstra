import React from 'react';

export default function Description() {
  return <>
    <div className="description">
        Dijkstra&apos;s algorithm to find the shortest path between a and b.
        It picks the unvisited vertex with the lowest distance,<br/>calculates 
        the distance through it to each unvisited neighbor, and updates the 
        neighbor&apos;s distance if smaller.<br/> 
        Mark visited (set to blue) when done with neighbors. 
    </div>
  </>;
}
