import React, { useEffect } from 'react';
import { useState } from 'react';
import { isValid, parseValidGraph } from '../logic/graphParsing';
import samples from '../data/graphSamples';

const graphsToChoose = [
  {
    label: 'Custom',
    key: 'custom',
  },
  {
    label: 'Simple',
    key: 'simple',
  },
  {
    label: 'Medium',
    key: 'medium',
  },
  {
    label: 'Neuron',
    key: 'neuron',
  },
  {
    label: 'Advanced',
    key: 'advanced',
  },
  {
    label: 'Dense',
    key: 'dense',
  },
];


function GraphEditor({ onRender }: { onRender: Function }) {
  const [inputText, setInputText] = useState(samples.simple.string);
  const [inputTextIsCorrect, setInputTextIsCorrect] = useState(true);
  const [selectedGraphId, setSelectedGraphId] = useState('simple');
  const [customGraphString, setCustomGraphString] = useState('');

  useEffect(() => {
    setInputTextIsCorrect(isValid(inputText));
  }, [inputText]);  

  const textareaCallback = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
    setSelectedGraphId('custom');
    setCustomGraphString(event.target.value);
  };


  const renderCallback = () => {
    if (inputTextIsCorrect) {
      onRender(parseValidGraph(inputText));
    }
  };
  
  const chooserCallback = (selectedGraphName: string) => {
    setSelectedGraphId(selectedGraphName);
    if (selectedGraphName === 'custom'){
      setInputText(customGraphString);
    }else{
      setInputText(samples[selectedGraphName].string); 
    }
  };

  return <>
    <div className='graph-editor'>
      <textarea onChange={textareaCallback} value={inputText} />
      <div className={inputTextIsCorrect? 'invisible' : 'error'}>
        <span>This cannot be converted to graph</span>
      </div>
      <div className='editor-bar'>
        <GraphChooser 
          possibleValues={graphsToChoose} 
          selectCallback={chooserCallback} 
          selectedLabel={selectedGraphId} 
        />
        <input type='button' value='Render' onClick={renderCallback} />
      </div>
    </div>
  </>;
}

function GraphChooser({ possibleValues, selectCallback, selectedLabel }
  : { possibleValues: Array<any>, selectCallback: Function , selectedLabel: string})
{
  const onChange = (element: React.ChangeEvent<HTMLSelectElement>) => {
    selectCallback(element.target.selectedOptions[0].value);
  };

  const options = possibleValues.map(obj =>
    <option key={obj.key} value={obj.key}>{obj.label}</option>,
  );


  return <>
    <select onChange={onChange} value={selectedLabel}>
      {options}
    </select>
  </>;
}

export default GraphEditor;
