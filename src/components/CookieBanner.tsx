import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";

export default function CookieBanner() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={t("Cookie consent", "쿠키 동의")}
      className="fixed bottom-0 left-0 right-0 z-50 bg-stone-900 text-white px-4 py-4 shadow-2xl border-t border-stone-700"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-stone-300 flex-1 leading-relaxed">
          {t(
            "We use cookies to enhance your experience and serve personalized ads via Google AdSense. By continuing to use this site, you agree to our use of cookies.",
            "당사는 사용자 경험 향상 및 Google AdSense를 통한 맞춤 광고 제공을 위해 쿠키를 사용합니다. 사이트를 계속 이용하면 쿠키 사용에 동의하는 것으로 간주됩니다."
          )}{" "}
          <Link to="/privacy" className="underline text-teal-400 hover:text-teal-300">
            {t("Learn more", "자세히 보기")}
          </Link>
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm rounded-lg border border-stone-600 text-stone-300 hover:bg-stone-800 transition-colors"
          >
            {t("Decline", "거부")}
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-sm rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold transition-colors"
          >
            {t("Accept", "동의")}
          </button>
        </div>
      </div>
    </div>
  );
}
