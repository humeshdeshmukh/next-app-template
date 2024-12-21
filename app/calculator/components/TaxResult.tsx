'use client';

import { TaxResult } from '../types/tax-types';

interface TaxResultProps {
  result: TaxResult | null;
  type: 'income' | 'business' | 'gst';
}

export default function TaxResultDisplay({ result, type }: TaxResultProps) {
  if (!result) return null;

  return (
    <div className="mt-6 p-4 bg-primary-50 rounded-lg">
      <h3 className="text-xl font-semibold text-center">
        {type === 'gst' ? 'GST Calculation' : 'Tax Calculation'}
      </h3>
      <p className="text-2xl text-primary text-center mt-2">
        Total Tax: ₹{result.totalTax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </p>
      
      {type === 'gst' && result.cgst !== undefined && result.sgst !== undefined && (
        <div className="mt-2 text-center text-sm">
          <p>CGST (50%): ₹{result.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          <p>SGST (50%): ₹{result.sgst.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          {result.totalAmount && (
            <p className="mt-2 font-semibold">
              Total Amount (Inc. GST): ₹{result.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          )}
        </div>
      )}
      
      {(type === 'income' || type === 'business') && result.baseTax !== undefined && result.cess !== undefined && (
        <div className="mt-2 text-center text-sm">
          <p>Base Tax: ₹{result.baseTax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          {result.surcharge && result.surcharge > 0 && (
            <p>Surcharge: ₹{result.surcharge.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          )}
          <p>Health & Education Cess (4%): ₹{result.cess.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
      )}
    </div>
  );
}
