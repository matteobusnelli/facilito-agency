import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { it, type Translations } from "./locales/it";
import { en } from "./locales/en";
import { es } from "./locales/es";

const locales = { it, en, es } as const;
export type Locale = keyof typeof locales;

const STORAGE_KEY = "facilito_locale";

function isLocale(value: unknown): value is Locale {
  return value === "it" || value === "en" || value === "es";
}

/** Read the user's previously saved preference from localStorage. */
function getSavedLocale(): Locale | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return isLocale(saved) ? saved : null;
  } catch {
    return null;
  }
}

/** Persist the user's manual selection so geo-detection doesn't override it next visit. */
function saveLocale(locale: Locale): void {
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // localStorage unavailable (private mode, etc.) — silently ignore
  }
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "it",
  setLocale: () => {},
  t: it,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  // Start with saved preference, fall back to "it" while we geo-detect
  const [locale, setLocaleState] = useState<Locale>(() => getSavedLocale() ?? "it");

  useEffect(() => {
    // If the user already has a saved preference, respect it — don't geo-detect
    if (getSavedLocale() !== null) return;

    fetch("/api/locale")
      .then((res) => res.json())
      .then((data: { locale?: unknown }) => {
        if (isLocale(data.locale)) {
          setLocaleState(data.locale);
          // Don't write to localStorage here — this is auto-detected, not user choice.
          // The user can still override via the switcher, which WILL save to localStorage.
        }
      })
      .catch(() => {
        // Network error or local dev without the function — stay on current locale
      });
  }, []);

  function setLocale(l: Locale) {
    saveLocale(l); // persist manual selection
    setLocaleState(l);
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t: locales[locale] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  return useContext(I18nContext);
}

export const LOCALE_LABELS: Record<Locale, string> = {
  it: "IT",
  en: "EN",
  es: "ES",
};
