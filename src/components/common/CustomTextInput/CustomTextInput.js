import React from 'react';
import PropTypes from 'prop-types';

const CustomTextInput = ({ name, value, placeholder, onChange }) => {
  return (
    <input className="large" name={name} type="text" placeholder={placeholder} value={value} onChange={onChange} />
  );
};

const { string, func, number, oneOfType } = PropTypes;

CustomTextInput.propTypes = {
  name: string.isRequired,
  onChange: func.isRequired,
  placeholder: string,
  value: oneOfType([string, number]),
};

CustomTextInput.defaultProps = {
  placeholder: '',
  value: '',
};

export default CustomTextInput;
