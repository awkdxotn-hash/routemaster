import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type Lang = "en" | "ko" | "es";

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (en: string, ko: string, es?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem("ekt-lang") as Lang) || "en";
  });

  const setLang = (l: Lang) => {
    localStorage.setItem("ekt-lang", l);
    setLangState(l);
  };

  // 선택된 언어에 맞는 텍스트 반환 (스페인어 미제공 시 영어 폴백)
  const t = (en: string, ko: string, es?: string): string => {
    if (lang === "ko") return ko;
    if (lang === "es") return es ?? en;
    return en;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
