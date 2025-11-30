import React, { useState } from 'react';
import { sidebarItems } from '../data/sidebar';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  activeComponent: string;
  setActiveComponent: (component: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeComponent, setActiveComponent }) => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const location = useLocation();
  const navigate = useNavigate();

  const toggleExpanded = (itemName: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemName)) {
      newExpanded.delete(itemName);
    } else {
      newExpanded.add(itemName);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (component: string, path?: string) => {
    setActiveComponent(component);
    if (path) {
      navigate(path);
    }
  };

  const handleSubItemClick = (component: string, path: string) => {
    setActiveComponent(component);
    navigate(path);
  };

  // Check if item or subitem is active based on current activeComponent
  const isItemActive = (item: any) => {
    if (item.component === activeComponent) return true;
    if (item.subItems) {
      return item.subItems.some((subItem: any) => subItem.component === activeComponent);
    }
    return false;
  };

  const isSubItemActive = (subItem: any) => {
    return subItem.component === activeComponent;
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>CERTAXIS</h1>
        <p>Certificate Lifecycle Manager</p>
      </div>
      
      <div className="user-info">
        <div className="user-avatar">SK</div>
        <div className="user-details">
          <span className="user-name">Shubham Gautam</span>
          <span className="user-role">Admin</span>
        </div>
      </div>

      <div className="sidebar-divider"></div>
      
      <nav className="sidebar-nav">
        {sidebarItems.map((item) => (
          <div key={item.name} className="nav-item-wrapper">
            {item.subItems ? (
              <>
                <button
                  className={`nav-item nav-parent ${
                    expandedItems.has(item.name) ? 'expanded' : ''
                  } ${isItemActive(item) ? 'active-parent' : ''}`}
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
                        className={`nav-item subitem ${
                          isSubItemActive(subItem) ? 'active' : ''
                        }`}
                        onClick={() => handleSubItemClick(subItem.component, subItem.path)}
                      >
                        {subItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <button
                className={`nav-item ${isItemActive(item) ? 'active' : ''}`}
                onClick={() => handleItemClick(item.component!, item.path!)}
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