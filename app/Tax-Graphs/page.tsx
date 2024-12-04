'use client';
import { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { title } from '@/components/primitives';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function TaxGraphPage() {
  const [income, setIncome] = useState(1000000);
  const [taxData, setTaxData] = useState({
    labels: ['Old Regime', 'New Regime'],
    datasets: [
      {
        label: 'Tax Payable (₹)',
        data: [150000, 120000], // Initial dummy data
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  });

  const calculateTax = (income: number, regime: 'old' | 'new') => {
    let tax = 0;

    // Old regime slabs
    const oldSlabs = [
      { limit: 250000, rate: 0 },
      { limit: 500000, rate: 0.05 },
      { limit: 1000000, rate: 0.20 },
      { limit: Infinity, rate: 0.30 },
    ];

    // New regime slabs
    const newSlabs = [
      { limit: 250000, rate: 0 },
      { limit: 500000, rate: 0.05 },
      { limit: 750000, rate: 0.10 },
      { limit: 1000000, rate: 0.15 },
      { limit: Infinity, rate: 0.20 },
    ];

    const slabs = regime === 'old' ? oldSlabs : newSlabs;
    let prevLimit = 0;

    slabs.forEach((slab) => {
      if (income > prevLimit) {
        const taxableIncome = Math.min(income, slab.limit) - prevLimit;
        tax += taxableIncome * slab.rate;
      }
      prevLimit = slab.limit;
    });

    return tax;
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newIncome = parseFloat(e.target.value);
    setIncome(newIncome);

    const oldTax = calculateTax(newIncome, 'old');
    const newTax = calculateTax(newIncome, 'new');

    setTaxData((prev) => ({
      ...prev,
      datasets: [
        {
          ...prev.datasets[0],
          data: [oldTax, newTax],
        },
      ],
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className={title()}>Tax Simulation Graphs</h1>

      <div className="mt-6">
        <label htmlFor="income" className="block text-xl font-semibold">
          Enter Your Annual Income (₹)
        </label>
        <input
          id="income"
          type="number"
          value={income}
          onChange={handleIncomeChange}
          placeholder="Enter income"
          className="mt-2 p-2 border border-gray-300 rounded-lg w-full"
        />
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold">Tax Comparison (Old vs. New Regime)</h2>
        <Bar
          data={taxData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Tax Payable Comparison',
              },
            },
          }}
        />
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-semibold">Income vs. Tax Over Time (Old Regime)</h2>
        <Line
          data={{
            labels: ['₹250K', '₹500K', '₹750K', '₹1M', '₹1.5M'],
            datasets: [
              {
                label: 'Old Regime Tax (₹)',
                data: [0, calculateTax(500000, 'old'), calculateTax(750000, 'old'), calculateTax(1000000, 'old'), calculateTax(1500000, 'old')],
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Income vs. Tax Over Time',
              },
            },
          }}
        />
      </div>
    </div>
  );
}
