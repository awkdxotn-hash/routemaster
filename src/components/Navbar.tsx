import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import type { Lang } from "../context/LanguageContext";

const LANGS: { code: Lang; flag: string; label: string }[] = [
  { code: "en", flag: "🇺🇸", label: "English" },
  { code: "ko", flag: "🇰🇷", label: "한국어" },
  { code: "es", flag: "🇪🇸", label: "Español" },
];

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();
  const { user, profile, signOut } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [langOpen, setLangOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const navLinks = [
    { to: "/", labelEn: "Home", labelKo: "홈", labelEs: "Inicio" },
    { to: "/routes", labelEn: "Routes", labelKo: "여행루트", labelEs: "Rutas" },
    { to: "/community", labelEn: "Community", labelKo: "커뮤니티", labelEs: "Comunidad" },
    { to: "/about", labelEn: "About", labelKo: "소개", labelEs: "Acerca de" },
    { to: "/contact", labelEn: "Contact", labelKo: "문의", labelEs: "Contacto" },
  ];

  const currentLang = LANGS.find((l) => l.code === lang)!;

  const handleSignOut = async () => {
    await signOut();
    setUserOpen(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border-b border-stone-100 dark:border-stone-700 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* 로고 */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-sm">
            <span className="text-white text-sm font-bold">EK</span>
          </div>
          <span className="font-bold text-stone-800 dark:text-stone-100 text-sm leading-tight">
            Easy Korea<br />
            <span className="text-teal-600 dark:text-teal-400 font-semibold">Trip</span>
          </span>
        </Link>

        {/* 네비게이션 */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === link.to
                  ? "bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300"
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800"
              }`}
            >
              {t(link.labelEn, link.labelKo, link.labelEs)}
            </Link>
          ))}

          {/* 다크모드 토글 */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="ml-2 w-9 h-9 flex items-center justify-center rounded-full border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors text-stone-600 dark:text-stone-300 text-base"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>

          {/* 언어 드롭다운 */}
          <div className="relative ml-1">
            <button
              onClick={() => setLangOpen((o) => !o)}
              onBlur={() => setTimeout(() => setLangOpen(false), 150)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors text-sm font-medium text-stone-600 dark:text-stone-300"
            >
              <span className="text-base">{currentLang.flag}</span>
              <span className="hidden sm:inline">{currentLang.label}</span>
              <span className="text-xs opacity-60">▾</span>
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-1 w-36 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-600 rounded-xl shadow-lg overflow-hidden z-50">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { setLang(l.code); setLangOpen(false); }}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors ${
                      lang === l.code
                        ? "bg-teal-50 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 font-semibold"
                        : "text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700"
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 인증 영역 */}
          {user ? (
            <div className="relative ml-1">
              <button
                onClick={() => setUserOpen((o) => !o)}
                onBlur={() => setTimeout(() => setUserOpen(false), 150)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors text-sm font-medium text-stone-700 dark:text-stone-200"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white text-xs font-bold">
                  {profile?.nickname?.charAt(0).toUpperCase() ?? "U"}
                </div>
                <span className="hidden sm:inline max-w-[80px] truncate">{profile?.nickname ?? "유저"}</span>
                <span className="text-xs opacity-60">▾</span>
              </button>

              {userOpen && (
                <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-600 rounded-xl shadow-lg overflow-hidden z-50">
                  {profile?.is_admin && (
                    <Link
                      to="/admin"
                      onClick={() => setUserOpen(false)}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors font-medium"
                    >
                      ⚙️ 관리자 대시보드
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
                  >
                    로그아웃
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="ml-1 px-4 py-1.5 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition-colors"
            >
              {t("Login", "로그인", "Iniciar sesión")}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
