export const industries = [
  { label: "Manufacturing", value: "manufacturing" },
  { label: "IT/Software", value: "technology" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Retail", value: "retail" },
  { label: "Construction", value: "construction" },
  { label: "E-commerce", value: "ecommerce" },
  { label: "Education", value: "education" },
  { label: "MSME", value: "msme" },
  { label: "Agriculture", value: "agriculture" },
  { label: "Export/Import", value: "trade" }
];

export const gstTypes = [
  { label: "Regular Registration", value: "regular" },
  { label: "Composition Scheme", value: "composition" },
  { label: "E-commerce", value: "ecommerce" },
  { label: "Input Service Distributor", value: "isd" }
];

export const gstRates = [
  { label: "0%", value: "0" },
  { label: "5%", value: "5" },
  { label: "12%", value: "12" },
  { label: "18%", value: "18" },
  { label: "28%", value: "28" }
];

export const industryTaxRates = {
  manufacturing: { baseRate: 0.25, turnoverLimit: 400000000 },
  technology: { baseRate: 0.22, startupBenefit: 0.03 },
  healthcare: { baseRate: 0.22, rdBenefit: 0.15 },
  retail: { baseRate: 0.25, turnoverLimit: 400000000 },
  construction: { baseRate: 0.25 },
  ecommerce: { baseRate: 0.22 },
  education: { baseRate: 0.20 },
  msme: { baseRate: 0.22, turnoverLimit: 50000000, benefit: 0.05 },
  agriculture: { baseRate: 0.0 },
  trade: { baseRate: 0.25 }
};

export const compositionSchemeRates = {
  manufacturing: 0.01,
  trade: 0.01,
  restaurant: 0.05,
  services: 0.06
};
