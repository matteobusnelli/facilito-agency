import { createContext, useContext, useState, ReactNode } from "react";
import { it, type Translations } from "./locales/it";
import { en } from "./locales/en";
import { es } from "./locales/es";

const locales = { it, en, es } as const;
export type Locale = keyof typeof locales;

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
  const [locale, setLocale] = useState<Locale>("it");

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
