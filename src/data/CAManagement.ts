// data/certificateFormConfig.ts
export interface FormFieldConfig {
  name: keyof CertificateFormData;
  label: string;
  type?: 'text' | 'email' | 'number';
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
}

export interface CertificateFormData {
  commonName: string;
  organization: string;
  organizationalUnit: string;
  locality: string;
  state: string;
  country: string;
  signatureAlgorithm: string;
  validityInDays: string;
  alias: string;
}

export const certificateFormConfig: FormFieldConfig[] = [
  {
    name: 'commonName',
    label: 'Common Name',
    placeholder: 'Enter your Full Name',
    required: true,
    type: 'text'
  },
  {
    name: 'organization',
    label: 'Organization',
    placeholder: 'Enter your Organization Name',
    required: true,
    type: 'text'
  },
  {
    name: 'organizationalUnit',
    label: 'Organizational Unit',
    placeholder: 'Organizational Unit',
    required: true,
    type: 'text'
  },
  {
    name: 'locality',
    label: 'Locality',
    placeholder: 'Locality',
    required: true,
    type: 'text'
  },
  {
    name: 'state',
    label: 'State',
    placeholder: 'State',
    required: true,
    type: 'text'
  },
  {
    name: 'country',
    label: 'Country Code',
    placeholder: 'Country Code',
    required: true,
    type: 'text',
    maxLength: 2
  },
  {
    name: 'signatureAlgorithm',
    label: 'signatureAlgorithm',
    placeholder: 'signatureAlgorithm',
    required: true,
    type: 'text',
  },
  {
    name: 'validityInDays',
    label: 'validityInDays',
    placeholder: 'validityInDays',
    required: true,
    type: 'text',
  },
  {
    name: 'alias',
    label: 'alias',
    placeholder: 'alias',
    required: true,
    type: 'text',
    maxLength: 2
  }
];

