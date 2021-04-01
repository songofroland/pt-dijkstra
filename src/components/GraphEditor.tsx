import React from 'react';
import { useState } from 'react';
import { isValid, parseValidGraph } from '../logic/graphParsing';
import samples from '../logic/graphSamples';

function GraphEditor({ onRender }: { onRender: Function }) {
  const [userInput, setUserInput] = useState({
    isCorrect: true,
    text: samples.simple,
  });

  const textareaCallback = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const userText = e.target.value;
    setUserInput({ isCorrect: isValid(userText), text: userText });
  };

  const renderCallback = (e: React.MouseEvent<HTMLInputElement>) => {
    if (userInput.isCorrect) onRender(parseValidGraph(userInput.text));
  };

  return <div className='graph_editor'>
    <textarea onChange={textareaCallback} value={userInput.text} />
    <div className='editor_bar'>
      <div className={userInput.isCorrect ? 'graph_valid' : ''}>
        <span>This cannot be converted to graph</span>
      </div>
      <input type='button' value='Render' onClick={renderCallback} />
    </div>
  </div>;

}

export default GraphEditor;
