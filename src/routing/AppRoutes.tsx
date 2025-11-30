import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from "../pages/home/home"
import LoginForm from "../pages/login/login"
import SignupForm from "../pages/signup/signup"
import Header from "../components/header/Header";
import '../styles/global.css';
import Sidebar from "../layout/sidebar";
import Dashboard from "../layout/dashboard";
import CreateCA from "../pages/CAManagenent/CreateCA";
import ViewCA from "../pages/CAManagenent/ViewCA";
import GenerateCertificate from "../pages/CertifitaceManagement/GenerateCertificate";
import GenerateMutualCertificate from "../pages/CertifitaceManagement/GenerateMutualCertificate";
import GenerateCertificateWithCSR from "../pages/CertifitaceManagement/GenerateCertificateWithCSR";
import InitiateScan from "../pages/CertificateDiscovery/InitiateScan";
import ViewScanReport from "../pages/CertificateDiscovery/ViewScanReport";

const MainLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeComponent, setActiveComponent] = useState<string>('Dashboard');

  const getActiveComponentFromPath = () => {
    const path = location.pathname;
    if (path === '/dashboard' || path === '/') return 'Dashboard';
    return path.split('/').pop() || 'Dashboard';
  };

  React.useEffect(() => {
    setActiveComponent(getActiveComponentFromPath());
  }, [location]);

  const handleSetActiveComponent = (component: string) => {
    setActiveComponent(component);
    if (component === 'Dashboard') {
      navigate('/dashboard');
    } else {
      navigate(`/${component}`);
    }
  };

  return (
    <div className="app">
      <Sidebar
        activeComponent={activeComponent}
        setActiveComponent={handleSetActiveComponent}
      />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />

        {/* Dashboard Routes with Layout */}
        <Route path="/dashboard" element={
          <MainLayoutWrapper>
            <Dashboard />
          </MainLayoutWrapper>
        } />
        <Route path="/CreateCA" element={
          <MainLayoutWrapper>
            <CreateCA />
          </MainLayoutWrapper>
        } />
        <Route path="/ViewCA" element={
          <MainLayoutWrapper>
            <ViewCA />
          </MainLayoutWrapper>
        } />
        <Route path="/GenerateCertificate" element={
          <MainLayoutWrapper>
            <GenerateCertificate />
          </MainLayoutWrapper>
        } />
        <Route path="/GenerateMutualCertificate" element={
          <MainLayoutWrapper>
            <GenerateMutualCertificate />
          </MainLayoutWrapper>
        } />
        <Route path="/GenerateCertificateWithCSR" element={
          <MainLayoutWrapper>
            <GenerateCertificateWithCSR />
          </MainLayoutWrapper>
        } />
        <Route path="/InitiateScan" element={
          <MainLayoutWrapper>
            <InitiateScan />
          </MainLayoutWrapper>
        } />
        <Route path="/ViewScanReport" element={
          <MainLayoutWrapper>
            <ViewScanReport />
          </MainLayoutWrapper>
        } />
      </Routes>
    </Router>
  )
}

export default AppRoutes;