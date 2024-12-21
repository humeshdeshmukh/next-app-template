'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Selection } from "@nextui-org/react";
import IncomeTaxCalculator from './components/income-tax/IncomeTaxCalculator';
import BusinessTaxCalculator from './components/business-tax/BusinessTaxCalculator';
import GSTCalculator from './components/gst/GSTCalculator';
import TaxResultDisplay from './components/TaxResult';
import { calculateIncomeTax, calculateBusinessTax, calculateGST } from './utils/tax-calculations';
import { TaxResult } from './types/tax-types';

interface FormData {
  // Income Tax Fields
  income: string;
  salary: string;
  professionalIncome: string;
  rentalIncome: string;
  otherIncome: string;
  // Standard Deductions
  section80C: string;
  section80D: string;
  section80G: string;
  section80TTA: string;
  section80E: string;
  // Allowances
  hra: string;
  lta: string;
  foodAllowance: string;
  transportAllowance: string;
  // Business Fields
  revenue: string;
  businessExpenses: string;
  employeeCount: string;
  industry: string;
  turnover: string;
  // GST Fields
  gstAmount: string;
  gstRate: string;
  gstType: string;
  hsn: string;
  invoiceAmount: string;
}

export default function Calculator() {
  const [calculatorType, setCalculatorType] = useState<Selection>(new Set(['income']));
  const [result, setResult] = useState<TaxResult | null>(null);
  const [formData, setFormData] = useState<FormData>({
    // Initialize all fields
    income: '',
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
    transportAllowance: '',
    revenue: '',
    businessExpenses: '',
    employeeCount: '',
    industry: 'manufacturing',
    turnover: '',
    gstAmount: '',
    gstRate: '18',
    gstType: 'regular',
    hsn: '',
    invoiceAmount: ''
  });

  const handleCalculate = () => {
    const type = Array.from(calculatorType)[0] as string;
    let calculationResult: TaxResult | null = null;

    switch (type) {
      case 'income':
        calculationResult = calculateIncomeTax(formData);
        break;
      case 'business':
        calculationResult = calculateBusinessTax(formData);
        break;
      case 'gst':
        calculationResult = calculateGST(formData);
        break;
    }

    setResult(calculationResult);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-center">Advanced Indian Tax Calculator</h1>
          <p className="text-default-500 text-center">Calculate Income Tax, Business Tax, and GST as per latest Indian regulations</p>
        </CardHeader>
        <CardBody>
          <Tabs 
            aria-label="Calculator Options" 
            selectedKey={Array.from(calculatorType)[0]}
            onSelectionChange={(key: Selection) => setCalculatorType(key)}
            className="mb-6"
          >
            <Tab key="income" title="Personal Income Tax">
              <IncomeTaxCalculator handleInputChange={handleInputChange} formData={formData} />
            </Tab>
            <Tab key="business" title="Business Tax">
              <BusinessTaxCalculator handleInputChange={handleInputChange} formData={formData} />
            </Tab>
            <Tab key="gst" title="GST Calculator">
              <GSTCalculator handleInputChange={handleInputChange} formData={formData} />
            </Tab>
          </Tabs>

          <Button 
            color="primary" 
            size="lg" 
            className="w-full mt-4"
            onClick={handleCalculate}
          >
            Calculate
          </Button>

          <TaxResultDisplay 
            result={result} 
            type={Array.from(calculatorType)[0] as 'income' | 'business' | 'gst'} 
          />
        </CardBody>
      </Card>
    </div>
  );
}
