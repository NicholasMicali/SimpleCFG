import React, { useState } from 'react';

const InfoIcon = ({}) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div>
      <button 
        onClick={togglePopup} 
        className='smallButton'
        style={{
          paddingLeft: '13px',
          paddingRight: '13px',
          color: 'white',
          marginRight: '30px',
        }}
      >
        ?
      </button>
      {showPopup && (
        <div style={{
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          backgroundColor: 'white', 
          paddingLeft: '50px', 
          paddingRight: '50px', 
          borderStyle: 'solid',
          borderColor: 'darkcyan',
          borderWidth: '3px',
          borderRadius: '10px', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)', 
          zIndex: '1000',
          width: '80%', 
          maxWidth: '600px'
        }}>
          <h1>How to use SimpleCFG:</h1>
          <p>Enter your python code in the code editor. Whichever function is at the top will be transformed into a CFG when you hit Generate! To see the actual output of your code's print statements, press the Output button below. To visualize the execution of your function hit Run, or step through with the buttons on the left. </p>
          <p>The width control allows you to make you graph more narrow if starts to form too many branches. The maximum width is the number of blocks at the widest point in your graph</p>
          <p>This application only excepts python code and it will not execute the right path if you leave ambiguos arguments in the function definintion. If this is the case in your code, you can redeclare the parameters as variables with real values at the top of the function.</p>
          <button onClick={togglePopup} style={{ marginTop: '10px', marginBottom: '20px' }}>Close</button>
        </div>
      )}
    </div>
  );
};

export default InfoIcon;
