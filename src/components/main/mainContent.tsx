import React from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import Sidebar from '../../layout/sidebar';
import Dashboard from '../../layout/dashboard';
import CreateCA from '../../pages/CAManagenent/CreateCA';
import ViewCA from '../../pages/CAManagenent/ViewCA';


const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveComponent = () => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/') return 'Dashboard';
    return path.split('/').pop() || 'Dashboard';
  };

  const [activeComponent, setActiveComponent] = React.useState<string>(getActiveComponent());

  React.useEffect(() => {
    setActiveComponent(getActiveComponent());
  }, [location]);

  const handleSetActiveComponent = (component: string) => {
    setActiveComponent(component);
    navigate(component === 'Dashboard' ? '/dashboard' : `/${component}`);
  };

  return (
    <div className="app">
      <div className='main-sidebar'>
        <Sidebar 
        activeComponent={activeComponent} 
        setActiveComponent={handleSetActiveComponent} 
      />
      </div>
      <main className="main-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/CreateCA" element={<CreateCA />} />
          <Route path="/ViewCA" element={<ViewCA />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  );
};

export default MainLayout;