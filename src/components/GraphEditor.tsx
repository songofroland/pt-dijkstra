import React from 'react';
import { useState } from 'react';
import { isValid, parseValidGraph } from '../logic/graphParsing';
import samples from '../logic/graphSamples';

const graphsToChoose = [
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

  const chooserCallback = (selectedGraph: string) => {
    setUserInput({ isCorrect: true, text: selectedGraph });
  };

  return <div className='graph-editor'>
    <textarea onChange={textareaCallback} value={userInput.text} />
    <div className='editor-bar'>
      <div className={userInput.isCorrect ? 'valid-base valid' : 'valid-base'}>
        <span>This cannot be converted to graph</span>
      </div>
      <GraphChooser possibleValues={graphsToChoose} selectCallback={chooserCallback} />
      <input type='button' value='Render' onClick={renderCallback} />
    </div>
  </div>;
}

function GraphChooser({ possibleValues, selectCallback }
  : { possibleValues: any[], selectCallback: Function })
{
  const onChange = (element: any) => {
    selectCallback(element.target.selectedOptions[0].value);
  };

  const options = possibleValues.map((value, key) => 
    <option key={key} value={value.graph}>{value.label}</option>,
  );

  return <select onChange={onChange} >
    <option value="">Custom</option>
    {options}
  </select>;
}

export default GraphEditor;
