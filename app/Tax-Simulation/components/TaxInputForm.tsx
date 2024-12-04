/* eslint-disable prettier/prettier */
"use client"
import React from 'react';

interface TaxInputFormProps {
  income: string;
  setIncome: React.Dispatch<React.SetStateAction<string>>;
  taxRegime: string;
  setTaxRegime: React.Dispatch<React.SetStateAction<string>>;
  deductions: {
    section80C: string;
    section80D: string;
    section80E: string;
    homeLoan: string;
    others: string;
  };
  setDeductions: React.Dispatch<React.SetStateAction<{
    section80C: string;
    section80D: string;
    section80E: string;
    homeLoan: string;
    others: string;
  }>>;
  onSubmit: () => void;
}

export default function TaxInputForm({
  income,
  setIncome,
  taxRegime,
  setTaxRegime,
  deductions,
  setDeductions,
  onSubmit,
}: TaxInputFormProps) {
  return (
    <div className="space-y-8">
      {/* Income Section */}
      <div>
        <label className="block text-xl font-semibold">Annual Income (₹)</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          placeholder="Enter your annual income"
          className="w-full p-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Tax Regime Selection */}
      <div>
        <label className="block text-xl font-semibold">Tax Regime</label>
        <select
          value={taxRegime}
          onChange={(e) => setTaxRegime(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg"
        >
          <option value="old">Old Regime (with deductions)</option>
          <option value="new">New Regime (without deductions)</option>
        </select>
      </div>

      {/* Section for Old Regime Deductions */}
      {taxRegime === 'old' && (
        <>
          <div>
            <label className="block text-xl font-semibold">Section 80C Deductions (₹)</label>
            <input
              type="number"
              name="section80C"
              value={deductions.section80C}
              onChange={(e) =>
                setDeductions((prev) => ({ ...prev, section80C: e.target.value }))
              }
              placeholder="Enter Section 80C deduction"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xl font-semibold">Section 80D Deductions (₹)</label>
            <input
              type="number"
              name="section80D"
              value={deductions.section80D}
              onChange={(e) =>
                setDeductions((prev) => ({ ...prev, section80D: e.target.value }))
              }
              placeholder="Enter Section 80D deduction"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xl font-semibold">Section 80E Deductions (₹)</label>
            <input
              type="number"
              name="section80E"
              value={deductions.section80E}
              onChange={(e) =>
                setDeductions((prev) => ({ ...prev, section80E: e.target.value }))
              }
              placeholder="Enter Section 80E deduction"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xl font-semibold">Home Loan Interest Deductions (₹)</label>
            <input
              type="number"
              name="homeLoan"
              value={deductions.homeLoan}
              onChange={(e) =>
                setDeductions((prev) => ({ ...prev, homeLoan: e.target.value }))
              }
              placeholder="Enter Home Loan deduction"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-xl font-semibold">Other Deductions (₹)</label>
            <input
              type="number"
              name="others"
              value={deductions.others}
              onChange={(e) =>
                setDeductions((prev) => ({ ...prev, others: e.target.value }))
              }
              placeholder="Enter other deductions"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </>
      )}

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold"
      >
        Calculate Tax
      </button>
    </div>
  );
}
