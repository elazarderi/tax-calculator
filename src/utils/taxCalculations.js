/**
 * חישובי הטבות מס ליישובים מזכים
 * תקנות מס הכנסה (שיעור המס על הכנסה בגין עבודה ביישובים מזכים)
 */

export function calculateTaxBenefit(grossMonthlySalary, community) {
  if (!grossMonthlySalary || !community || grossMonthlySalary <= 0) return null;
  const { benefitPercentage, annualCap } = community;
  const monthlyCap           = annualCap / 12;
  const eligibleMonthlyIncome = Math.min(grossMonthlySalary, monthlyCap);
  const monthlyTaxCredit     = eligibleMonthlyIncome * (benefitPercentage / 100);
  const annualTaxCredit      = monthlyTaxCredit * 12;
  const isCapped             = grossMonthlySalary > monthlyCap;
  return { monthlyCap, eligibleMonthlyIncome, monthlyTaxCredit, annualTaxCredit, benefitPercentage, annualCap, isCapped };
}

export function formatCurrency(amount) {
  return new Intl.NumberFormat("he-IL", {
    style: "currency", currency: "ILS",
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(amount) {
  return new Intl.NumberFormat("he-IL").format(amount);
}

export function parseFormattedNumber(str) {
  const cleaned = str.replace(/[^\d]/g, "");
  return cleaned ? parseInt(cleaned, 10) : 0;
}
