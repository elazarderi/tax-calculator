import { useState } from "react";
import communitiesData from "./data/tax-communities.json";
import { SalaryInput } from "./components/SalaryInput";
import { CommunityCombobox } from "./components/CommunityCombobox";
import { ResultsPanel } from "./components/ResultsPanel";
import { A11yPanel } from "./components/A11yPanel";
import { calculateTaxBenefit } from "./utils/taxCalculations";

const { communities, _meta } = communitiesData;

export default function App() {
  const [salary, setSalary]     = useState(0);
  const [community, setCommunity] = useState(null);
  const [a11yOpen, setA11yOpen]   = useState(false);

  const result = salary > 0 && community
    ? calculateTaxBenefit(salary, community)
    : null;

  return (
    <>
      <a className="skip-link" href="#main-content">דלג לתוכן הראשי</a>

      {/* Accessibility button */}
      <button
        className="a11y-btn"
        onClick={() => setA11yOpen(true)}
        aria-label="הגדרות נגישות"
        aria-expanded={a11yOpen}
        aria-controls="a11y-panel"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="4.5" r="2" fill="currentColor"/>
          <path d="M5 9h14M9 9l-1 11M15 9l1 11M12 9v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <A11yPanel open={a11yOpen} onClose={() => setA11yOpen(false)} />

      <div className="page">
        {/* Topbar */}
        <nav className="topbar" aria-label="ניווט ראשי">
          <a className="topbar__logo" href="/" aria-label="עמוד הבית">רשות המסים</a>
          <div className="topbar__sep" aria-hidden="true" />
          <span className="topbar__crumb">מחשבון יישובים מזכים</span>
        </nav>

        {/* Hero */}
        <div className="hero" role="banner">
          <div className="hero__inner">
            <span className="hero__tag">הטבות מס לפי מיקום</span>
            <h1 className="hero__title">מחשבון הטבות מס — יישובים מזכים</h1>
            <p className="hero__sub">
              הזן שכר ברוטו חודשי ובחר יישוב מזכה כדי לקבל הערכה של זיכוי המס
              החודשי והשנתי שלך, בהתאם לתקנות מס הכנסה.
            </p>
          </div>
        </div>

        {/* Main */}
        <main className="main" id="main-content">
          <section aria-labelledby="calc-heading">
            <div className="form-card">
              <div className="form-card__head" id="calc-heading">פרטי החישוב</div>
              <div className="form-card__body">

                <div className="field">
                  <label className="field__label" htmlFor="salary">שכר ברוטו חודשי</label>
                  <p className="field__sub" id="salary-desc">לפני ניכויים, בשקלים חדשים</p>
                  <SalaryInput value={salary} onChange={setSalary} />
                </div>

                <div className="field">
                  <label className="field__label">יישוב מזכה</label>
                  <p className="field__sub">חפש לפי שם היישוב או האזור הגיאוגרפי</p>
                  <CommunityCombobox
                    communities={communities}
                    onSelect={setCommunity}
                    value={community}
                  />
                </div>

                {!result && (
                  <p className="prompt-hint" role="status" aria-live="polite">
                    {salary > 0 && !community
                      ? "בחר יישוב מזכה כדי לראות את חישוב הזיכוי"
                      : "הזן שכר ברוטו חודשי כדי להתחיל"}
                  </p>
                )}
              </div>
            </div>
          </section>

          {result && community && (
            <ResultsPanel result={result} community={community} />
          )}
        </main>

        {/* Footer */}
        <footer className="footer">
          <div className="footer__inner">
            <span>גרסת נתונים: {_meta.version} &nbsp;|&nbsp; עודכן: {_meta.lastUpdated}</span>
            <div className="footer__links">
              <a href="#" className="footer__link">הצהרת נגישות</a>
              <a href="#" className="footer__link">מדיניות פרטיות</a>
              <a href="#" className="footer__link">צור קשר</a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
