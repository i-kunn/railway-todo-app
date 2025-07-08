import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const LinkButton = ({ to, children, className = '', ...props }) => {
  return (
    <Link to={to} className={`app_button ${className}`} {...props}>
      {children}
    </Link>
  );
};

LinkButton.propTypes = {
  to: PropTypes.string.isRequired, // 「文字列必須です」
  children: PropTypes.node.isRequired, // 「中に入れる要素は必須です」
  className: PropTypes.string, // 「任意のclassも渡せます」
};
export default LinkButton;
