import React from 'react';
import {useState} from 'react';
import {isValid, parse} from '../logic/graphParsing';
import samples from '../logic/graphSamples';

function GraphEditor() {
  const [userInput, setUserInput] = useState({
    isCorrect: true,
    text: samples.simple,
  });

  const textareaCallback = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const userText = e.target.value;
    setUserInput({isCorrect: isValid(userText), text: userText});
  };

  const renderCallback = (e: React.MouseEvent<HTMLInputElement>) => {
    parse(userInput.text);
    console.log(e);
  };

  return <div className="graphEditor">
    <textarea onChange={textareaCallback} value={userInput.text} />
    {!userInput.isCorrect ? <div>This cannot be converted to graph</div> : null}
    <input type="button" value="Render" onClick={renderCallback} />
  </div>;
}

export default GraphEditor;
