import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-stone-900 dark:bg-stone-950 text-stone-400 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* 브랜드 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">EK</span>
              </div>
              <span className="font-bold text-white text-sm">Easy Korea Trip</span>
            </div>
            <p className="text-xs leading-relaxed">
              {t(
                "Discover rural Korea beyond the tourist trail.",
                "관광 명소를 넘어 진짜 한국 지방을 발견하세요."
              )}
            </p>
          </div>

          {/* 사이트 링크 */}
          <div>
            <p className="text-white text-sm font-semibold mb-3">{t("Explore", "탐색")}</p>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-teal-400 transition-colors">{t("Home", "홈")}</Link></li>
              <li><Link to="/routes" className="hover:text-teal-400 transition-colors">{t("Travel Routes", "여행루트")}</Link></li>
              <li><Link to="/about" className="hover:text-teal-400 transition-colors">{t("About Us", "소개")}</Link></li>
              <li><Link to="/contact" className="hover:text-teal-400 transition-colors">{t("Contact", "문의")}</Link></li>
            </ul>
          </div>

          {/* 법적 링크 */}
          <div>
            <p className="text-white text-sm font-semibold mb-3">{t("Legal", "법적 고지")}</p>
            <ul className="space-y-2 text-xs">
              <li><Link to="/privacy" className="hover:text-teal-400 transition-colors">{t("Privacy Policy", "개인정보처리방침")}</Link></li>
              <li>
                <p className="text-xs mt-2 leading-relaxed">
                  {t(
                    "This site uses cookies and Google AdSense for personalized ads.",
                    "이 사이트는 맞춤 광고를 위해 쿠키와 Google AdSense를 사용합니다."
                  )}
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 text-center">
          <p className="text-xs">© 2026 Easy Korea Trip. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
