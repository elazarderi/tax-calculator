# מחשבון יישובים מזכים במס 🏘️

מחשבון הטבות מס ליישובים מזכים בישראל — React + Vite, פריסה על Firebase Hosting.

---

## פריסה על Firebase — שלב אחר שלב

### דרישות מקדימות
```bash
node -v   # נדרש Node.js 18+
npm -v    # נדרש npm 9+
```

### 1. התקנת dependencies
```bash
npm install
```

### 2. בדיקה מקומית
```bash
npm run dev
# פתח http://localhost:5173
```

### 3. הגדרת Firebase (פעם אחת)
```bash
# התקן את Firebase CLI אם עדיין לא קיים
npm install -g firebase-tools

# התחבר לחשבון Google שלך
firebase login

# צור פרויקט חדש ב-Firebase Console (console.firebase.google.com)
# ואז עדכן את .firebaserc:
```

פתח את `.firebaserc` ושנה `YOUR_FIREBASE_PROJECT_ID` למזהה הפרויקט שלך:
```json
{
  "projects": {
    "default": "my-tax-calculator-12345"
  }
}
```

### 4. בנייה ופריסה
```bash
# בנה + פרוס בפקודה אחת
npm run deploy

# או בנפרד:
npm run build       # יוצר תיקיית dist/
firebase deploy --only hosting
```

### 5. עדכון נתונים (בלי build מחדש)
אם שינית רק את `src/data/tax-communities.json`:
```bash
npm run deploy   # מספיק — Vite כולל את הנתונים בבנייה
```

---

## מבנה הפרויקט

```
tax-calculator/
├── .firebaserc                    ← מזהה פרויקט Firebase
├── firebase.json                  ← הגדרות hosting, cache, security headers
├── .gitignore
├── package.json                   ← npm run dev / build / deploy
├── vite.config.js
├── index.html
└── src/
    ├── main.jsx                   ← נקודת כניסה React
    ├── App.jsx                    ← קומפוננטה ראשית
    ├── styles.css                 ← עיצוב גלובלי (RTL, Heebo, tokens)
    ├── data/
    │   └── tax-communities.json   ← ← ← עדכן כאן מדי שנה
    ├── components/
    │   ├── A11yPanel.jsx          ← פאנל נגישות (IS 5568)
    │   ├── SalaryInput.jsx        ← שדה שכר עם formatизраil
    │   ├── CommunityCombobox.jsx  ← combobox עם חיפוש RTL
    │   └── ResultsPanel.jsx       ← טבלת תוצאות
    ├── hooks/
    │   └── useCommunitySearch.js  ← לוגיקת סינון
    └── utils/
        └── taxCalculations.js     ← נוסחאות חישוב מס
```

---

## עדכון נתוני יישובים שנתי

פתח `src/data/tax-communities.json` ועדכן:

### שינוי שיעור זיכוי או תקרה ליישוב קיים
```json
{
  "id": "sderot",
  "nameHebrew": "שדרות",
  "region": "הנגב המערבי",
  "benefitPercentage": 20,    ← שנה כאן
  "annualCap": 240000          ← ועדכן תקרה כאן
}
```

### הוספת יישוב חדש
הוסף אובייקט למערך `communities`:
```json
{
  "id": "new-city-slug",
  "nameHebrew": "שם היישוב בעברית",
  "region": "שם האזור",
  "benefitPercentage": 12,
  "annualCap": 198000
}
```
> `id` חייב להיות ייחודי, ASCII, עם מקפים (לדוגמה: `kiryat-ata`)

### עדכון מטא-נתונים
```json
"_meta": {
  "version": "2026-A",
  "lastUpdated": "2026-01-15",
  ...
}
```

---

## לוגיקת החישוב

```
תקרה חודשית        = annualCap ÷ 12
הכנסה זכאית חודשית = min(שכר ברוטו, תקרה חודשית)
זיכוי מס חודשי     = הכנסה זכאית × (benefitPercentage ÷ 100)
זיכוי מס שנתי      = זיכוי מס חודשי × 12
```

---

## נגישות (תקן IS 5568)

- כפתור נגישות קבוע בתחתית המסך
- פאנל הגדרות: גודל טקסט, ניגודיות גבוהה, הדגשת קישורים, סמן גדול
- Skip link לתוכן הראשי
- `aria-live`, `role="alert"`, `aria-expanded` בכל האינטראקציות
- ניהול focus בפאנל הנגישות (focus trap + Escape)

---

## הערה משפטית

הכלי מיועד לאומדן ראשוני בלבד. אין להסתמך עליו לצורך דיווח מס.
