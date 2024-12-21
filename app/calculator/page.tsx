'use client';

import { useState } from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";
import { Tabs, Tab } from "@nextui-org/tabs";
import { Selection } from "@nextui-org/react";

interface FormData {
  income: string;
  deductions: string;
  businessExpenses: string;
  revenue: string;
  employeeCount: string;
  industry: string;
}

interface Industry {
  label: string;
  value: string;
}

export default function Calculator() {
  const [calculatorType, setCalculatorType] = useState<Selection>(new Set(['income']));
  const [result, setResult] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    income: '',
    deductions: '',
    businessExpenses: '',
    revenue: '',
    employeeCount: '',
    industry: 'manufacturing'
  });

  const industries: Industry[] = [
    { label: "Manufacturing", value: "manufacturing" },
    { label: "Technology", value: "technology" },
    { label: "Healthcare", value: "healthcare" },
    { label: "Retail", value: "retail" },
    { label: "Construction", value: "construction" }
  ];

  const calculateTax = () => {
    let taxAmount = 0;
    
    if (Array.from(calculatorType)[0] === 'income') {
      const income = parseFloat(formData.income) || 0;
      const deductions = parseFloat(formData.deductions) || 0;
      const taxableIncome = income - deductions;
      
      // Progressive tax calculation
      if (taxableIncome <= 50000) {
        taxAmount = taxableIncome * 0.10;
      } else if (taxableIncome <= 100000) {
        taxAmount = 5000 + (taxableIncome - 50000) * 0.20;
      } else {
        taxAmount = 15000 + (taxableIncome - 100000) * 0.30;
      }
    } else {
      const revenue = parseFloat(formData.revenue) || 0;
      const expenses = parseFloat(formData.businessExpenses) || 0;
      const employeeCount = parseInt(formData.employeeCount) || 0;
      
      // Industry-specific tax rates
      const industryRates = {
        manufacturing: 0.15,
        technology: 0.18,
        healthcare: 0.12,
        retail: 0.14,
        construction: 0.16
      };
      
      const profit = revenue - expenses;
      const baseRate = industryRates[formData.industry as keyof typeof industryRates];
      
      // Tax incentives for employment
      const employeeDeduction = employeeCount * 1000;
      
      taxAmount = (profit * baseRate) - employeeDeduction;
    }
    
    setResult(Math.max(0, taxAmount));
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
          <h1 className="text-2xl font-bold text-center">Advanced Tax Calculator</h1>
          <p className="text-default-500 text-center">Calculate personal or business taxes with industry-specific rates</p>
        </CardHeader>
        <CardBody>
          <Tabs 
            aria-label="Calculator Options" 
            selectedKey={Array.from(calculatorType)[0]}
            onSelectionChange={(key: Selection) => setCalculatorType(key)}
            className="mb-6"
          >
            <Tab key="income" title="Personal Income Tax">
              <div className="flex flex-col gap-4 mt-4">
                <Input
                  type="number"
                  label="Annual Income"
                  placeholder="Enter your annual income"
                  value={formData.income}
                  onChange={(e) => handleInputChange('income', e.target.value)}
                />
                <Input
                  type="number"
                  label="Deductions"
                  placeholder="Enter total deductions"
                  value={formData.deductions}
                  onChange={(e) => handleInputChange('deductions', e.target.value)}
                />
              </div>
            </Tab>
            <Tab key="business" title="Business Tax">
              <div className="flex flex-col gap-4 mt-4">
                <Input
                  type="number"
                  label="Annual Revenue"
                  placeholder="Enter annual revenue"
                  value={formData.revenue}
                  onChange={(e) => handleInputChange('revenue', e.target.value)}
                />
                <Input
                  type="number"
                  label="Business Expenses"
                  placeholder="Enter business expenses"
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
                  label="Industry"
                  placeholder="Select your industry"
                  selectedKeys={[formData.industry]}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleInputChange('industry', e.target.value)}
                >
                  {industries.map((industry) => (
                    <SelectItem key={industry.value} value={industry.value}>
                      {industry.label}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </Tab>
          </Tabs>

          <Button 
            color="primary" 
            size="lg" 
            className="w-full mt-4"
            onClick={calculateTax}
          >
            Calculate Tax
          </Button>

          {result !== null && (
            <div className="mt-6 p-4 bg-primary-50 rounded-lg">
              <h3 className="text-xl font-semibold text-center">Estimated Tax Amount</h3>
              <p className="text-2xl text-primary text-center mt-2">
                ${result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
