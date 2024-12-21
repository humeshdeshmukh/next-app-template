'use client';

import { useState } from 'react';
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { calculateBusinessTax } from '../../utils/tax-calculations';
import { BusinessTaxFormData } from '../../types/tax-types';
import { industries } from '../../constants/tax-constants';

export default function BusinessTaxCalculator() {
  const [formData, setFormData] = useState<BusinessTaxFormData>({
    turnover: '',
    revenue: '',
    businessExpenses: '',
    employeeCount: '',
    industry: 'manufacturing'
  });

  const handleInputChange = (field: keyof BusinessTaxFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <Input
        type="number"
        label="Annual Turnover (₹)"
        placeholder="Enter total annual turnover"
        value={formData.turnover}
        onChange={(e) => handleInputChange('turnover', e.target.value)}
      />
      <Input
        type="number"
        label="Revenue (₹)"
        placeholder="Enter annual revenue"
        value={formData.revenue}
        onChange={(e) => handleInputChange('revenue', e.target.value)}
      />
      <Input
        type="number"
        label="Business Expenses (₹)"
        placeholder="Enter total business expenses"
        value={formData.businessExpenses}
        onChange={(e) => handleInputChange('businessExpenses', e.target.value)}
      />
      <Input
        type="number"
        label="Number of Employees"
        placeholder="Enter number of employees"
        value={formData.employeeCount}
        onChange={(e) => handleInputChange('employeeCount', e.target.value)}
      />
      <Select
        label="Industry Sector"
        placeholder="Select your industry"
        selectedKeys={[formData.industry]}
        onChange={(e) => handleInputChange('industry', e.target.value)}
      >
        {industries.map((industry) => (
          <SelectItem key={industry.value} value={industry.value}>
            {industry.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
