/* eslint-disable prettier/prettier */
"use client";
import { title, subtitle } from "@/components/primitives";
import { useState } from "react";

export default function TaxRulesPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate fetching dynamic tax data
  const fetchTaxData = async () => {
    setLoading(true);
    try {
      // Fetch data here (mocked for now)
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
    } catch (err) {
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 py-8 md:py-12 bg-black text-white">
      {/* Title Section */}
      <div className="max-w-4xl text-center">
        <h1 className={`${title()} text-4xl font-extrabold`}>
          Tax Rules of India
        </h1>
        <p className={`${subtitle({ class: "mt-4" })} text-lg text-gray-300`}>
          A comprehensive guide to understanding the tax rules in India.
        </p>
      </div>

      {/* Loading and Error Handling */}
      {loading && (
        <div className="text-center mt-4 text-xl text-gray-100">Loading...</div>
      )}
      {error && (
        <div className="text-center mt-4 text-xl text-red-500">{error}</div>
      )}

      {/* Income Tax Slabs Section */}
      <div className="max-w-5xl w-full px-6 py-6 mt-8 bg-transparent">
        <h2 className="text-2xl font-semibold text-white">Income Tax Slabs (FY 2024-25)</h2>
        <p className="mt-4 text-lg text-gray-300">
          Individuals are taxed based on income slabs. Below are the income tax slabs:
        </p>
        <table className="mt-4 w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-white">Income Range</th>
              <th className="border px-4 py-2 text-white">Tax Rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2 text-gray-200">Up to ₹2.5 Lakhs</td>
              <td className="border px-4 py-2 text-gray-200">No Tax</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 text-gray-200">₹2.5 Lakhs to ₹5 Lakhs</td>
              <td className="border px-4 py-2 text-gray-200">5%</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 text-gray-200">₹5 Lakhs to ₹10 Lakhs</td>
              <td className="border px-4 py-2 text-gray-200">20%</td>
            </tr>
            <tr>
              <td className="border px-4 py-2 text-gray-200">Above ₹10 Lakhs</td>
              <td className="border px-4 py-2 text-gray-200">30%</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-4 text-lg text-gray-300">
          A 4% cess on tax is applied for health and education. Additional surcharges may apply based on income.
        </p>
      </div>

      {/* GST Section */}
      <div className="max-w-5xl w-full px-6 py-6 mt-8 bg-transparent">
        <h2 className="text-2xl font-semibold text-white">Goods and Services Tax (GST)</h2>
        <p className="mt-4 text-lg text-gray-300">
          GST is applied at each stage of the production process for goods and services in India. Here are the GST slabs:
        </p>
        <ul className="mt-4 text-lg text-gray-300 list-disc pl-6">
          <li>5% GST: For essential goods and services like food, healthcare, etc.</li>
          <li>12% GST: For moderately taxed goods and services like processed food, business services, etc.</li>
          <li>18% GST: For standard rate goods and services like electronics, clothing, etc.</li>
          <li>28% GST: For luxury and non-essential goods like luxury cars, high-end goods, etc.</li>
        </ul>
        <p className="mt-4 text-lg text-gray-300">
          GST also includes provisions for input tax credits, which businesses can use to offset taxes paid on inputs.
        </p>
      </div>

      {/* Tax Deductions and Exemptions Section */}
      <div className="max-w-5xl w-full px-6 py-6 mt-8 bg-transparent">
        <h2 className="text-2xl font-semibold text-white">Tax Deductions and Exemptions</h2>
        <p className="mt-4 text-lg text-gray-300">
          Several deductions are available under the Income Tax Act, helping individuals reduce taxable income:
        </p>
        <ul className="mt-4 text-lg text-gray-300 list-disc pl-6">
          <li><strong>Section 80C:</strong> Deduction up to ₹1.5 Lakhs for investments in PPF, EPF, life insurance premiums, and more.</li>
          <li><strong>Section 80D:</strong> Deduction for health insurance premiums up to ₹25,000 (₹50,000 for senior citizens).</li>
          <li><strong>Section 24(b):</strong> Deduction on home loan interest payments up to ₹2 Lakhs.</li>
          <li><strong>Section 10(14):</strong> Exemption on house rent allowance (HRA) for eligible taxpayers.</li>
          <li><strong>Section 10(13A):</strong> Exemption on salary for rent paid by employees.</li>
          <li><strong>Section 80E:</strong> Deduction on interest paid on education loans.</li>
        </ul>
      </div>

      {/* Other Key Tax Rules Section */}
      <div className="max-w-5xl w-full px-6 py-6 mt-8 bg-transparent">
        <h2 className="text-2xl font-semibold text-white">Other Key Tax Rules</h2>
        <ul className="mt-4 text-lg text-gray-300 list-disc pl-6">
          <li><strong>Advance Tax:</strong> Pay advance tax in installments if liability exceeds ₹10,000.</li>
          <li><strong>Tax on Dividends:</strong> Dividends are taxable in the hands of individual shareholders, subject to a tax rate of 10% for dividends exceeding ₹5,000 in a year.</li>
          <li><strong>Tax Filing Deadline:</strong> Usually July 31st of the assessment year (unless extended by the government).</li>
          <li><strong>Tax on Capital Gains:</strong> Capital gains from the sale of assets like property or shares are taxed based on the holding period and asset type.</li>
        </ul>
      </div>

      {/* Call to Action */}
      <div className="mt-8">
        <button
          onClick={fetchTaxData}
          className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Fetch Latest Tax Data
        </button>
      </div>
    </div>
  );
}
