// components/GenerateCertificate.tsx
import React, { useState } from 'react';
import InputField from '../../components/inputfield/inputfield';
import './generateCertificate.css';
import type { CertificateFormData } from '../../data/generateCertificate';

const GenerateCertificate: React.FC = () => {
  // Dummy data for dropdowns
  const caOptions = [
    { value: 'ca1', label: 'Root CA - My Company Root' },
    { value: 'ca2', label: 'Intermediate CA - Web Services' },
    { value: 'ca3', label: 'Intermediate CA - Internal Apps' }
  ];

  const certificateTypes = [
    { value: 'server', label: 'Server Certificate' },
    { value: 'client', label: 'Client Certificate' },
    { value: 'email', label: 'Email Certificate' },
    { value: 'codeSigning', label: 'Code Signing Certificate' }
  ];

  const keySizes = [
    { value: '2048', label: '2048 bits' },
    { value: '3072', label: '3072 bits' },
    { value: '4096', label: '4096 bits' }
  ];

  const hashAlgorithms = [
    { value: 'SHA256', label: 'SHA-256' },
    { value: 'SHA384', label: 'SHA-384' },
    { value: 'SHA512', label: 'SHA-512' }
  ];

  const countries = [
    { value: 'US', label: 'United States' },
    { value: 'IN', label: 'India' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'CA', label: 'Canada' }
  ];

  // Initial form state with dummy data
  const [formData, setFormData] = useState<CertificateFormData>({
    // Basic Information
    certificateName: 'web-server-001',
    domainName: 'example.com',
    selectedCA: 'ca2',
    certificateType: 'server',
    
    // Subject Details
    commonName: 'www.example.com',
    organization: 'Example Corporation',
    organizationalUnit: 'IT Department',
    country: 'US',
    state: 'California',
    locality: 'San Francisco',
    email: 'admin@example.com',
    
    // Technical Settings
    keySize: '2048',
    hashAlgorithm: 'SHA256',
    validityPeriod: '365',
    validityUnit: 'days',
    
    // Key Usage
    keyUsage: {
      digitalSignature: true,
      keyEncipherment: true,
      dataEncipherment: false,
      keyAgreement: false,
      keyCertSign: false,
      crlSign: false
    },
    
    // Extended Key Usage
    extendedKeyUsage: {
      serverAuth: true,
      clientAuth: false,
      codeSigning: false,
      emailProtection: false,
      timeStamping: false
    },
    
    // Additional Settings
    subjectAlternativeNames: 'example.com\nwww.example.com\n*.example.com',
    crlDistributionPoints: 'http://crl.example.com/root.crl',
    ocspServerURL: 'http://ocsp.example.com'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (name.startsWith('keyUsage.') || name.startsWith('extendedKeyUsage.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof CertificateFormData] as any,
          [child]: (e.target as HTMLInputElement).checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Certificate Data:', formData);
    alert('Certificate generated successfully!');
    // Here you would typically send the data to your backend API
  };

  const handleReset = () => {
    setFormData({
      certificateName: '',
      domainName: '',
      selectedCA: '',
      certificateType: '',
      commonName: '',
      organization: '',
      organizationalUnit: '',
      country: '',
      state: '',
      locality: '',
      email: '',
      keySize: '',
      hashAlgorithm: '',
      validityPeriod: '',
      validityUnit: 'days',
      keyUsage: {
        digitalSignature: false,
        keyEncipherment: false,
        dataEncipherment: false,
        keyAgreement: false,
        keyCertSign: false,
        crlSign: false
      },
      extendedKeyUsage: {
        serverAuth: false,
        clientAuth: false,
        codeSigning: false,
        emailProtection: false,
        timeStamping: false
      },
      subjectAlternativeNames: '',
      crlDistributionPoints: '',
      ocspServerURL: ''
    });
  };

  return (
    <div className="certificate-form-container">
      <h2>Generate Certificate</h2>
      
      <form onSubmit={handleSubmit} className="certificate-form">
        {/* Basic Information Section */}
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-row">
            <InputField
              label="Certificate Name"
              name="certificateName"
              value={formData.certificateName}
              onChange={handleInputChange}
              placeholder="Enter certificate name"
              required
              className="form-col"
            />
            
            <InputField
              label="Domain/Subject Name"
              name="domainName"
              value={formData.domainName}
              onChange={handleInputChange}
              placeholder="Enter domain name"
              required
              className="form-col"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group form-col">
              <label className="form-label">Select CA</label>
              <select
                name="selectedCA"
                value={formData.selectedCA}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select a CA</option>
                {caOptions.map(ca => (
                  <option key={ca.value} value={ca.value}>{ca.label}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group form-col">
              <label className="form-label">Certificate Type</label>
              <select
                name="certificateType"
                value={formData.certificateType}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select type</option>
                {certificateTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Subject Details Section */}
        <div className="form-section">
          <h3>Subject Details</h3>
          <div className="form-row">
            <InputField
              label="Common Name (CN)"
              name="commonName"
              value={formData.commonName}
              onChange={handleInputChange}
              placeholder="e.g., www.example.com"
              required
              className="form-col"
            />
            
            <InputField
              label="Organization (O)"
              name="organization"
              value={formData.organization}
              onChange={handleInputChange}
              placeholder="Organization name"
              className="form-col"
            />
          </div>
          
          <div className="form-row">
            <InputField
              label="Organizational Unit (OU)"
              name="organizationalUnit"
              value={formData.organizationalUnit}
              onChange={handleInputChange}
              placeholder="Department name"
              className="form-col"
            />
            
            <div className="form-group form-col">
              <label className="form-label">Country (C)</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="">Select country</option>
                {countries.map(country => (
                  <option key={country.value} value={country.value}>{country.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <InputField
              label="State/Province (ST)"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="State or province"
              className="form-col"
            />
            
            <InputField
              label="Locality/City (L)"
              name="locality"
              value={formData.locality}
              onChange={handleInputChange}
              placeholder="City name"
              className="form-col"
            />
          </div>
          
          <div className="form-row">
            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="email@example.com"
              className="form-col"
            />
          </div>
        </div>

        {/* Technical Settings Section */}
        <div className="form-section">
          <h3>Technical Settings</h3>
          <div className="form-row">
            <div className="form-group form-col">
              <label className="form-label">Key Size</label>
              <select
                name="keySize"
                value={formData.keySize}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select key size</option>
                {keySizes.map(size => (
                  <option key={size.value} value={size.value}>{size.label}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group form-col">
              <label className="form-label">Hash Algorithm</label>
              <select
                name="hashAlgorithm"
                value={formData.hashAlgorithm}
                onChange={handleInputChange}
                className="form-input"
                required
              >
                <option value="">Select algorithm</option>
                {hashAlgorithms.map(algo => (
                  <option key={algo.value} value={algo.value}>{algo.label}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group form-col">
              <label className="form-label">Validity Period</label>
              <div className="validity-input-group">
                <input
                  type="number"
                  name="validityPeriod"
                  value={formData.validityPeriod}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="365"
                  min="1"
                  required
                />
                <select
                  name="validityUnit"
                  value={formData.validityUnit}
                  onChange={handleInputChange}
                  className="form-input unit-select"
                >
                  <option value="days">Days</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" onClick={handleReset} className="btn btn-secondary">
            Reset Form
          </button>
          <button type="submit" className="btn btn-primary">
            Generate Certificate
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenerateCertificate;