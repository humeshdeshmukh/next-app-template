/* eslint-disable prettier/prettier */
export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { income, age, investments, homeLoanInterest, insurancePremiums, medicalExpenses, capitalGains, retirementSavings, charitableDonations, otherExpenses } = req.body;
  
      let suggestions = `Based on your income of ₹${income}, here are advanced strategies to minimize your tax liability:\n`;
  
      // Tax-saving suggestions based on income slab
      if (income <= 250000) {
        suggestions += "1. Your income falls within the exempt category. No tax is payable.\n";
      } else if (income <= 500000) {
        suggestions += "1. You can avail of the rebate under Section 87A to reduce your tax liability.\n";
      } else if (income <= 1000000) {
        suggestions += `1. Consider investing in tax-saving instruments under Section 80C (₹1.5 lakh limit), such as:\n   - Public Provident Fund (PPF)\n   - Equity-Linked Savings Scheme (ELSS)\n   - National Savings Certificate (NSC)\n`;
        if (insurancePremiums) {
          suggestions += `   - Enhance your health insurance premiums to claim deductions under Section 80D (up to ₹50,000 for senior citizens).\n`;
        }
      } else {
        suggestions += `1. You are in the highest tax slab. Maximize deductions under various sections, including:\n   - Section 80C (₹1.5 lakh limit)\n   - Section 80D for health insurance premiums (₹25,000 - ₹50,000 depending on age)\n   - Section 24 for home loan interest (₹2 lakh limit)\n`;
        if (homeLoanInterest) {
          suggestions += `   - Use the home loan interest deduction (Section 24) to save on interest payments.\n`;
        }
      }
  
      // Senior Citizen Benefits
      if (age >= 60) {
        suggestions += `2. As a senior citizen, you are eligible for higher exemptions and deductions, including:\n   - Higher deduction under Section 80D for health insurance (₹50,000).\n   - Exemption from tax on interest income up to ₹50,000 under Section 80TTB.\n`;
      }
  
      // Tax Suggestions for Investments
      if (investments?.includes('real-estate')) {
        suggestions += `3. Investing in real estate provides deductions on home loan interest under Section 24. You can also explore the benefits of long-term capital gains tax exemption under Section 54.\n`;
      }
      if (investments?.includes('stocks')) {
        suggestions += `4. Consider long-term equity investments to benefit from lower capital gains tax rates (10% for holding period over 1 year). You can also invest in the National Pension Scheme (NPS) for additional tax-saving benefits.\n`;
      }
  
      // Capital Gains and Losses
      if (capitalGains) {
        suggestions += `5. If you have long-term capital gains (LTCG), make sure to optimize your tax liability by using the ₹1 lakh exemption under Section 10(38). You may also offset your capital gains by capital loss harvesting.\n`;
      }
  
      // Retirement Planning
      if (retirementSavings) {
        suggestions += `6. Consider investing in retirement savings instruments like the National Pension Scheme (NPS) to avail additional deductions under Section 80CCD. This can also help in creating a tax-free retirement corpus.\n`;
      }
  
      // Charitable Donations
      if (charitableDonations) {
        suggestions += `7. Charitable donations can be claimed under Section 80G. Consider donating to eligible organizations to get 100% or 50% deductions, depending on the donation type.\n`;
      }
  
      // Other Tax-saving Methods
      if (otherExpenses) {
        suggestions += `8. Explore other methods like tax-free bonds, education loans, and rent receipts to reduce your taxable income.\n`;
      }
  
      // Additional General Tips
      suggestions += `9. You can choose between the new tax regime (with lower rates but no deductions) or the old regime (with deductions). Choose the one that works best based on your deductions and exemptions.\n`;
      suggestions += `10. Optimize salary structuring to include benefits like meal vouchers, Leave Travel Allowance (LTA), and special allowances for tax savings.\n`;
  
      res.status(200).json({ suggestions });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  }
  