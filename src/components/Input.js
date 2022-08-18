import React from 'react';
import './input.css';
const Input = ({ input, onChange }) => {
  return <input {...input} onChange={onChange} />;
};

export default Input;
