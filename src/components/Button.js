import React from 'react';

const Button = ({ type, children }) => {
  return (
    <button
      type={type || 'submit'}
      style={{
        width: '60%',
        fontSize: ' 20px',
        background: '#EF5DA8',
        color: 'white',
        border: 'none',
        outline: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        padding: '10px',
      }}
    >
      {children}
    </button>
  );
};

export default Button;
