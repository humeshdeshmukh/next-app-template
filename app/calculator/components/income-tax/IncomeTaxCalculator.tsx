'use client';

import { useState } from 'react';
import { Input } from "@nextui-org/input";
import { calculateIncomeTax } from '../../utils/tax-calculations';
import { IncomeTaxFormData } from '../../types/tax-types';

export default function IncomeTaxCalculator() {
  const [formData, setFormData] = useState<IncomeTaxFormData>({
    salary: '',
    professionalIncome: '',
    rentalIncome: '',
    otherIncome: '',
    section80C: '',
    section80D: '',
    section80G: '',
    section80TTA: '',
    section80E: '',
    hra: '',
    lta: '',
    foodAllowance: '',
    transportAllowance: ''
  });

  const handleInputChange = (field: keyof IncomeTaxFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="text-lg font-semibold mb-2">Income Sources</div>
      <Input
        type="number"
        label="Salary Income (₹)"
        placeholder="Enter your salary income"
        value={formData.salary}
        onChange={(e) => handleInputChange('salary', e.target.value)}
      />
      <Input
        type="number"
        label="Professional Income (₹)"
        placeholder="Enter professional/business income"
        value={formData.professionalIncome}
        onChange={(e) => handleInputChange('professionalIncome', e.target.value)}
      />
      <Input
        type="number"
        label="Rental Income (₹)"
        placeholder="Enter rental income"
        value={formData.rentalIncome}
        onChange={(e) => handleInputChange('rentalIncome', e.target.value)}
      />
      <Input
        type="number"
        label="Other Income (₹)"
        placeholder="Enter other income sources"
        value={formData.otherIncome}
        onChange={(e) => handleInputChange('otherIncome', e.target.value)}
      />
      
      <div className="text-lg font-semibold mt-4 mb-2">Deductions</div>
      <Input
        type="number"
        label="Section 80C (₹)"
        placeholder="PPF, ELSS, LIC etc. (max ₹1.5L)"
        value={formData.section80C}
        onChange={(e) => handleInputChange('section80C', e.target.value)}
      />
      <Input
        type="number"
        label="Section 80D (₹)"
        placeholder="Health Insurance (max ₹25,000)"
        value={formData.section80D}
        onChange={(e) => handleInputChange('section80D', e.target.value)}
      />
      <Input
        type="number"
        label="Section 80G (₹)"
        placeholder="Charitable Donations"
        value={formData.section80G}
        onChange={(e) => handleInputChange('section80G', e.target.value)}
      />
      <Input
        type="number"
        label="Section 80TTA (₹)"
        placeholder="Savings Account Interest (max ₹10,000)"
        value={formData.section80TTA}
        onChange={(e) => handleInputChange('section80TTA', e.target.value)}
      />
      <Input
        type="number"
        label="Section 80E (₹)"
        placeholder="Education Loan Interest"
        value={formData.section80E}
        onChange={(e) => handleInputChange('section80E', e.target.value)}
      />
      
      <div className="text-lg font-semibold mt-4 mb-2">Allowances</div>
      <Input
        type="number"
        label="HRA (₹)"
        placeholder="House Rent Allowance"
        value={formData.hra}
        onChange={(e) => handleInputChange('hra', e.target.value)}
      />
      <Input
        type="number"
        label="LTA (₹)"
        placeholder="Leave Travel Allowance (max ₹50,000)"
        value={formData.lta}
        onChange={(e) => handleInputChange('lta', e.target.value)}
      />
      <Input
        type="number"
        label="Food Allowance (₹)"
        placeholder="Food Allowance (max ₹2,200/month)"
        value={formData.foodAllowance}
        onChange={(e) => handleInputChange('foodAllowance', e.target.value)}
      />
      <Input
        type="number"
        label="Transport Allowance (₹)"
        placeholder="Transport Allowance (max ₹1,600/month)"
        value={formData.transportAllowance}
        onChange={(e) => handleInputChange('transportAllowance', e.target.value)}
      />
    </div>
  );
}
