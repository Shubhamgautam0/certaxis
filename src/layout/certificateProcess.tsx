import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/certificateProcesses.css';

interface CertificateProcessData {
  active: number;
  completed: number;
  failed: number;
}

interface ChartData {
  issuance: CertificateProcessData;
  renewal: CertificateProcessData;
  revocation: CertificateProcessData;
  validation: CertificateProcessData;
}

const CertificateProcesses: React.FC = () => {
  // Sample data matching the chart
  const data: ChartData = {
    issuance: { active: 45, completed: 234, failed: 5 },
    renewal: { active: 28, completed: 178, failed: 3 },
    revocation: { active: 12, completed: 67, failed: 2 },
    validation: { active: 71, completed: 423, failed: 8 }
  };

  // Calculate totals
  const totals = {
    active: data.issuance.active + data.renewal.active + data.revocation.active + data.validation.active,
    completed: data.issuance.completed + data.renewal.completed + data.revocation.completed + data.validation.completed,
    failed: data.issuance.failed + data.renewal.failed + data.revocation.failed + data.validation.failed
  };

  // Prepare chart data for Recharts
  const chartData = [
    {
      name: 'Issuance',
      Active: data.issuance.active,
      Completed: data.issuance.completed,
      Failed: data.issuance.failed
    },
    {
      name: 'Renewal',
      Active: data.renewal.active,
      Completed: data.renewal.completed,
      Failed: data.renewal.failed
    },
    {
      name: 'Revocation',
      Active: data.revocation.active,
      Completed: data.revocation.completed,
      Failed: data.revocation.failed
    },
    {
      name: 'Validation',
      Active: data.validation.active,
      Completed: data.validation.completed,
      Failed: data.validation.failed
    }
  ];

  return (
    <div className="certificateProcessesContainer">
      <div className="certificateProcessesCard">
        {/* Header */}
        <div className="certificateProcessesHeader">
          <div className="certificateProcessesHeaderLeft">
            <span className="certificateProcessesIcon">📊</span>
            <h2 className="certificateProcessesTitle">Certificate Processes</h2>
          </div>
          <span className="certificateProcessesBadge">Last 30 days</span>
        </div>

        {/* Content */}
        <div className="certificateProcessesContent">
          {/* Summary Stats */}
          <div className="certificateProcessesStatsGrid">
            <div className="certificateProcessesStatItem">
              <p className="certificateProcessesStatLabel">Active</p>
              <p className={`certificateProcessesStatValue certificateProcessesActiveColor`}>
                {totals.active}
              </p>
            </div>
            
            <div className="certificateProcessesStatItem">
              <p className="certificateProcessesStatLabel">Completed</p>
              <p className={`certificateProcessesStatValue certificateProcessesCompletedColor`}>
                {totals.completed}
              </p>
            </div>
            
            <div className="certificateProcessesStatItem">
              <p className="certificateProcessesStatLabel">Failed</p>
              <p className={`certificateProcessesStatValue certificateProcessesFailedColor`}>
                {totals.failed}
              </p>
            </div>
          </div>

          {/* Chart */}
          <div className="certificateProcessesChartContainer">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  axisLine={{ stroke: '#e2e8f0' }}
                  tickLine={{ stroke: '#e2e8f0' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '12px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ paddingTop: '20px' }}
                  iconType="circle"
                  iconSize={10}
                />
                <Bar 
                  dataKey="Active" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar 
                  dataKey="Completed" 
                  fill="#10b981" 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
                <Bar 
                  dataKey="Failed" 
                  fill="#ef4444" 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateProcesses;