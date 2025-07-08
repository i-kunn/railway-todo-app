import PropTypes from 'prop-types';
const TextInput = ({ value, onChange, ...props }) => (
  <input type="text" value={value} onChange={onChange} {...props} />
);
TextInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default TextInput;
