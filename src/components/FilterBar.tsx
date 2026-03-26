import type { Theme } from "../data/routes";
import { useLang } from "../context/LanguageContext";

export type SortMode = "default" | "likes" | "adminPick";

interface Props {
  selectedTheme: Theme | "all";
  selectedRegion: string;
  sortMode: SortMode;
  onThemeChange: (t: Theme | "all") => void;
  onRegionChange: (r: string) => void;
  onSortChange: (s: SortMode) => void;
}

const themes: { value: Theme | "all"; en: string; ko: string; es: string; emoji: string }[] = [
  { value: "all", en: "All", ko: "전체", es: "Todo", emoji: "🗺️" },
  { value: "nature", en: "Nature", ko: "자연", es: "Naturaleza", emoji: "🌿" },
  { value: "food", en: "Food", ko: "음식", es: "Gastronomía", emoji: "🍜" },
  { value: "history", en: "History", ko: "역사", es: "Historia", emoji: "🏯" },
  { value: "culture", en: "Culture", ko: "문화", es: "Cultura", emoji: "🎭" },
  { value: "coastal", en: "Coastal", ko: "해안", es: "Costa", emoji: "🌊" },
  { value: "wellness", en: "Wellness", ko: "웰니스", es: "Bienestar", emoji: "♨️" },
  { value: "adventure", en: "Adventure", ko: "어드벤처", es: "Aventura", emoji: "🧗" },
];

const regionOptions = [
  { value: "all", en: "All Regions", ko: "전체 지역", es: "Todas" },
  { value: "Seoul", en: "Seoul", ko: "서울", es: "Seúl" },
  { value: "Busan", en: "Busan", ko: "부산", es: "Busan" },
  { value: "Jeju", en: "Jeju Island", ko: "제주도", es: "Isla Jeju" },
  { value: "Gangwon", en: "Gangwon-do", ko: "강원도", es: "Gangwon" },
  { value: "Gyeonggi", en: "Gyeonggi-do", ko: "경기도", es: "Gyeonggi" },
  { value: "Gyeongnam", en: "Gyeongnam-do", ko: "경상남도", es: "Gyeongnam" },
  { value: "Gyeongbuk", en: "Gyeongbuk-do", ko: "경상북도", es: "Gyeongbuk" },
  { value: "Jeonnam", en: "Jeonnam-do", ko: "전라남도", es: "Jeonnam" },
  { value: "Jeonbuk", en: "Jeonbuk-do", ko: "전라북도", es: "Jeonbuk" },
  { value: "Chungnam", en: "Chungnam-do", ko: "충청남도", es: "Chungnam" },
];

const sortOptions: { value: SortMode; en: string; ko: string; emoji: string }[] = [
  { value: "default", en: "Default", ko: "기본순", emoji: "📋" },
  { value: "likes", en: "Most Liked", ko: "추천순", emoji: "❤️" },
  { value: "adminPick", en: "Editor's Pick", ko: "관리자 픽", emoji: "⭐" },
];

export default function FilterBar({
  selectedTheme, selectedRegion, sortMode,
  onThemeChange, onRegionChange, onSortChange,
}: Props) {
  const { t } = useLang();

  return (
    <div className="flex flex-col gap-4">
      {/* 테마 필터 */}
      <div className="flex flex-wrap gap-2">
        {themes.map((theme) => (
          <button
            key={theme.value}
            onClick={() => onThemeChange(theme.value)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-150 ${
              selectedTheme === theme.value
                ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-600 hover:border-teal-300 hover:text-teal-600"
            }`}
          >
            <span>{theme.emoji}</span>
            {t(theme.en, theme.ko, theme.es)}
          </button>
        ))}
      </div>

      {/* 하단 행: 지역 드롭다운 + 정렬 */}
      <div className="flex flex-wrap items-center gap-4">
        {/* 지역 드롭다운 */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-stone-400 dark:text-stone-500">{t("Region:", "지역:", "Región:")}</span>
          <select
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            className="text-sm border border-stone-200 dark:border-stone-600 rounded-lg px-3 py-1.5 text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            {regionOptions.map((r) => (
              <option key={r.value} value={r.value}>
                {t(r.en, r.ko, r.es)}
              </option>
            ))}
          </select>
        </div>

        {/* 정렬 모드 */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-stone-400 dark:text-stone-500">{t("View:", "보기:", "Ver:")}</span>
          <div className="flex gap-1">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => onSortChange(opt.value)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-150 ${
                  sortMode === opt.value
                    ? opt.value === "adminPick"
                      ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                      : opt.value === "likes"
                      ? "bg-rose-500 text-white border-rose-500 shadow-sm"
                      : "bg-stone-600 text-white border-stone-600 shadow-sm"
                    : "bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-600 hover:border-stone-400"
                }`}
              >
                <span>{opt.emoji}</span>
                {t(opt.en, opt.ko)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
