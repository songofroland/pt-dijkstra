import React, { useEffect } from 'react';
import { useState } from 'react';
import { isValid, parseValidGraph } from '../logic/graphParsing';
import samples from '../logic/graphSamples';

const graphsToChoose = [
  {
    label: 'Simple graph',
    key: 'simple',
  },
  {
    label: 'Medium graph',
    key: 'medium',
  },
  {
    label: 'Custom',
    key: 'custom',
  },
];


function GraphEditor({ onRender }: { onRender: Function }) {
  const [inputText, setInputText] = useState(samples.simple.string);
  const [inputTextIsCorrect, setInputTextIsCorrect] = useState(true);
  const [selectedGraphName, setSelectedGraphName] = useState('simple');
  const [customGraphString, setCustomGraphString] = useState('');

  useEffect(() => {
    setInputTextIsCorrect(isValid(inputText));
  }, [inputText]);  

  const textareaCallback = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
    setSelectedGraphName('custom');
    setCustomGraphString(event.target.value);
  };


  const renderCallback = () => {
    if (inputTextIsCorrect) {
      onRender(parseValidGraph(inputText));
    }
  };
  
  const chooserCallback = (selectedGraphName: string) => {
    setSelectedGraphName(selectedGraphName);
    if (selectedGraphName === 'custom'){
      setInputText(customGraphString);
    }else{
      setInputText(samples[selectedGraphName].string); 
    }
  };

  return <>
    <div className='graph-editor'>
      <textarea onChange={textareaCallback} value={inputText} />
      <div className='editor-bar'>
        <div className={inputTextIsCorrect? 'invisible' : 'error'}>
          <span>This cannot be converted to graph</span>
        </div>
        <GraphChooser 
          possibleValues={graphsToChoose} 
          selectCallback={chooserCallback} 
          selectedLabel={selectedGraphName} 
        />
        <input type='button' value='Render' onClick={renderCallback} />
      </div>
    </div>;
  </>;
}

function GraphChooser({ possibleValues, selectCallback, selectedLabel }
  : { possibleValues: any[], selectCallback: Function , selectedLabel: string})
{
  const onChange = (element: React.ChangeEvent<HTMLSelectElement>) => {
    selectCallback(element.target.selectedOptions[0].value);
  };

  const options = possibleValues.map(obj =>
    <option key={obj.key} value={obj.key}>{obj.label}</option>,
  );


  return <>
    <div>
      <select onChange={onChange} value={selectedLabel}>
        {options}
      </select>
    </div>
  </>;
}

export default GraphEditor;
