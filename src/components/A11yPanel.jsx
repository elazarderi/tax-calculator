import { useEffect, useRef, useState } from "react";

export function A11yPanel({ open, onClose }) {
  const closeRef  = useRef(null);
  const [fs, setFs]   = useState("base");
  const [hc, setHc]   = useState(false);
  const [ul, setUl]   = useState(false);
  const [cur, setCur] = useState(false);

  // Focus trap: move focus to close button when panel opens
  useEffect(() => {
    if (open) closeRef.current?.focus();
  }, [open]);

  // Escape key closes panel
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape" && open) onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Apply body classes
  useEffect(() => {
    document.body.classList.remove("fs-lg", "fs-xl");
    if (fs === "lg") document.body.classList.add("fs-lg");
    if (fs === "xl") document.body.classList.add("fs-xl");
  }, [fs]);

  useEffect(() => { document.body.classList.toggle("hc", hc); }, [hc]);
  useEffect(() => { document.body.classList.toggle("underline-links", ul); }, [ul]);
  useEffect(() => { document.body.classList.toggle("cursor-lg", cur); }, [cur]);

  function reset() {
    setFs("base"); setHc(false); setUl(false); setCur(false);
  }

  const sizes = [
    { key: "base", label: "רגיל" },
    { key: "lg",   label: "גדול" },
    { key: "xl",   label: "גדול מאוד" },
  ];

  return (
    <aside
      className={`a11y-panel${open ? " open" : ""}`}
      id="a11y-panel"
      role="dialog"
      aria-modal="true"
      aria-label="תפריט נגישות"
    >
      <div className="a11y-panel__header">
        <span className="a11y-panel__title">הגדרות נגישות</span>
        <button
          ref={closeRef}
          className="a11y-panel__close"
          onClick={onClose}
          aria-label="סגור תפריט נגישות"
        >
          ✕
        </button>
      </div>

      <div>
        <p className="a11y-section-label">גודל טקסט</p>
        <div className="a11y-size-row">
          {sizes.map((s) => (
            <button
              key={s.key}
              className={`a11y-size-btn${fs === s.key ? " active" : ""}`}
              aria-pressed={fs === s.key}
              onClick={() => setFs(s.key)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="a11y-row">
        <p className="a11y-section-label">הגדרות תצוגה</p>
        {[
          { label: "ניגודיות גבוהה", val: hc, set: setHc },
          { label: "הדגש קישורים",   val: ul, set: setUl },
          { label: "סמן עכבר גדול",  val: cur, set: setCur },
        ].map(({ label, val, set }) => (
          <button
            key={label}
            className={`a11y-toggle${val ? " active" : ""}`}
            aria-pressed={val}
            onClick={() => set((v) => !v)}
          >
            {label}
          </button>
        ))}
      </div>

      <button className="a11y-reset" onClick={reset}>איפוס הגדרות</button>

      <p className="a11y-note">
        אתר זה עומד בדרישות תקן נגישות ישראלי (IS 5568) ברמה AA.
        לדיווח על בעיית נגישות פנה/י לכתובת: naga@example.gov.il
      </p>
    </aside>
  );
}
