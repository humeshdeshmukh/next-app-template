import { useState, useCallback } from 'react';

export function useFormData<T>(initialData: T) {
  const [formData, setFormData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validateField = useCallback((field: keyof T, value: any): string | null => {
    if (typeof value === 'string') {
      if (value === '') return null; // Empty values are allowed

      // Validate numbers
      if (field.toString().includes('amount') || 
          field.toString().includes('income') || 
          field.toString().includes('revenue') || 
          field.toString().includes('expenses')) {
        const num = parseFloat(value);
        if (isNaN(num)) return 'Please enter a valid number';
        if (num < 0) return 'Value cannot be negative';
        if (num > 1000000000000) return 'Value is too large';
      }

      // Validate employee count
      if (field.toString().includes('employeeCount')) {
        const count = parseInt(value);
        if (isNaN(count)) return 'Please enter a valid number';
        if (count < 0) return 'Employee count cannot be negative';
        if (count > 1000000) return 'Employee count is too large';
      }

      // Validate HSN code
      if (field.toString() === 'hsn') {
        if (!/^\d{4,8}$/.test(value)) return 'Invalid HSN code format';
      }
    }

    return null;
  }, []);

  const handleInputChange = useCallback((field: keyof T, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  }, [validateField]);

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setErrors({});
  }, [initialData]);

  const isValid = useCallback(() => {
    return Object.values(errors).every(error => !error);
  }, [errors]);

  return {
    formData,
    errors,
    handleInputChange,
    resetForm,
    isValid
  };
}
