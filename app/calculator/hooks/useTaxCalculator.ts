import { useState } from 'react';
import { Selection } from "@nextui-org/react";
import { TaxResult } from '../types/tax-types';
import { TaxAdvice } from '../services/ai-service';
import { calculateIncomeTax, calculateBusinessTax, calculateGST } from '../utils/tax-calculations';
import { AITaxService } from '../services/ai-service';

export function useTaxCalculator() {
  const [calculatorType, setCalculatorType] = useState<Selection>(new Set(['income']));
  const [result, setResult] = useState<TaxResult | null>(null);
  const [advice, setAdvice] = useState<TaxAdvice | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculate = async (formData: any) => {
    setIsCalculating(true);
    setError(null);
    
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
        default:
          throw new Error('Invalid calculator type');
      }

      setResult(calculationResult);
      setAdvice(aiAdvice);
    } catch (error) {
      console.error('Error calculating tax:', error);
      setError('An error occurred while calculating tax. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const resetCalculator = () => {
    setResult(null);
    setAdvice(null);
    setError(null);
  };

  const changeCalculatorType = (type: Selection) => {
    setCalculatorType(type);
    resetCalculator();
  };

  return {
    calculatorType,
    result,
    advice,
    isCalculating,
    error,
    calculate,
    resetCalculator,
    changeCalculatorType
  };
}
