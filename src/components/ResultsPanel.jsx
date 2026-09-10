import { formatCurrency, formatNumber } from "../utils/taxCalculations";

export function ResultsPanel({ result, community }) {
  if (!result) return null;

  return (
    <section
      className="results-panel visible"
      aria-labelledby="results-heading"
      aria-live="polite"
    >
      {/* Monthly hero number */}
      <div className="monthly-hero" aria-label="חיסכון חודשי משוער">
        <p className="monthly-hero__label">חיסכון חודשי משוער</p>
        <div>
          <span className="monthly-hero__currency" aria-hidden="true">₪</span>
          <span className="monthly-hero__number">
            {formatNumber(Math.round(result.monthlyTaxCredit))}
          </span>
        </div>
        <p className="monthly-hero__context">
          זיכוי חודשי בגין עבודה ב{community.nameHebrew} ({community.benefitPercentage}% זיכוי)
        </p>
      </div>

      {/* Breakdown table */}
      <table className="breakdown" aria-label="פירוט חישוב זיכוי המס">
        <caption>פירוט החישוב</caption>
        <thead>
          <tr>
            <th scope="col">פריט</th>
            <th scope="col">סכום</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="desc">זיכוי מס שנתי</td>
            <td className="val">{formatCurrency(result.annualTaxCredit)}</td>
          </tr>
          <tr>
            <td className="desc">שיעור הזיכוי</td>
            <td className="val">{result.benefitPercentage}%</td>
          </tr>
          <tr>
            <td className="desc">תקרת הכנסה שנתית</td>
            <td className="val">₪{formatNumber(result.annualCap)}</td>
          </tr>
          <tr>
            <td className="desc">תקרת הכנסה חודשית</td>
            <td className="val">{formatCurrency(result.monthlyCap)}</td>
          </tr>
          <tr>
            <td className="desc">הכנסה זכאית חודשית</td>
            <td className="val">{formatCurrency(result.eligibleMonthlyIncome)}</td>
          </tr>
        </tbody>
      </table>

      {/* Cap notice */}
      {result.isCapped && (
        <div className="cap-notice show" role="note">
          <i className="cap-notice__icon">ℹ</i>
          <span>
            שכרך ({formatCurrency(result.eligibleMonthlyIncome + (result.monthlyCap < result.eligibleMonthlyIncome ? 0 : 0))})
            עולה על התקרה החודשית ({formatCurrency(result.monthlyCap)}).
            הזיכוי מחושב על סכום התקרה בלבד.
          </span>
        </div>
      )}

      {/* Disclaimer */}
      <p className="disclaimer">
        <strong>שים לב:</strong> החישוב הוא אומדן ראשוני בלבד. הסכומים הסופיים תלויים
        בנקודות הזיכוי האישיות, מדרגות המס, ניכויים נוספים ונסיבות עבודה ספציפיות.
        יש להתייעץ עם רואה חשבון או יועץ מס מוסמך לפני קבלת החלטות פיננסיות.
      </p>
    </section>
  );
}
