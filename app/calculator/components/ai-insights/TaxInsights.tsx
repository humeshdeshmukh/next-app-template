'use client';

import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { TaxAdvice } from "../../services/ai-service";

interface TaxInsightsProps {
  advice: TaxAdvice | null;
  type: 'income' | 'business' | 'gst';
}

export default function TaxInsights({ advice, type }: TaxInsightsProps) {
  if (!advice) return null;

  const typeLabels = {
    income: 'Income Tax',
    business: 'Business Tax',
    gst: 'GST'
  };

  return (
    <Card className="mt-6">
      <CardBody>
        <h3 className="text-xl font-semibold mb-4">AI Tax Insights</h3>
        
        {/* Potential Savings */}
        {advice.potentialSavings > 0 && (
          <div className="mb-4">
            <h4 className="text-lg font-medium text-success">Potential Tax Savings</h4>
            <p className="text-success-600">
              ₹{advice.potentialSavings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
            </p>
          </div>
        )}

        {/* Suggestions */}
        {advice.suggestions.length > 0 && (
          <div className="mb-4">
            <h4 className="text-lg font-medium mb-2">Recommendations</h4>
            <ul className="list-disc list-inside space-y-2">
              {advice.suggestions.map((suggestion, index) => (
                <li key={index} className="text-primary-600">{suggestion}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Risk Factors */}
        {advice.riskFactors.length > 0 && (
          <div className="mb-4">
            <h4 className="text-lg font-medium mb-2">Risk Factors</h4>
            <div className="flex flex-wrap gap-2">
              {advice.riskFactors.map((risk, index) => (
                <Chip key={index} color="warning" variant="flat">
                  {risk}
                </Chip>
              ))}
            </div>
          </div>
        )}

        {/* Compliance Notes */}
        <div className="mt-4">
          <h4 className="text-lg font-medium mb-2">Compliance Checklist</h4>
          <ul className="list-none space-y-2">
            {advice.complianceNotes.map((note, index) => (
              <li key={index} className="flex items-center">
                <span className="mr-2">✓</span>
                {note}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          * These insights are AI-generated suggestions based on the provided information. 
          Please consult with a tax professional for personalized advice.
        </div>
      </CardBody>
    </Card>
  );
}
