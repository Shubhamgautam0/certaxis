// types/certificate.ts
export interface CertificateFormData {
  // Basic Information
  certificateName: string;
  domainName: string;
  selectedCA: string;
  certificateType: string;
  
  // Subject Details
  commonName: string;
  organization: string;
  organizationalUnit: string;
  country: string;
  state: string;
  locality: string;
  email: string;
  
  // Technical Settings
  keySize: string;
  hashAlgorithm: string;
  validityPeriod: string;
  validityUnit: string;
  
  // Key Usage
  keyUsage: {
    digitalSignature: boolean;
    keyEncipherment: boolean;
    dataEncipherment: boolean;
    keyAgreement: boolean;
    keyCertSign: boolean;
    crlSign: boolean;
  };
  
  // Extended Key Usage
  extendedKeyUsage: {
    serverAuth: boolean;
    clientAuth: boolean;
    codeSigning: boolean;
    emailProtection: boolean;
    timeStamping: boolean;
  };
  
  // Additional Settings
  subjectAlternativeNames: string;
  crlDistributionPoints: string;
  ocspServerURL: string;
}