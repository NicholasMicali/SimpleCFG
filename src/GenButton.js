import React from 'react';

const GenButton = ({ steps, onGen }) => {

  
  return (
    <div>
      <button style={{background: 'none', fontSize: '20px', padding: '5px', borderRadius: '7px', marginBottom: '5px'}} onClick={onGen}>Generate!</button>
    </div>
  );
};

export default GenButton;
