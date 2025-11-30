interface SidebarProps {
  activeComponent: string;
  setActiveComponent: (component: string) => void;
}

export interface SidebarItem {
  name: string;
  icon?: string;
  component?: string;
  path?: string; 
  subItems?: {
    name: string;
    component: string;
    path: string; 
  }[];
}

export const sidebarItems: SidebarItem[] = [
  { 
    name: 'Dashboard',
    component: 'Dashboard',
    path: '/dashboard'
  },
  { 
    name: 'CA Management',
    subItems: [
      { name: 'Create CA', component: 'CreateCA', path: '/CreateCA' },
      { name: 'View CA', component: 'ViewCA', path: '/ViewCA' },
    ]
  },
  { 
    name: 'Certificate Management',
    subItems: [
      { name: 'Generate Certificate', component: 'GenerateCertificate', path: '/GenerateCertificate' },
      { name: 'Generate Mutual Certificate', component: 'GenerateMutualCertificate', path: '/GenerateMutualCertificate' },
      { name: 'Generate Certificate with CSR', component: 'GenerateCertificateWithCSR', path: '/GenerateCertificateWithCSR' }
    ]
  },
  { 
    name: 'Certificate Discovery',
    subItems: [
      { name: 'Initiate Scan', component: 'InitiateScan', path: '/InitiateScan' },
      { name: 'View Scan Report', component: 'ViewScanReport', path: '/ViewScanReport' }
    ]
  },
];