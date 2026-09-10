import { useRef, useEffect } from "react";
import { useCommunitySearch } from "../hooks/useCommunitySearch";

export function CommunityCombobox({ communities, onSelect, value }) {
  const containerRef = useRef(null);
  const inputRef     = useRef(null);

  const {
    query, isOpen, setIsOpen,
    selected, filtered,
    handleSelect, handleInputChange, handleClear,
  } = useCommunitySearch(communities);

  useEffect(() => { if (!value && selected) handleClear(); }, [value]);
  useEffect(() => { onSelect(selected); }, [selected]);

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={containerRef} className="dropdown-container">
      <div className="input-wrap">
        <input
          ref={inputRef}
          type="text"
          id="community-input"
          className="text-input"
          placeholder="שדרות, קריית שמונה, ירוחם..."
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          autoComplete="off"
          role="combobox"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="community-listbox"
          aria-describedby="community-desc"
          aria-required="true"
          dir="rtl"
        />
        {query && (
          <button
            className="clear-btn"
            style={{ display: "flex" }}
            onClick={() => { handleClear(); inputRef.current?.focus(); }}
            aria-label="נקה בחירת יישוב"
            type="button"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && filtered.length > 0 && (
        <ul
          className="dropdown open"
          id="community-listbox"
          role="listbox"
          aria-label="יישובים מזכים"
        >
          {filtered.map((community) => (
            <li
              key={community.id}
              role="option"
              aria-selected={selected?.id === community.id}
              className={`dropdown-item${selected?.id === community.id ? " dropdown-item--selected" : ""}`}
              onMouseDown={(e) => { e.preventDefault(); handleSelect(community); }}
            >
              <span className="dropdown-item__name">{community.nameHebrew}</span>
              <span className="dropdown-item__meta">
                <span className="dropdown-item__region">{community.region}</span>
                <span className="dropdown-item__badge">{community.benefitPercentage}%</span>
              </span>
            </li>
          ))}
        </ul>
      )}

      {isOpen && query && filtered.length === 0 && (
        <div className="dropdown open">
          <p className="dropdown-empty">לא נמצאו יישובים עבור &ldquo;{query}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
