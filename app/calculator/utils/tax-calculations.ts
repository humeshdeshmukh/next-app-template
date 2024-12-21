import { IncomeTaxFormData, BusinessTaxFormData, GSTFormData, TaxResult } from '../types/tax-types';
import { industryTaxRates, compositionSchemeRates } from '../constants/tax-constants';

export function calculateIncomeTax(formData: IncomeTaxFormData): TaxResult {
  // Calculate total income
  const salary = parseFloat(formData.salary) || 0;
  const professionalIncome = parseFloat(formData.professionalIncome) || 0;
  const rentalIncome = parseFloat(formData.rentalIncome) || 0;
  const otherIncome = parseFloat(formData.otherIncome) || 0;
  
  const totalIncome = salary + professionalIncome + rentalIncome + otherIncome;
  
  // Calculate deductions
  const section80C = Math.min(parseFloat(formData.section80C) || 0, 150000);
  const section80D = Math.min(parseFloat(formData.section80D) || 0, 25000);
  const section80G = parseFloat(formData.section80G) || 0;
  const section80TTA = Math.min(parseFloat(formData.section80TTA) || 0, 10000);
  const section80E = parseFloat(formData.section80E) || 0;
  
  // Calculate allowances
  const hra = parseFloat(formData.hra) || 0;
  const lta = Math.min(parseFloat(formData.lta) || 0, 50000);
  const foodAllowance = Math.min(parseFloat(formData.foodAllowance) || 0, 26400);
  const transportAllowance = Math.min(parseFloat(formData.transportAllowance) || 0, 19200);
  
  const totalDeductions = section80C + section80D + section80G + section80TTA + section80E;
  const totalAllowances = hra + lta + foodAllowance + transportAllowance;
  
  const taxableIncome = Math.max(0, totalIncome - totalDeductions - totalAllowances);
  
  let baseTax = 0;
  // New Tax Regime (2024-25)
  if (taxableIncome <= 300000) {
    baseTax = 0;
  } else if (taxableIncome <= 600000) {
    baseTax = (taxableIncome - 300000) * 0.05;
  } else if (taxableIncome <= 900000) {
    baseTax = 15000 + (taxableIncome - 600000) * 0.10;
  } else if (taxableIncome <= 1200000) {
    baseTax = 45000 + (taxableIncome - 900000) * 0.15;
  } else if (taxableIncome <= 1500000) {
    baseTax = 90000 + (taxableIncome - 1200000) * 0.20;
  } else {
    baseTax = 150000 + (taxableIncome - 1500000) * 0.30;
  }
  
  let surcharge = 0;
  // Calculate surcharge
  if (taxableIncome > 5000000 && taxableIncome <= 10000000) {
    surcharge = baseTax * 0.10;
  } else if (taxableIncome > 10000000 && taxableIncome <= 20000000) {
    surcharge = baseTax * 0.15;
  } else if (taxableIncome > 20000000 && taxableIncome <= 50000000) {
    surcharge = baseTax * 0.25;
  } else if (taxableIncome > 50000000) {
    surcharge = baseTax * 0.37;
  }
  
  const taxBeforeCess = baseTax + surcharge;
  const cess = taxBeforeCess * 0.04;
  const totalTax = taxBeforeCess + cess;
  
  return {
    totalTax,
    baseTax,
    surcharge,
    cess
  };
}

export function calculateBusinessTax(formData: BusinessTaxFormData): TaxResult {
  const revenue = parseFloat(formData.revenue) || 0;
  const expenses = parseFloat(formData.businessExpenses) || 0;
  const employeeCount = parseInt(formData.employeeCount) || 0;
  const turnover = parseFloat(formData.turnover) || 0;
  const industry = formData.industry as keyof typeof industryTaxRates;
  
  const profit = revenue - expenses;
  const industryRates = industryTaxRates[industry];
  
  // Calculate base tax rate based on turnover limit if applicable
  let baseRate = industryRates.baseRate;
  if (industryRates.turnoverLimit && turnover > industryRates.turnoverLimit) {
    baseRate = 0.30;
  }
  
  let baseTax = profit * baseRate;
  
  // Apply industry-specific benefits
  if (industry === 'msme' && turnover <= industryRates.turnoverLimit) {
    baseTax -= profit * industryRates.benefit;
  }
  
  if (industry === 'technology' && turnover <= 100000000) {
    baseTax -= profit * industryRates.startupBenefit;
  }
  
  // Employee benefits
  const employeeBenefit = employeeCount * 2000;
  baseTax -= employeeBenefit;
  
  // R&D benefits for eligible industries
  if (industryRates.rdBenefit) {
    baseTax -= expenses * industryRates.rdBenefit;
  }
  
  baseTax = Math.max(0, baseTax);
  
  // Calculate surcharge for high profit
  let surcharge = 0;
  if (profit > 10000000) {
    surcharge = baseTax * 0.12;
  }
  
  const taxBeforeCess = baseTax + surcharge;
  const cess = taxBeforeCess * 0.04;
  const totalTax = taxBeforeCess + cess;
  
  return {
    totalTax,
    baseTax,
    surcharge,
    cess
  };
}

export function calculateGST(formData: GSTFormData): TaxResult {
  const amount = parseFloat(formData.gstAmount) || 0;
  const rate = parseFloat(formData.gstRate) || 0;
  const invoiceAmount = parseFloat(formData.invoiceAmount) || 0;
  
  let gstAmount = 0;
  
  if (formData.gstType === 'composition') {
    const industry = formData.industry as keyof typeof compositionSchemeRates;
    const compositionRate = compositionSchemeRates[industry] || 0.01;
    gstAmount = invoiceAmount * compositionRate;
  } else {
    gstAmount = (amount * rate) / 100;
  }
  
  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;
  const totalAmount = amount + gstAmount;
  
  return {
    totalTax: gstAmount,
    cgst,
    sgst,
    totalAmount
  };
}
