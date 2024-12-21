'use client';

import { useState } from 'react';
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { calculateGST } from '../../utils/tax-calculations';
import { GSTFormData } from '../../types/tax-types';
import { gstRates, gstTypes } from '../../constants/tax-constants';

export default function GSTCalculator() {
  const [formData, setFormData] = useState<GSTFormData>({
    gstAmount: '',
    gstRate: '18',
    gstType: 'regular',
    hsn: '',
    invoiceAmount: ''
  });

  const handleInputChange = (field: keyof GSTFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <Select
        label="GST Registration Type"
        placeholder="Select GST registration type"
        selectedKeys={[formData.gstType]}
        onChange={(e) => handleInputChange('gstType', e.target.value)}
      >
        {gstTypes.map((type) => (
          <SelectItem key={type.value} value={type.value}>
            {type.label}
          </SelectItem>
        ))}
      </Select>
      <Input
        type="text"
        label="HSN/SAC Code"
        placeholder="Enter HSN/SAC code"
        value={formData.hsn}
        onChange={(e) => handleInputChange('hsn', e.target.value)}
      />
      <Input
        type="number"
        label="Invoice Amount (₹)"
        placeholder="Enter invoice amount"
        value={formData.invoiceAmount}
        onChange={(e) => handleInputChange('invoiceAmount', e.target.value)}
      />
      <Input
        type="number"
        label="Taxable Amount (₹)"
        placeholder="Enter amount before GST"
        value={formData.gstAmount}
        onChange={(e) => handleInputChange('gstAmount', e.target.value)}
      />
      <Select
        label="GST Rate"
        placeholder="Select GST rate"
        selectedKeys={[formData.gstRate]}
        onChange={(e) => handleInputChange('gstRate', e.target.value)}
      >
        {gstRates.map((rate) => (
          <SelectItem key={rate.value} value={rate.value}>
            {rate.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
