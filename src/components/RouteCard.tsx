import { useState } from "react";
import { Link } from "react-router-dom";
import type { Route } from "../data/routes";
import { useLang } from "../context/LanguageContext";
import { getRouteImage } from "../data/routeImages";

const themeColors: Record<string, string> = {
  nature: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  food: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  history: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  culture: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  coastal: "bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300",
  wellness: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  adventure: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

const difficultyLabel: Record<string, { en: string; ko: string; es: string; color: string }> = {
  easy: { en: "Easy", ko: "쉬움", es: "Fácil", color: "text-emerald-600 dark:text-emerald-400" },
  moderate: { en: "Moderate", ko: "보통", es: "Moderado", color: "text-amber-600 dark:text-amber-400" },
  adventurous: { en: "Adventurous", ko: "도전적", es: "Aventurero", color: "text-red-500 dark:text-red-400" },
};

interface Props {
  route: Route;
  adminPick?: boolean;
}

export default function RouteCard({ route, adminPick }: Props) {
  const { t } = useLang();
  const diff = difficultyLabel[route.difficulty];
  const imageUrl = getRouteImage(route.id);
  const [imgError, setImgError] = useState(false);

  return (
    <Link
      to={`/routes/${route.id}`}
      className="group bg-white dark:bg-stone-800 rounded-2xl border border-stone-100 dark:border-stone-700 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col"
    >
      {/* 카드 상단 — 사진 or 이모지 폴백 */}
      <div className="h-36 overflow-hidden relative bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-teal-900/30 dark:to-emerald-900/30">
        {adminPick && (
          <span className="absolute top-2 left-2 z-10 bg-amber-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
            ⭐ 관리자 픽
          </span>
        )}
        {imageUrl && !imgError ? (
          <img
            src={imageUrl}
            alt={route.titleEn}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
            {route.coverEmoji}
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        {/* 지역 태그 */}
        <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
          {t(route.region, route.regionKo)}
        </span>

        {/* 제목 */}
        <h3 className="text-base font-bold text-stone-800 dark:text-stone-100 leading-snug mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors">
          {t(route.titleEn, route.titleKo)}
        </h3>

        {/* 설명 */}
        <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed mb-4 flex-1 line-clamp-3">
          {t(route.descEn, route.descKo)}
        </p>

        {/* 테마 태그 */}
        <div className="flex flex-wrap gap-1 mb-4">
          {route.themes.map((theme) => (
            <span
              key={theme}
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${themeColors[theme] ?? "bg-stone-100 text-stone-600 dark:bg-stone-700 dark:text-stone-300"}`}
            >
              {theme}
            </span>
          ))}
        </div>

        {/* 메타 정보 */}
        <div className="flex items-center justify-between text-xs text-stone-400 dark:text-stone-500 border-t border-stone-50 dark:border-stone-700 pt-3">
          <span>🗓 {route.duration}</span>
          <span className={`font-medium ${diff.color}`}>
            {t(diff.en, diff.ko, diff.es)}
          </span>
        </div>
      </div>
    </Link>
  );
}
