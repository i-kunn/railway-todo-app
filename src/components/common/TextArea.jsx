import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({ value, onChange, ...props }) => (
  <textarea value={value} onChange={onChange} {...props} />
);

TextArea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TextArea;
