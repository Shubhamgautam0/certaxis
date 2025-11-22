import React from 'react';
import type { SecurityIssue } from '../data/dashboard';
// import { SecurityIssue } from '../data/dashboard';

interface SecurityIssuesProps {
  issues: SecurityIssue[];
}

const SecurityIssues: React.FC<SecurityIssuesProps> = ({ issues }) => {
  return (
    <div className="chart-card">
      <h3 className="chart-title">Security Issues</h3>
      <div className="security-issues">
        <div className="issues-count">23</div>
        <div className="issues-list">
          {issues.map((issue) => (
            <div key={issue.type} className="issue-item">
              <span className="issue-type">{issue.type}</span>
              <span className="issue-stats">
                {issue.count} / {issue.total}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityIssues;