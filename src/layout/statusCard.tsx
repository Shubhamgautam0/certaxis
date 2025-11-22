import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  growth?: number;
  change?: number;
  trend: 'up' | 'down';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  growth, 
  change, 
  trend 
}) => {
  return (
    <div className="stats-card">
      <h3 className="stats-title">{title}</h3>
      <div className="stats-value">{value}</div>
      <div className={`stats-change ${trend}`}>
        {growth !== undefined && (
          <>
            {trend === 'up' ? '↑' : '↓'} 
            {Math.abs(growth)}%
          </>
        )}
        {change !== undefined && (
          <>
            {trend === 'up' ? '+' : '-'}
            {Math.abs(change)} fixed
          </>
        )}
      </div>
    </div>
  );
};

export default StatsCard;