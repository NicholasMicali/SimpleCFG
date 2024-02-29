import React from 'react';
import './bigButton.css';
//const { spawn } = require('node:child_process').spawn;

const RunButton = ({ width }) => {

  const runPythonScript = async () => {
    const scriptPath = '../src/astParser.py';
    const args = ["run", width]; // Pass any arguments your Python script requires
  
    try {
      const response = await fetch('http://localhost:3001/run-python', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pythonScript: scriptPath,
          args,
        }),
      });
  
      const data = await response.json();
      console.log('Python script execution result:', data);
    } catch (error) {
      console.error('Error executing Python script:', error);
    }
  };

  return (
    <div>
      <button className="bigButton" onClick={runPythonScript}>Run!</button>
    </div>
  );
};

export default RunButton;
