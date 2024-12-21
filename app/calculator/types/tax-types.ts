export interface IncomeTaxFormData {
  salary: string;
  professionalIncome: string;
  rentalIncome: string;
  otherIncome: string;
  section80C: string;
  section80D: string;
  section80G: string;
  section80TTA: string;
  section80E: string;
  hra: string;
  lta: string;
  foodAllowance: string;
  transportAllowance: string;
}

export interface BusinessTaxFormData {
  turnover: string;
  revenue: string;
  businessExpenses: string;
  employeeCount: string;
  industry: string;
}

export interface GSTFormData {
  gstAmount: string;
  gstRate: string;
  gstType: string;
  hsn: string;
  invoiceAmount: string;
}

export interface TaxResult {
  totalTax: number;
  baseTax?: number;
  cess?: number;
  surcharge?: number;
  cgst?: number;
  sgst?: number;
  totalAmount?: number;
}
