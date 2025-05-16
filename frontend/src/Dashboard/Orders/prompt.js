import React, { useState } from 'react';

const Prompt = ({ message, onConfirm, onCancel }) => {
  const [inputValue, setInputValue] = useState('');

  const handleConfirm = () => {
    if (!inputValue) {
      alert('Cancellation reason is required.');
      return;
    }
    onConfirm(inputValue); // Pass the input value (reason) to the onConfirm handler
  };

  return (
    <div className="prompt-overlay">
      <div className="prompt-box">
        <p>{message}</p>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Enter cancellation reason"
        />
        <div className="prompt-actions">
          <button onClick={handleConfirm} className='prompt-actions1'>Confirm</button>
          <button onClick={onCancel} className='prompt-actions2'>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
