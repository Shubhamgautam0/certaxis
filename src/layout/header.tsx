import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="dashboard-header">
      {/* <h1>Dashboard</h1> */}
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search certificates, domains, algorithms..." 
        />
      </div>
    </header>
  );
};

export default Header;