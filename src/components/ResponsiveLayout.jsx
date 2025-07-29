import { useState } from 'react';
import { Sidebar } from './Sidebar';

export const ResponsiveLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className="hamburger-menu" onClick={() => setIsOpen(true)}>☰</button>

      {isOpen && (
        <div className="sidebar-overlay active" onClick={() => setIsOpen(false)} />
      )}

      <Sidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <main>{children}</main>
    </>
  );
};
