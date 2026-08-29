import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext";

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder,
  inline = false,
  className = "",
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  const resolvedPlaceholder = placeholder ?? t("customSelect.placeholder");

  const normalized = options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt,
  );
  const selected = normalized.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function handleEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  function handleSelect(optValue) {
    onChange(optValue);
    setOpen(false);
  }

  return (
    <div
      ref={wrapperRef}
      className={`custom-select ${inline ? "custom-select--inline" : ""} ${
        open ? "open" : ""
      } ${className}`}
    >
      <button
        type="button"
        className="select-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span
          className={`select-trigger-value ${
            !selected ? "is-placeholder" : ""
          }`}
        >
          {selected ? selected.label : resolvedPlaceholder}
        </span>
        <svg
          className="select-arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <div className="select-menu" role="listbox">
          {normalized.length === 0 && (
            <div className="select-menu-empty">{t("customSelect.empty")}</div>
          )}
          {normalized.map((opt) => (
            <div
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              className={`select-option ${
                opt.value === value ? "is-selected" : ""
              }`}
              onClick={() => handleSelect(opt.value)}
            >
              <span>{opt.label}</span>
              <svg
                className="select-option-check"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
