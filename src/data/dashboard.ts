export interface CertificateStats {
  total: number;
  growth: number;
  complianceRate: number;
  complianceGrowth: number;
  securityIssues: number;
  fixedIssues: number;
  activeProcesses: number;
  processesGrowth: number;
}

export interface AlgorithmDistribution {
  name: string;
  percentage: number;
  count: number;
}

export interface ProcessStatus {
  issuance: number;
  active: number;
  removal: number;
  completed: number;
  revocation: number;
  failed: number;
}

export interface SecurityIssue {
  type: string;
  count: number;
  total: number;
}

export interface DashboardData {
  certificateStats: CertificateStats;
  certificateProcessData: { chartSeries: { name: string; data: number[] }[] };
  algorithmDistribution: AlgorithmDistribution[];
  processStatus: ProcessStatus;
  securityIssues: SecurityIssue[];
  rsaCertificates: {
    count: number;
    percentage: number;
  };
  eccCertificates: {
    count: number;
    percentage: number;
  };
  validationStatus: {
    completed: number;
    failed: number;
  };
}

export const dashboardData: DashboardData = {
  certificateStats: {
    total: 1247,
    growth: 12.5,
    complianceRate: 94.3,
    complianceGrowth: 2.1,
    securityIssues: 23,
    fixedIssues: 8,
    activeProcesses: 156,
    processesGrowth: 18.3
  },
  certificateProcessData: {
    chartSeries: [
      { name: 'Certificates Processed', data: [65, 78, 66, 79, 95, 87, 90, 91, 76, 85, 92, 88] },
      { name: 'Certificates Issued', data: [50, 62, 55, 65, 75, 70, 78, 80, 68, 72, 85, 79] }
    ]
  },
  algorithmDistribution: [
    { name: 'RSA-2048', percentage: 49, count: 612 },
    { name: 'ECDSA P-256', percentage: 22, count: 245 },
    { name: 'RSA-4096', percentage: 20, count: 280 },
    { name: 'ECDSA P-384', percentage: 9, count: 110 }
  ],
  processStatus: {
    issuance: 600,
    active: 460,
    removal: 300,
    completed: 150,
    revocation: 0,
    failed: 0
  },
  securityIssues: [
    { type: 'SSL/TLS', count: 23, total: 1247 },
    { type: 'Code Signing', count: 0, total: 1247 },
    { type: 'Email (S/MIME)', count: 0, total: 1247 },
    { type: 'Document Signing', count: 0, total: 1247 }
  ],
  rsaCertificates: {
    count: 892,
    percentage: 71.5
  },
  eccCertificates: {
    count: 355,
    percentage: 28.5
  },
  validationStatus: {
    completed: 902,
    failed: 18
  }
};

