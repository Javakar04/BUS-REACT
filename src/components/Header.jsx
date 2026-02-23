import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src="https://via.placeholder.com/40x40" 
          alt="KPRCAS Logo" 
          className="header-logo"
        />
        <span className="header-title">KPR College of Arts, Science & Research</span>
      </div>
    </header>
  );
};

export default Header;
