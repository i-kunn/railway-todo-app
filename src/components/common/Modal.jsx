import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = ({ onClose, children }) => {
  const modalRef = useRef();

  useEffect(() => {
    const focusableEls = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input, select'
    );
    const firstEl = focusableEls[0];
    const lastEl = focusableEls[focusableEls.length - 1];

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="modal_overlay" role="dialog" aria-modal="true">
      <div className="modal_content" ref={modalRef} tabIndex={-1}>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
