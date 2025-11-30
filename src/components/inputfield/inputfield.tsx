// components/InputText.tsx
import React from 'react';

interface InputTextProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  type?: 'text' | 'email' | 'number';
  error?: string;
  className?: string;
}

const InputField: React.FC<InputTextProps> = ({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  required = false,
  disabled = false,
  type = 'text',
  error = '',
  className = ''
}) => {
  return (
    <div className={`form-group ${className}`}>
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={`form-input ${error ? 'error' : ''}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default InputField;