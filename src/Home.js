import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header.js';
import CodeWindow from './CodeWindow.js';
import ConsoleWindow from './ConsoleWindow.js';
import RunButton from './RunButton.js';
import InfoIcon from './InfoIcon.js'
import './bigButton.css';

function Home() {

  const [code, setCode] = useState('');
  const [inputValue, setInputValue] = useState('10');
  const [stepValue, setStepValue] = useState(0);
  const [isShown, setIstShown] = useState(true);


  const handleInputChange = (event) => {
    const value = event.target.value;

    // Validate if the input is a valid integer
    if (/^\d*$/.test(value)) {
      setInputValue(value);
    }
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const toggle = () => {
    setIstShown(!(isShown));
  }

  const gen = () => {
    setStepValue(0);
    onGen("cfg");
  }
  const step = () => {
    const s = stepValue + 1;
    onGen(s + "");
    setStepValue(s);
  }
  const pStep = () => {
    const s = stepValue - 1;
    onGen(s + "");
    if (s > 0){
      setStepValue(s);
    }
  }

  const increment = () => {
    setInputValue((parseInt(inputValue) + 1) + "");
  }
  const decrement = () => {
    if (inputValue > 1) {
      setInputValue((parseInt(inputValue) - 1) + "");
    }
  }



  const onGen = async (a) => {
    const scriptPath = '../src/astParser.py';
    const args = [a, inputValue]; // arguments 
    axios.post('http://localhost:3001/savePythonFile', { code })
      .then(response => {
        console.log(response.data);
        // Handle success, if needed
      })
      .catch(error => {
        console.error(error);
        // Handle error, if needed
      });
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
    //console.log(code);
  };

  const save = async () => {
    axios.post('http://localhost:3001/savePythonFile', { code })
      .then(response => {
        console.log(response.data);
        // Handle success, if needed
      })
      .catch(error => {
        console.error(error);
        // Handle error, if needed
      });
  };

  return (
    <div className="App">
      <Header/>
        {isShown ? (
          <div className="body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '75px', marginLeft: '30px', marginRight: '30px'}}>
            <div className="left-side" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center'}}>
              <div className="buttons" style={{ width: '60%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <button className="smallButton" onClick={gen} style={{paddingLeft: '5px', paddingRight: '5px', paddingTop: '5px', paddingBottom: '3px'}}>
                  <img alt="icon" src={require("./reset64.png")} style={{ width: '25px' }}/>
                </button>
                <RunButton width={inputValue}/>
                <button className="smallButton" onClick={pStep}>
                  <img alt="icon" src={require("./arrow.png")} style={{ width: '15px', transform: 'rotate(180deg)' }}/>
                </button>
                <button className="smallButton" onClick={step}>
                  <img alt="icon" src={require("./arrow.png")} style={{ width: '15px' }}/>
                </button>
                <button className="smallButton" onClick={toggle} style={{ paddingLeft: '5px', paddingRight: '5px', paddingTop: '5px', paddingBottom: '3px' }}>
                  <img alt="icon" src={require("./full.png")} style={{ width: '25px' }}/>
                </button>
              </div>
              <div style={{ width: '700px', height: '100%', border: 'solid', marginBottom: '100px'}}>
                <img src={require("./outfile.png")} alt="Your cfg will appear here!" style={{ width: '600px', overflow: 'hidden'}}/>
              </div>
            </div>
            <div className="right-side" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
              <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                <InfoIcon/>
                <button className="bigButton" onClick={gen}>Generate!</button>
                <div style={{ width: '55px', marginLeft: '25px', marginRight: '10px', fontSize: '20px' }}>Width:</div>
                <input style={{ width: '35px', height: '30px', fontSize: '18px' }}
                      id="width"
                      value={inputValue}
                      onChange={handleInputChange}>
                </input>
                <div style={{ display: "flex", alignItems: "center", flexDirection: "column", marginLeft: "5px" }}>
                  <button className="upButton" onClick={increment}>
                    <img alt="icon" src={require("./arrow.png")} style={{ width: '10px', transform: 'rotate(270deg)' }}/>
                  </button>
                  <button className="upButton" onClick={decrement}>
                    <img alt="icon" src={require("./arrow.png")} style={{ width: '10px', transform: 'rotate(90deg)' }}/>
                  </button>
                </div>
              </div>
              <CodeWindow initCode={code} handleCodeChange={handleCodeChange}/>
              <ConsoleWindow save={save}/>
            </div>
          </div>
        ): (
          <>
            <div className="screen" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', marginTop: '100px', position: 'fixed'}}>
              <div className="buttons" style={{ height: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginLeft: '10px'}}>
                <button className="smallButton" onClick={gen} style={{paddingLeft: '5px', paddingRight: '5px', paddingTop: '5px', paddingBottom: '3px', marginBottom: '35px'}}>
                  <img alt="icon" src={require("./reset64.png")} style={{ width: '25px' }}/>
                </button>
                <RunButton width={inputValue}/>
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '30px' }}>
                  <button className="smallButton" onClick={pStep}>
                    <img alt="icon" src={require("./arrow.png")} style={{ width: '15px', transform: 'rotate(180deg)' }}/>
                  </button>
                  <button className="smallButton" onClick={step}>
                    <img alt="icon" src={require("./arrow.png")} style={{ width: '15px' }}/>
                  </button>
                </div>
                <button className="smallButton" onClick={toggle} style={{ paddingLeft: '5px', paddingRight: '5px', paddingTop: '5px', paddingBottom: '3px', marginTop: '30px' }}>
                  <img alt="icon" src={require("./full.png")} style={{ width: '25px' }}/>
                </button>
              </div>
            </div>
            <div className="screen" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '50px'}}>
              <div style={{ width: '80%', height: '100%', border: 'solid', marginBottom: '100px'}}>
                <img src={require("./outfile.png")} alt="Your cfg will appear here!" style={{ width: '100%', overflow: 'hidden'}}/>
              </div>
            </div>
          </>
        )}  
    </div>
  );
}

export default Home;
