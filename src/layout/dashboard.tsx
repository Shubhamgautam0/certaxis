import React from 'react';
import Header from './header';
import StatsCard from './statusCard';
import ChartCard from './chartCard';
import SecurityIssues from './securityIssue'; 
// import { CertificateProcess } from './certificateProcess'; // Import the component
import { dashboardData } from '../data/dashboard';
import CertificateProcesses from './certificateProcess';
import AlgorithmDistribution from './AlgorithmDistribution';

const Dashboard: React.FC = () => {
  const { 
    certificateStats, 
    algorithmDistribution, 
    processStatus, 
    securityIssues,
    rsaCertificates,
    eccCertificates,
    validationStatus 
  } = dashboardData;

  // Mock data for the chart - you'll need to add this to your dashboardData
  const certificateProcessData = {
    chartSeries: [
      { name: 'Certificates Processed', data: [65, 78, 66, 79, 95, 87, 90, 91, 76, 85, 92, 88] },
      { name: 'Certificates Issued', data: [50, 62, 55, 65, 75, 70, 78, 80, 68, 72, 85, 79] }
    ]
  };

  return (
    <div className="dashboard">
      <Header />
      
      <div className="stats-grid">
        <StatsCard
          title="Total Certificates"
          value={certificateStats.total.toString()}
          growth={certificateStats.growth}
          trend="up"
        />
        <StatsCard
          title="Compliance Rate"
          value={`${certificateStats.complianceRate}%`}
          growth={certificateStats.complianceGrowth}
          trend="up"
        />
        <StatsCard
          title="Security Issues"
          value={certificateStats.securityIssues.toString()}
          change={-certificateStats.fixedIssues}
          trend="down"
        />
        <StatsCard
          title="Active Processes"
          value={certificateStats.activeProcesses.toString()}
          growth={certificateStats.processesGrowth}
          trend="up"
        />
      </div>

      <div className="charts-grid">
        <div className="chart-row">

          {/* Add the CertificateProcess component */}
          <CertificateProcesses />

          <AlgorithmDistribution />
        </div>

        <div className="chart-row">
          <ChartCard title="Certificate Types">
            <div className="certificate-types">
              <div className="type-item">
                <span>RSA Certificates</span>
                <div className="type-stats">
                  <span className="type-count">{rsaCertificates.count}</span>
                  <span className="type-percentage">{rsaCertificates.percentage}%</span>
                </div>
              </div>
              <div className="type-item">
                <span>ECC Certificates</span>
                <div className="type-stats">
                  <span className="type-count">{eccCertificates.count}</span>
                  <span className="type-percentage">{eccCertificates.percentage}%</span>
                </div>
              </div>
            </div>
          </ChartCard>

          <SecurityIssues issues={securityIssues} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;