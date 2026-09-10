import { useState } from "react";
import { parseFormattedNumber, formatNumber } from "../utils/taxCalculations";

export function SalaryInput({ value, onChange }) {
  const [displayValue, setDisplayValue] = useState(
    value ? formatNumber(value) : ""
  );
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    const numeric = parseFormattedNumber(e.target.value);
    if (numeric > 9999999) return;
    setDisplayValue(numeric ? formatNumber(numeric) : "");
    onChange(numeric || 0);
  };

  const hasError = touched && (!value || value <= 0);

  return (
    <div>
      <div className="input-wrap">
        <span className="input-sym" aria-hidden="true">₪</span>
        <input
          type="text"
          id="salary"
          inputMode="numeric"
          className={`text-input text-input--salary${hasError ? " text-input--error" : ""}`}
          placeholder="לדוגמה: 12,500"
          value={displayValue}
          onChange={handleChange}
          onBlur={() => setTouched(true)}
          autoComplete="off"
          aria-describedby="salary-desc salary-err"
          aria-required="true"
          aria-invalid={hasError}
        />
      </div>
      <p
        className="field-error"
        id="salary-err"
        role="alert"
        aria-live="polite"
        style={{ display: hasError ? "block" : "none" }}
      >
        נא להזין שכר ברוטו חודשי תקין
      </p>
    </div>
  );
}
