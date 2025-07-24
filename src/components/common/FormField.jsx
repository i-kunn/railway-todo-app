import PropTypes from 'prop-types';
import './FormField.css';
const FormField = ({ id, label, children }) => {
  return (
    <fieldset className="form-field">
      <label htmlFor={id} className="form-field__label">
        {label}
      </label>
      {children}
    </fieldset>
  );
};

FormField.propTypes = {
  id: PropTypes.string.isRequired, // The id of the input element
  label: PropTypes.string.isRequired, // The label text for the input
  children: PropTypes.node.isRequired, // The input element or other components to be rendered inside the fieldset
  className: PropTypes.string,
};
export default FormField;
