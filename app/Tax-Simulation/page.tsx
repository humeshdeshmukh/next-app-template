/* eslint-disable prettier/prettier */
"use client";
import { useState } from "react";
import { title } from "@/components/primitives";
import dynamic from "next/dynamic";

// Lazy load chart component
const TaxChart = dynamic(() => import("./TaxChart"), { ssr: false });

export default function TaxSimulationPage() {
  const [income, setIncome] = useState<number | string>("");
  const [taxRegime, setTaxRegime] = useState("old");
  const [deductions, setDeductions] = useState({
    section80C: "",
    section80D: "",
    section80E: "",
    homeLoan: "",
    others: "",
  });
  const [tax, setTax] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [breakdown, setBreakdown] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) || value === "") {
      setIncome(value);
    }
  };

  const handleDeductionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!isNaN(Number(value)) || value === "") {
      setDeductions((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const calculateTax = () => {
    setError("");
    setBreakdown([]);
    setSuggestions([]);
    const annualIncome = parseFloat(income as string);

    const parsedDeductions = {
      section80C: parseFloat(deductions.section80C) || 0,
      section80D: parseFloat(deductions.section80D) || 0,
      section80E: parseFloat(deductions.section80E) || 0,
      homeLoan: parseFloat(deductions.homeLoan) || 0,
      others: parseFloat(deductions.others) || 0,
    };

    if (isNaN(annualIncome) || annualIncome <= 0) {
      setError("Please enter a valid income.");
      setTax(null);
      return;
    }

    let taxableIncome = annualIncome;
    let totalDeductions = 0;

    // Apply deductions in old regime
    if (taxRegime === "old") {
      totalDeductions =
        Math.min(parsedDeductions.section80C, 150000) +
        Math.min(parsedDeductions.section80D, 25000) +
        Math.min(parsedDeductions.section80E, 50000) +
        parsedDeductions.homeLoan +
        parsedDeductions.others;

      taxableIncome -= totalDeductions;
    }

    // Define tax slabs
    const slabs =
      taxRegime === "old"
        ? [
            { limit: 250000, rate: 0 },
            { limit: 500000, rate: 0.05 },
            { limit: 1000000, rate: 0.20 },
            { limit: Infinity, rate: 0.30 },
          ]
        : [
            { limit: 250000, rate: 0 },
            { limit: 500000, rate: 0.05 },
            { limit: 1000000, rate: 0.10 },
            { limit: Infinity, rate: 0.20 },
          ];

    let prevLimit = 0;
    let totalTax = 0;
    const taxDetails: string[] = [];

    slabs.forEach((slab) => {
      if (taxableIncome > prevLimit) {
        const taxableForSlab = Math.min(taxableIncome, slab.limit) - prevLimit;
        const slabTax = taxableForSlab * slab.rate;
        totalTax += slabTax;

        if (slab.rate > 0) {
          taxDetails.push(
            `₹${taxableForSlab.toFixed(2)} taxed at ${slab.rate * 100}% = ₹${slabTax.toFixed(2)}`
          );
        }

        prevLimit = slab.limit;
      }
    });

    setTax(totalTax);
    setBreakdown(taxDetails);

    // Tax-saving suggestions
    const potentialSavings: string[] = [];
    if (parsedDeductions.section80C < 150000) {
      potentialSavings.push(
        "Consider investing more under Section 80C to maximize tax savings."
      );
    }
    if (parsedDeductions.section80D < 25000) {
      potentialSavings.push(
        "Increase health insurance premium to claim full deduction under Section 80D."
      );
    }

    setSuggestions(potentialSavings);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className={title()}>Advanced Tax Simulation</h1>
      <div className="grid gap-6 mt-8 md:grid-cols-2">
        <div>
          <label className="block text-xl font-semibold">Annual Income (₹)</label>
          <input
            type="text"
            value={income}
            onChange={handleIncomeChange}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            placeholder="Enter your income"
          />

          <label className="block text-xl font-semibold mt-4">Tax Regime</label>
          <select
            value={taxRegime}
            onChange={(e) => setTaxRegime(e.target.value)}
            className="mt-2 p-2 border border-gray-300 rounded w-full"
          >
            <option value="old">Old Regime</option>
            <option value="new">New Regime</option>
          </select>

          {taxRegime === "old" && (
            <>
              <label className="block text-xl font-semibold mt-4">Section 80C (₹)</label>
              <input
                type="text"
                name="section80C"
                value={deductions.section80C}
                onChange={handleDeductionsChange}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter 80C Deduction"
              />

              <label className="block text-xl font-semibold mt-4">Section 80D (₹)</label>
              <input
                type="text"
                name="section80D"
                value={deductions.section80D}
                onChange={handleDeductionsChange}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter 80D Deduction"
              />

              <label className="block text-xl font-semibold mt-4">Section 80E (₹)</label>
              <input
                type="text"
                name="section80E"
                value={deductions.section80E}
                onChange={handleDeductionsChange}
                className="mt-2 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter 80E Deduction"
              />
            </>
          )}

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            onClick={calculateTax}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Calculate Tax
          </button>
        </div>

        {tax !== null && (
          <div>
            <h2 className="text-xl font-semibold">Tax Calculation Breakdown</h2>
            <ul className="mt-4 space-y-2">
              {breakdown.map((item, index) => (
                <li key={index} className="text-lg">{item}</li>
              ))}
            </ul>

            <p className="text-2xl font-bold mt-6">Total Tax Payable: ₹{tax.toFixed(2)}</p>

            <h3 className="mt-8 text-xl font-semibold">Suggestions to Save Tax</h3>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              {suggestions.map((tip, index) => (
                <li key={index} className="text-lg">{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {tax !== null && <TaxChart tax={tax} breakdown={breakdown} />}
    </div>
  );
}
