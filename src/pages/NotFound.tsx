import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";

export default function NotFound() {
  const { t } = useLang();
  return (
    <main className="pt-24 min-h-screen flex items-center justify-center text-center px-4 bg-white dark:bg-stone-900">
      <div>
        <p className="text-7xl mb-6">🗺️</p>
        <h1 className="text-4xl font-extrabold text-stone-800 mb-3">404</h1>
        <p className="text-xl text-stone-500 mb-2">
          {t("Oops! This page got lost on the trail.", "이런! 이 페이지는 길을 잃었네요.")}
        </p>
        <p className="text-stone-400 text-sm mb-8">
          {t("The page you're looking for doesn't exist or has been moved.", "찾으시는 페이지가 존재하지 않거나 이동되었습니다.")}
        </p>
        <Link
          to="/"
          className="inline-block px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl transition-colors"
        >
          {t("Back to Home →", "홈으로 돌아가기 →")}
        </Link>
      </div>
    </main>
  );
}
