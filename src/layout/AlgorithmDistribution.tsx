import React from 'react';
import '../styles/certificateProcesses.css';
interface AlgorithmData {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

const AlgorithmDistribution: React.FC = () => {
  const data: AlgorithmData[] = [
    { name: 'RSA-2048', value: 612, color: '#2563eb', percentage: 49 },
    { name: 'RSA-4096', value: 280, color: '#0ea5e9', percentage: 9 },
    { name: 'ECDSA P-256', value: 245, color: '#06b6d4', percentage: 20 },
    { name: 'ECDSA P-384', value: 110, color: '#14b8a6', percentage: 22 },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90;

  const createPieSlice = (percentage: number, startAngle: number, color: string) => {
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;
    
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = 100 + 100 * Math.cos(startRad);
    const y1 = 100 + 100 * Math.sin(startRad);
    const x2 = 100 + 100 * Math.cos(endRad);
    const y2 = 100 + 100 * Math.sin(endRad);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    return `M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  const getLabelPosition = (percentage: number, startAngle: number) => {
    const angle = (percentage / 100) * 360;
    const midAngle = startAngle + angle / 2;
    const rad = (midAngle * Math.PI) / 180;
    const radius = 70;
    
    return {
      x: 100 + radius * Math.cos(rad),
      y: 100 + radius * Math.sin(rad)
    };
  };

  return (
    <div className="algorithmDistributionContainer">
      <div className="algorithmDistributionHeader">
        <h2 className="algorithmDistributionTitle">
          Algorithm Distribution
        </h2>
      </div>

      <div className="algorithmDistributionChart">
        <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%' }}>
          {data.map((item, index) => {
            const path = createPieSlice(item.percentage, currentAngle, item.color);
            const labelPos = getLabelPosition(item.percentage, currentAngle);
            currentAngle += (item.percentage / 100) * 360;
            
            return (
              <g key={item.name}>
                <path d={path} fill={item.color} />
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#ffffff"
                  fontSize="16"
                  fontWeight="500"
                >
                  {item.percentage}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="algorithmDistributionLegend">
        {data.map((item) => (
          <div key={item.name} className="algorithmDistributionLegendItem">
            <div 
              className="algorithmDistributionColorIndicator"
              style={{ backgroundColor: item.color }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
              <span className="algorithmDistributionName">
                {item.name}
              </span>
              <span className="algorithmDistributionValue">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlgorithmDistribution;