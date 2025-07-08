// components/common/NormalButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './NormalButton.css';

const NormalButton = ({ type = 'button', children, variant = 'primary', ...props }) => {
  const className = `app_button app_button--${variant}`;
  return (
    <button type={type} className={className} {...props}>
      {children}
    </button>
  );
};

NormalButton.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
};

// ✅ default export にする
export default NormalButton;

// export const NormalButton = ({ type = 'button', children, variant = 'primary', ...props }) => {
//   const className = `app_button app_button--${variant}`;
//   return (
//     <button type={type} className={className} {...props}>
//       {children}
//     </button>
//   );
// };
// NormalButton.propTypes = {
//   type: PropTypes.string, // 「ボタンのタイプを指定できます。デフォルトは 'button' です」
//   children: PropTypes.node.isRequired, // 「中に入れる要素は必須です」
//   variant: PropTypes.oneOf(['primary', 'secondary', 'danger']), // 「ボタンのスタイルを指定できます」
// };