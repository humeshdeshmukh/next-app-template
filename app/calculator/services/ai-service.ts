import { TaxResult, IncomeTaxFormData, BusinessTaxFormData, GSTFormData } from '../types/tax-types';

export interface TaxAdvice {
  suggestions: string[];
  potentialSavings: number;
  riskFactors: string[];
  complianceNotes: string[];
}

export class AITaxService {
  static async getIncomeTaxAdvice(formData: IncomeTaxFormData): Promise<TaxAdvice> {
    // This would connect to an AI service in production
    const totalIncome = parseFloat(formData.salary) + 
                       parseFloat(formData.professionalIncome) + 
                       parseFloat(formData.rentalIncome) + 
                       parseFloat(formData.otherIncome);

    const suggestions = [];
    const riskFactors = [];
    let potentialSavings = 0;

    // Section 80C Analysis
    const section80C = parseFloat(formData.section80C) || 0;
    if (section80C < 150000) {
      const remainingLimit = 150000 - section80C;
      suggestions.push(`You can still invest ₹${remainingLimit.toLocaleString('en-IN')} in Section 80C instruments`);
      potentialSavings += remainingLimit * 0.3;
    }

    // HRA Analysis
    if (parseFloat(formData.hra) > totalIncome * 0.5) {
      riskFactors.push('High HRA claim relative to income might need documentation');
    }

    // Section 80D Analysis
    const section80D = parseFloat(formData.section80D) || 0;
    if (section80D < 25000) {
      suggestions.push('Consider getting a health insurance policy for tax benefits under Section 80D');
    }

    // Income Source Diversification
    if (formData.rentalIncome === '0' && totalIncome > 1000000) {
      suggestions.push('Consider real estate investment for rental income and tax benefits');
    }

    return {
      suggestions,
      potentialSavings,
      riskFactors,
      complianceNotes: [
        'Ensure you have all supporting documents for claimed deductions',
        'File your returns before the due date to avoid penalties',
        'Keep records of all tax-saving investments'
      ]
    };
  }

  static async getBusinessTaxAdvice(formData: BusinessTaxFormData): Promise<TaxAdvice> {
    const revenue = parseFloat(formData.revenue) || 0;
    const expenses = parseFloat(formData.businessExpenses) || 0;
    const profit = revenue - expenses;
    const turnover = parseFloat(formData.turnover) || 0;

    const suggestions = [];
    const riskFactors = [];
    let potentialSavings = 0;

    // Profit Margin Analysis
    const profitMargin = (profit / revenue) * 100;
    if (profitMargin > 70) {
      riskFactors.push('Unusually high profit margin might attract scrutiny');
    }

    // Employee Benefits
    const employeeCount = parseInt(formData.employeeCount) || 0;
    if (employeeCount > 0 && turnover > 10000000) {
      suggestions.push('Consider implementing employee stock options for tax benefits');
      potentialSavings += employeeCount * 5000;
    }

    // Industry-specific Advice
    switch (formData.industry) {
      case 'technology':
        suggestions.push('Register for Startup India benefits if eligible');
        if (turnover <= 100000000) {
          suggestions.push('Apply for tax holiday under Section 80-IAC');
        }
        break;
      case 'manufacturing':
        suggestions.push('Check eligibility for Production Linked Incentive (PLI) scheme');
        break;
      case 'msme':
        if (turnover <= 50000000) {
          suggestions.push('Opt for presumptive taxation under Section 44AD');
        }
        break;
    }

    return {
      suggestions,
      potentialSavings,
      riskFactors,
      complianceNotes: [
        'Maintain proper books of accounts',
        'Regular GST filing is mandatory',
        'Keep audit trail of all major transactions'
      ]
    };
  }

  static async getGSTAdvice(formData: GSTFormData): Promise<TaxAdvice> {
    const amount = parseFloat(formData.gstAmount) || 0;
    const rate = parseFloat(formData.gstRate) || 0;

    const suggestions = [];
    const riskFactors = [];
    let potentialSavings = 0;

    // Registration Type Analysis
    if (formData.gstType === 'regular' && amount < 4000000) {
      suggestions.push('Consider opting for composition scheme for simplified taxation');
      potentialSavings += amount * 0.02;
    }

    // HSN Code Verification
    if (!formData.hsn) {
      riskFactors.push('Missing HSN code may lead to compliance issues');
    }

    // Input Tax Credit Optimization
    if (formData.gstType === 'regular') {
      suggestions.push('Ensure all eligible input tax credits are claimed');
      suggestions.push('Maintain proper documentation for reverse charge mechanism');
    }

    return {
      suggestions,
      potentialSavings,
      riskFactors,
      complianceNotes: [
        'File GST returns within due dates',
        'Maintain tax invoices for all transactions',
        'Reconcile input tax credit with vendor invoices'
      ]
    };
  }
}
