/* eslint-disable prettier/prettier */
'use client';

import { useState } from 'react';

export default function AISuggestionsPage() {
  const [formData, setFormData] = useState({
    income: '',
    age: '',
    investments: [] as string[],
    homeLoanInterest: '',
    insurancePremiums: '',
    medicalExpenses: '',
    capitalGains: '',
    retirementSavings: '',
    charitableDonations: '',
    otherExpenses: '',
  });
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update form values dynamically
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === 'number' && value.length > 0 ? Math.min(Number(value), Number.MAX_SAFE_INTEGER).toString() : value,
    }));
  };

  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      investments: checked ? [...prev.investments, value] : prev.investments.filter((item) => item !== value),
    }));
  };

  const fetchAISuggestions = async () => {
    setLoading(true);
    setError(null);
    setSuggestions(null);
    try {
      const response = await fetch('/api/ai-tax-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      response.ok ? setSuggestions(data.suggestions || 'No suggestions available.') : setError(data.error || 'Failed to fetch suggestions.');
    } catch {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">AI-Powered Tax Suggestions</h1>

      {[
        { id: 'income', label: 'Enter Your Annual Income (₹)', placeholder: 'Enter your income' },
        { id: 'age', label: 'Enter Your Age', placeholder: 'Enter your age' },
        { id: 'homeLoanInterest', label: 'Home Loan Interest Paid (₹)', placeholder: 'Enter your home loan interest' },
        { id: 'insurancePremiums', label: 'Health Insurance Premiums (₹)', placeholder: 'Enter your insurance premiums' },
        { id: 'medicalExpenses', label: 'Medical Expenses (₹)', placeholder: 'Enter your medical expenses' },
        { id: 'capitalGains', label: 'Capital Gains (₹)', placeholder: 'Enter your capital gains' },
        { id: 'retirementSavings', label: 'Retirement Savings (₹)', placeholder: 'Enter your retirement savings' },
        { id: 'charitableDonations', label: 'Charitable Donations (₹)', placeholder: 'Enter your charitable donations' },
        { id: 'otherExpenses', label: 'Other Expenses (₹)', placeholder: 'Enter other tax-saving expenses' },
      ].map(({ id, label, placeholder }) => (
        <div className="mb-4" key={id}>
          <label htmlFor={id} className="block text-lg font-medium">{label}</label>
          <input
            id={id}
            type="number"
            value={formData[id as keyof typeof formData] as string}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
          />
        </div>
      ))}

      <div className="mb-4">
        <fieldset>
          <legend className="block text-lg font-medium">Select Your Investments:</legend>
          {['real-estate', 'stocks', 'mutual-funds'].map((investment) => (
            <div key={investment} className="flex items-center mt-2">
              <input
                type="checkbox"
                id={`investment-${investment}`}
                value={investment}
                onChange={handleInvestmentChange}
                checked={formData.investments.includes(investment)}
                className="mr-2"
              />
              <label htmlFor={`investment-${investment}`}>
                {investment.replace('-', ' ')}
              </label>
            </div>
          ))}
        </fieldset>
      </div>


      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        onClick={fetchAISuggestions}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Fetching Suggestions...' : 'Get AI Suggestions'}
      </button>

      {suggestions && (
        <div className="mt-6 p-4 border border-gray-300 rounded-lg bg-gray">
          <h2 className="text-2xl font-semibold">Tax Suggestions:</h2>
          <ul className="mt-2 list-disc pl-6">
            {suggestions.split('\n').map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
