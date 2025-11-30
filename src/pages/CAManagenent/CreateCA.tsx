// components/CertificateForm.tsx
import React, { useState } from 'react';
import { createCA } from '../../api/createCa';
import InputField from '../../components/inputfield/inputfield';
import { 
  certificateFormConfig, 
  type CertificateFormData,
  type FormFieldConfig 
} from '../../data/CAManagement';
import './CreateCA.css';

type FormErrors = {
  [K in keyof CertificateFormData]?: string;
};

interface CertificateFormProps {
  onSubmit?: (formData: CertificateFormData) => void;
  loading?: boolean;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  formConfig?: FormFieldConfig[];
  initialData?: Partial<CertificateFormData>;
}

const CreateCA: React.FC<CertificateFormProps> = ({ 
  onSubmit, 
  loading = false, 
  onSuccess,
  onError,
  formConfig = certificateFormConfig,
  initialData = {}
}) => {
  const [formData, setFormData] = useState<CertificateFormData>({
    commonName: initialData.commonName ?? '',
    organization: initialData.organization ?? '',
    organizationalUnit: initialData.organizationalUnit ?? '',
    locality: initialData.locality ?? '',
    state: initialData.state ?? '',
    country: initialData.country ?? '',
    signatureAlgorithm: initialData.signatureAlgorithm ?? '',
    validityInDays: initialData.validityInDays ?? '',
    alias: initialData.alias ?? ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    formConfig.forEach(field => {
      if (field.required && !formData[field.name]?.toString().trim()) {
        newErrors[field.name] = `${field.label} is required`;
      }

      if (field.name === 'country' && formData.country && formData.country.length !== 2) {
        newErrors.country = 'Country must be a 2-letter code (e.g., US, IN, UK)';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Call the provided onSubmit callback if exists
    if (onSubmit) {
      onSubmit(formData);
      return;
    }

    // If no onSubmit prop provided, use the API directly
    setIsSubmitting(true);

    try {
      // Create FormData and append all fields
      const apiFormData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        apiFormData.append(key, value.toString());
      });

      // Call the API
      const response = await createCA(apiFormData);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(response);
      } else {
        // Default success behavior
        console.log('CA created successfully:');
        alert('Certificate Authority created successfully!');
        handleReset();
      }
    } catch (error: any) {
      console.error('Error creating CA:', error);
      
      // Call error callback if provided
      if (onError) {
        onError(error);
      } else {
        const errorMessage = error.response?.data?.message || error.message || 'Failed to create Certificate Authority';
        alert(`Error: ${errorMessage}`);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
   setFormData({
    commonName: initialData.commonName ?? '',
    organization: initialData.organization ?? '',
    organizationalUnit: initialData.organizationalUnit ?? '',
    locality: initialData.locality ?? '',
    state: initialData.state ?? '',
    country: initialData.country ?? '',
    signatureAlgorithm: initialData.signatureAlgorithm ?? '',
    validityInDays: initialData.validityInDays ?? '',
    alias: initialData.alias ?? ''
  });
  setErrors({});
  };

  const isLoading = loading || isSubmitting;

  return (
    <div className="certificate-form-container">
      <h2 className="form-title">Create Certificate Authority</h2>
      
      <form onSubmit={handleSubmit} className="certificate-form">
        <div>
          {formConfig.map((field) => (
            <InputField
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type || 'text'}
              value={formData[field.name]?.toString() || ''}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              disabled={isLoading}
              error={errors[field.name]}
              className="input-field-wrapper"
            />
          ))}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleReset}
            className="btn btn-secondary"
            disabled={isLoading}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create CA'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCA;