import React, { useState } from 'react';
import Sidebar from '../../layout/sidebar';
import Dashboard from '../../layout/dashboard';
import '../../styles/global.css';
import CreateCA from '../../pages/CAManagenent/CreateCA';
import ViewCA from '../../pages/CAManagenent/ViewCA';
import EditCA from '../../pages/CAManagenent/EditCA';
import DeleteCA from '../../pages/CAManagenent/DeleteCA';
import GenerateCertificate from '../../pages/CertifitaceManagement/GenerateCertificate';
import GenerateMutualCertificate from '../../pages/CertifitaceManagement/GenerateMutualCertificate';
import GenerateCertificateWithCSR from '../../pages/CertifitaceManagement/GenerateCertificateWithCSR';
import InitiateScan from '../../pages/CertificateDiscovery/InitiateScan';
import ViewScanReport from '../../pages/CertificateDiscovery/ViewScanReport';

const MainLayout = () => {
  const [activeComponent, setActiveComponent] = useState<string>('Dashboard');

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'Dashboard':
        return <Dashboard />;

      case 'CreateCA':
        return <CreateCA />;

      case 'ViewCA':
        return <ViewCA />;

      case 'EditCA':
        return <EditCA />;

      case 'DeleteCA':
        return <DeleteCA />;

      case 'GenerateCertificate':
        return <GenerateCertificate />;

      case 'GenerateMutualCertificate':
        return <GenerateMutualCertificate />;

      case 'GenerateCertificateWithCSR':
        return <GenerateCertificateWithCSR />;

      case 'InitiateScan':
        return <InitiateScan />;

      case 'ViewScanReport':
        return <ViewScanReport />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar 
        activeComponent={activeComponent} 
        setActiveComponent={setActiveComponent} 
      />
      <main className="main-content">
        {renderActiveComponent()}
      </main>
    </div>
  );
};

export default MainLayout;