import { createContext, useContext, useMemo, useState } from "react";
import { TRANSLATIONS } from "./translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "nagariwatch-lang";

function getInitialLang() {
  if (typeof window === "undefined") return "id";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "id" || saved === "en") return saved;
  } catch {}
  return "id";
}

function getPath(obj, path) {
  return path
    .split(".")
    .reduce((acc, key) => (acc == null ? acc : acc[key]), obj);
}

function interpolate(str, vars) {
  if (!vars) return str;
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) =>
    vars[key] !== undefined ? vars[key] : `{{${key}}}`,
  );
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  function setLang(next) {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }

  function toggleLang() {
    setLang(lang === "id" ? "en" : "id");
  }

  const t = useMemo(() => {
    return (key, vars) => {
      const dict = TRANSLATIONS[lang] ?? TRANSLATIONS.id;
      const fallback = TRANSLATIONS.id;
      const value = getPath(dict, key) ?? getPath(fallback, key);
      if (value == null) return key;
      if (typeof value === "string") return interpolate(value, vars);
      return value;
    };
  }, [lang]);

  const value = {
    lang,
    setLang,
    toggleLang,
    t,
    locale: lang === "id" ? "id-ID" : "en-US",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
