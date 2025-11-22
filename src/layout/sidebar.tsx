import React, { useState } from 'react';
import { sidebarItems } from '../data/dashboard';

interface SidebarProps {
  activeComponent: string;
  setActiveComponent: (component: string) => void;
}

interface SubItem {
  name: string;
  component: string;
}

interface SidebarItem {
  name: string;
  icon?: string;
  subItems?: SubItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ activeComponent, setActiveComponent }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemName: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    setExpandedItems(newExpanded);
  };

  const handleSubItemClick = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>CERTAXIS</h1>
        <p>Certificate Lifecycle Manager</p>
      </div>
      
      <div className="user-info">
        <div className="user-avatar">MC</div>
        <div className="user-details">
          <span className="user-name">Michael Chen</span>
          <span className="user-role">Admin</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {sidebarItems.map((item) => (
          <div key={item.name} className="nav-item-wrapper">
            {item.subItems ? (
              <>
                <button
                  className={`nav-item nav-parent ${expandedItems.has(item.name) ? 'expanded' : ''}`}
                  onClick={() => toggleExpanded(item.name)}
                >
                  <span>{item.name}</span>
                  <span className="dropdown-arrow">
                    {expandedItems.has(item.name) ? '▼' : '▶'}
                  </span>
                </button>
                {expandedItems.has(item.name) && (
                  <div className="subitems-container">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.component}
                        className={`nav-item subitem ${activeComponent === subItem.component ? 'active' : ''}`}
                        onClick={() => handleSubItemClick(subItem.component)}
                      >
                        {subItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <button
                className={`nav-item ${activeComponent === item.name ? 'active' : ''}`}
                onClick={() => setActiveComponent(item.name)}
              >
                {item.name}
              </button>
            )}
          </div>
        ))}
      </nav>
      
      <div className="sidebar-footer">
        <div className="version">Version 2.1.0</div>
        <div className="copyright">© 2025 Certaxis</div>
      </div>
    </div>
  );
};

export default Sidebar;