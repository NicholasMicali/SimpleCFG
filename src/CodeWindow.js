import React, { useEffect, useRef, useState } from 'react';
import ace from 'ace-builds';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/mode-python';
import './bigButton.css';

const CodeWindow = ({ initCode, handleCodeChange }) => {

  let codeEditor = useRef(null);

  let lastMarkerId = useRef(null);

  const [currentLine, setCurrentLine] = useState(1);

  useEffect(() => {
    codeEditor.current = initializeEditor();
  }, []);

  useEffect(() => {
    //console.log(`Current line changed to: ${currentLine}`);
    triggerHighlight();
  }, [currentLine]);

  const initializeEditor = () => {
    var editor = ace.edit('editor');
    editor.setTheme('ace/theme/twilight');
    editor.getSession().setMode('ace/mode/python');

    if (initCode){
      editor.getSession().setValue(initCode);
    }
    else {
      editor.getSession().setValue("def main():\n    # Your code here");
    }

    editor.getSession().on('change', () => {
      // Get the current code from the editor
      const currentCode = editor.getSession().getValue();
      // Call the parent component's callback with the updated code
      handleCodeChange(currentCode);
    });
    return editor;
  }

  const highlightLine = (editor, lineNumber) => {
    const Range = ace.require('ace/range').Range;

    editor.getSession().removeMarker(lastMarkerId.current);

    const newMarkerId = editor.getSession().addMarker(new Range(lineNumber - 1, 0, lineNumber - 1, Infinity), 'editor-highlight', 'fullLine');
    //console.log("higlighting line: " + lineNumber);
    //console.log("current Id: " + newMarkerId);
    lastMarkerId.current = newMarkerId;
  };

  const triggerHighlight = () => {
    //console.log("previous Id: " + lastMarkerId.current);
    if (codeEditor.current) {
      highlightLine(codeEditor.current, currentLine);
      //setCurrentLine(currentLine + 1);
    }
  };



  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/lineNums');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      //data = data.toString()
      //const old = currentLine;
      setCurrentLine(parseInt(data));
      //if (old !== currentLine) {
      //  console.log('updated');
      //}
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  
  // Call fetchData every 5 seconds
  const intervalId = setInterval(fetchData, 10000);



  return (
    <div>
      <div id="editor" style={{ height: '450px', width: '600px'}}></div>
    </div>
  );
};

export default CodeWindow;
