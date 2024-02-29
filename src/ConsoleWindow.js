import React, { useEffect, useRef, useState } from 'react';
import ace from 'ace-builds';
import 'ace-builds/src-noconflict/theme-tomorrow_night_blue';
import './bigButton.css';

const ConsoleWindow = ({ save }) => {
  let consoleEditor = useRef(null);
  const [output, setOutput] = useState('');

  useEffect(() => {
    consoleEditor.current = initializeConsole();
  }, []);

  useEffect(() => {
    fetchOutput();
  }, [output]);

  const initializeConsole = () => {
    var editor = ace.edit('console');
    editor.setTheme('ace/theme/tomorrow_night_blue');
    editor.setReadOnly(true);
    //editor.renderer.setShowGutter(false);
    editor.getSession().setMode('ace/mode/text'); // Set to text mode or any other appropriate mode
    return editor;
  };

  const fetchOutput = async () => {
    console.log("Fetching Output ------");
    console.log("saving file");
    save();
    try {
      const response = await fetch('http://localhost:3001/consoleOutput');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("request recieved");
      const data = await response.json();
      console.log("got data");
      setOutput(data);
      consoleEditor.current.getSession().setValue(data);
      console.log("done");
    } catch (error) {
      console.error("Error fetching console output: ", error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <button className="bigButton" onClick={fetchOutput} style={{ marginTop: '10px'}}>Output</button>
      <div id="console" style={{ height: '70px', width: '600px' }}></div>
    </div>
  );
};

export default ConsoleWindow;
