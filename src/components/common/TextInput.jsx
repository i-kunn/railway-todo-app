import React from 'react';
import PropTypes from 'prop-types';
const TextInput = ({ id, value, onChange, ...props }) => (
  <input id={id} type="text" value={value} onChange={onChange} {...props} />
);
TextInput.propTypes = {
  id: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default TextInput;
