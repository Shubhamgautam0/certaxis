import React from 'react';
import Header from './header';
import StatsCard from './statusCard';
import ChartCard from './chartCard';
import SecurityIssues from './securityIssue'; 
import { dashboardData } from '../data/dashboard';

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
          <ChartCard title="Certificate Processes">
            <div className="process-bars">
              {Object.entries(processStatus).map(([key, value]) => (
                <div key={key} className="process-bar">
                  <span className="process-label">{key}</span>
                  <div className="bar-container">
                    <div 
                      className="bar" 
                      style={{ width: `${(value / 600) * 100}%` }}
                    ></div>
                  </div>
                  <span className="process-value">{value}</span>
                </div>
              ))}
            </div>
          </ChartCard>

          <ChartCard title="Algorithm Distribution">
            <div className="algorithm-distribution">
              {algorithmDistribution.map((algo) => (
                <div key={algo.name} className="algorithm-item">
                  <div className="algorithm-info">
                    <span className="algorithm-name">{algo.name}</span>
                    <span className="algorithm-percentage">{algo.percentage}%</span>
                  </div>
                  <div className="algorithm-bar">
                    <div 
                      className="algorithm-fill"
                      style={{ width: `${algo.percentage}%` }}
                    ></div>
                  </div>
                  <span className="algorithm-count">{algo.count}</span>
                </div>
              ))}
            </div>
          </ChartCard>
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