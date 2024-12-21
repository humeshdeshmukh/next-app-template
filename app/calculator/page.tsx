'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Selection } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";
import IncomeTaxCalculator from './components/income-tax/IncomeTaxCalculator';
import BusinessTaxCalculator from './components/business-tax/BusinessTaxCalculator';
import GSTCalculator from './components/gst/GSTCalculator';
import TaxResultDisplay from './components/TaxResult';
import TaxInsights from './components/ai-insights/TaxInsights';
import { calculateIncomeTax, calculateBusinessTax, calculateGST } from './utils/tax-calculations';
import { AITaxService, TaxAdvice } from './services/ai-service';
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
  const [advice, setAdvice] = useState<TaxAdvice | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
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

  const handleCalculate = async () => {
    setIsCalculating(true);
    const type = Array.from(calculatorType)[0] as string;
    let calculationResult: TaxResult | null = null;
    let aiAdvice: TaxAdvice | null = null;

    try {
      switch (type) {
        case 'income':
          calculationResult = calculateIncomeTax(formData);
          aiAdvice = await AITaxService.getIncomeTaxAdvice(formData);
          break;
        case 'business':
          calculationResult = calculateBusinessTax(formData);
          aiAdvice = await AITaxService.getBusinessTaxAdvice(formData);
          break;
        case 'gst':
          calculationResult = calculateGST(formData);
          aiAdvice = await AITaxService.getGSTAdvice(formData);
          break;
      }

      setResult(calculationResult);
      setAdvice(aiAdvice);
    } catch (error) {
      console.error('Error calculating tax:', error);
      // You could add error handling UI here
    } finally {
      setIsCalculating(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Reset results when input changes
    setResult(null);
    setAdvice(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-center">Advanced Indian Tax Calculator</h1>
          <p className="text-default-500 text-center">Calculate Income Tax, Business Tax, and GST with AI-powered insights</p>
        </CardHeader>
        <CardBody>
          <Tabs 
            aria-label="Calculator Options" 
            selectedKey={Array.from(calculatorType)[0]}
            onSelectionChange={(key: Selection) => {
              setCalculatorType(key);
              setResult(null);
              setAdvice(null);
            }}
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
            isLoading={isCalculating}
          >
            {isCalculating ? 'Calculating...' : 'Calculate'}
          </Button>

          {isCalculating && (
            <div className="flex justify-center items-center mt-4">
              <Spinner label="Analyzing tax data..." color="primary" />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TaxResultDisplay 
              result={result} 
              type={Array.from(calculatorType)[0] as 'income' | 'business' | 'gst'} 
            />
            <TaxInsights 
              advice={advice}
              type={Array.from(calculatorType)[0] as 'income' | 'business' | 'gst'}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
