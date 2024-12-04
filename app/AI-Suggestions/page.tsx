'use client';

import { useState } from 'react';

export default function AISuggestionsPage() {
  const [income, setIncome] = useState('');
  const [age, setAge] = useState('');
  const [investments, setInvestments] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input change for income and age
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'income') setIncome(value);
    if (id === 'age') setAge(value);
  };

  // Handle investment selection
  const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setInvestments((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  // Fetch AI tax suggestions from the API
  const fetchAISuggestions = async () => {
    setLoading(true);
    setError(null);
    setSuggestions(null);
    try {
      const response = await fetch('/api/ai-tax-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ income, age, investments }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuggestions(data.suggestions || 'No suggestions available.');
      } else {
        setError(data.error || 'Failed to fetch suggestions. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">AI-Powered Tax Suggestions</h1>

      {/* Income Input */}
      <div className="mb-4">
        <label htmlFor="income" className="block text-lg font-medium">
          Enter Your Annual Income (₹):
        </label>
        <input
          id="income"
          type="number"
          value={income}
          onChange={handleInputChange}
          placeholder="Enter your income"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
        />
      </div>

      {/* Age Input */}
      <div className="mb-4">
        <label htmlFor="age" className="block text-lg font-medium">
          Enter Your Age:
        </label>
        <input
          id="age"
          type="number"
          value={age}
          onChange={handleInputChange}
          placeholder="Enter your age"
          className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
        />
      </div>

      {/* Investment Preferences */}
      <div className="mb-4">
        <label className="block text-lg font-medium">
          Select Your Investments:
        </label>
        <div className="mt-2 space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              value="real-estate"
              onChange={handleInvestmentChange}
              className="mr-2"
            />
            Real Estate
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="stocks"
              onChange={handleInvestmentChange}
              className="mr-2"
            />
            Stocks
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              value="mutual-funds"
              onChange={handleInvestmentChange}
              className="mr-2"
            />
            Mutual Funds
          </label>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Fetch Suggestions Button */}
      <div className="mt-4">
        <button
          onClick={fetchAISuggestions}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? 'Fetching Suggestions...' : 'Get AI Suggestions'}
        </button>
      </div>

      {/* Suggestions Display */}
      {suggestions && (
        <div className="mt-8 p-6 bg-black text-white rounded-lg">
          <h2 className="text-xl font-semibold mb-4">AI Suggestions</h2>
          <p className="whitespace-pre-wrap">{suggestions}</p>
        </div>
      )}
    </div>
  );
}
