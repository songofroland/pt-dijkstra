import React from 'react';
import { useState } from 'react';
import { isValid, parseValidGraph } from '../logic/graphParsing';
import samples from '../logic/graphSamples';

const graphToChoose = [
  {
    label: 'Simple Graph',
    graph: samples.simple.string,
  },
  {
    label: 'Medium Graph',
    graph: samples.medium.string,
  },
];


function GraphEditor({ onRender }: { onRender: Function }) {
  const [userInput, setUserInput] = useState({
    isCorrect: true,
    text: samples.simple.string,
  });

  const textareaCallback = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const userText = e.target.value;
    setUserInput({ isCorrect: isValid(userText), text: userText });
  };

  const renderCallback = (e: React.MouseEvent<HTMLInputElement>) => {
    if (userInput.isCorrect) onRender(parseValidGraph(userInput.text));
  };

  return <div className='graph-editor'>
    <textarea onChange={textareaCallback} value={userInput.text} />
    <div className='editor-bar'>
      <div className={userInput.isCorrect ? 'valid-base valid' : 'valid-base'}>
        <span>This cannot be converted to graph</span>
      </div>
      <GraphChooser possibleValues={[]} />
      <input type='button' value='Render' onClick={renderCallback} />
    </div>
  </div>;
}

function GraphChooser({ possibleValues } : { possibleValues: any[] }) {
  return <select>
    <option value="custom">Custom</option>
  </select>
}

export default GraphEditor;
