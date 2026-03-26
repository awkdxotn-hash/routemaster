import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { routes } from "../data/routes";
import type { Theme } from "../data/routes";
import RouteCard from "../components/RouteCard";
import FilterBar from "../components/FilterBar";
import type { SortMode } from "../components/FilterBar";
import { useLang } from "../context/LanguageContext";
import { supabase } from "../lib/supabase";

// 관리자 픽 루트 ID 목록
const ADMIN_PICKS = new Set([
  "jeju-east-sunrise",
  "busan-beach-village",
  "jeonbuk-jeonju-gochang",
  "gyeongbuk-gyeongju",
  "seoul-hidden-alleys",
  "gangwon-east-coast",
  "jeonnam-suncheon",
  "gyeongnam-south-sea",
  "gyeonggi-gapyeong",
  "jeju-hyeopjae-beach",
  "busan-haedong-sunrise",
  "gangwon-hongcheon-ginkgo",
]);

// 지역 쿼리 파라미터를 Route.region 값으로 매핑
const regionQueryMap: Record<string, string> = {
  seoul: "Seoul",
  busan: "Busan",
  jeju: "Jeju",
  gangwon: "Gangwon",
  gyeonggi: "Gyeonggi",
  gyeongnam: "Gyeongnam",
  gyeongbuk: "Gyeongbuk",
  jeonnam: "Jeonnam",
  jeonbuk: "Jeonbuk",
  chungnam: "Chungnam",
  chungbuk: "Chungbuk",
};

export default function Routes() {
  const { t } = useLang();
  const [searchParams] = useSearchParams();

  const initialRegion = (() => {
    const q = searchParams.get("region") ?? "";
    return regionQueryMap[q] ?? "all";
  })();

  const [selectedTheme, setSelectedTheme] = useState<Theme | "all">("all");
  const [selectedRegion, setSelectedRegion] = useState<string>(initialRegion);
  const [sortMode, setSortMode] = useState<SortMode>("default");
  const [query, setQuery] = useState("");
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});

  useEffect(() => {
    supabase
      .from("route_likes")
      .select("route_id")
      .then(({ data }) => {
        if (!data) return;
        const map: Record<string, number> = {};
        data.forEach(({ route_id }) => { map[route_id] = (map[route_id] ?? 0) + 1; });
        setLikesMap(map);
      });
  }, []);

  const filtered = useMemo(() => {
    const likes = likesMap;

    let result = routes.filter((r) => {
      const matchTheme = selectedTheme === "all" || r.themes.includes(selectedTheme as Theme);
      const matchRegion = selectedRegion === "all" || r.region === selectedRegion;
      const matchAdminPick = sortMode !== "adminPick" || ADMIN_PICKS.has(r.id);
      const q = query.toLowerCase();
      const matchQuery =
        !q ||
        r.titleEn.toLowerCase().includes(q) ||
        r.titleKo.includes(q) ||
        r.region.toLowerCase().includes(q) ||
        r.regionKo.includes(q) ||
        r.highlights.some((h) => h.toLowerCase().includes(q));
      return matchTheme && matchRegion && matchAdminPick && matchQuery;
    });

    if (sortMode === "likes") {
      result = [...result].sort((a, b) => (likes[b.id] ?? 0) - (likes[a.id] ?? 0));
    }

    return result;
  }, [selectedTheme, selectedRegion, sortMode, query, likesMap]);

  return (
    <main className="pt-24 pb-20 min-h-screen bg-stone-50 dark:bg-stone-900">
      <div className="max-w-6xl mx-auto px-4">

        {/* 헤더 */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-stone-800 dark:text-stone-100 mb-2">
            {sortMode === "adminPick"
              ? `⭐ ${t("Editor's Pick", "관리자 픽")}`
              : sortMode === "likes"
              ? `❤️ ${t("Most Liked Routes", "추천순 루트")}`
              : t("All Routes", "모든 루트", "Todas las rutas")}
          </h1>
          <p className="text-stone-500 dark:text-stone-400">
            {sortMode === "adminPick"
              ? t("Hand-picked routes recommended by our editors", "편집자가 직접 선별한 추천 루트")
              : sortMode === "likes"
              ? t("Routes sorted by traveler recommendations", "여행자 추천이 많은 루트 순")
              : t(
                  `${routes.length} curated routes across rural Korea`,
                  `한국 지방 전역 ${routes.length}개 엄선 루트`,
                  `${routes.length} rutas seleccionadas por toda Corea rural`
                )}
          </p>
        </div>

        {/* 검색창 */}
        <div className="mb-5">
          <div className="relative max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400">🔍</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("Search destinations, regions...", "목적지, 지역 검색...", "Buscar destinos, regiones...")}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-700 dark:text-stone-200 placeholder-stone-300 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>
        </div>

        {/* 필터 */}
        <div className="mb-8">
          <FilterBar
            selectedTheme={selectedTheme}
            selectedRegion={selectedRegion}
            sortMode={sortMode}
            onThemeChange={setSelectedTheme}
            onRegionChange={setSelectedRegion}
            onSortChange={setSortMode}
          />
        </div>

        {/* 결과 */}
        {filtered.length > 0 ? (
          <>
            <p className="text-sm text-stone-400 mb-5">
              {t(`${filtered.length} routes found`, `${filtered.length}개 루트`)}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((route) => (
                <RouteCard key={route.id} route={route} adminPick={ADMIN_PICKS.has(route.id)} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-24 text-stone-400">
            <p className="text-5xl mb-4">🗺️</p>
            <p className="text-lg font-medium">
              {t("No routes found.", "일치하는 루트가 없습니다.")}
            </p>
            <p className="text-sm mt-1">
              {t("Try a different filter or search term.", "다른 필터나 검색어를 시도해 보세요.")}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
